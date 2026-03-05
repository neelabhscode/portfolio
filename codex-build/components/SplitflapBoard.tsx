"use client";

import { useEffect, useRef } from "react";

const splitflapMessages = [
  "NEELABH IS AVAILABLE FOR WORK",
  "DESIGNING HUMAN-CENTERED PRODUCTS",
  "BUILDING SIMPLE PRODUCT INTERFACES",
  "CURRENTLY OPEN TO PRODUCT ROLES",
  "SCROLL DOWN TO VIEW PROJECTS",
];

const maxMessageLength = splitflapMessages.reduce(
  (max, msg) => Math.max(max, msg.length),
  0
);

const SPLITFLAP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 /";

const splitflapFlipDurationMs = 280;
const splitflapCycleIntervalMs = 9000;
const splitflapStaggerBaseMs = 45;
const splitflapStaggerRandomMs = 25;
const splitflapMinIntermediate = 1;
const splitflapMaxIntermediate = 3;

export function SplitflapBoard() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const tilesRef = useRef<HTMLDivElement[]>([]);
  const currentIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const boardEl = boardRef.current;
    if (!boardEl) return;

    const randomChar = () =>
      SPLITFLAP_CHARS[Math.floor(Math.random() * SPLITFLAP_CHARS.length)];

    const targetMessage = () => splitflapMessages[currentIndexRef.current];

    const padToMaxLength = (msg: string) => {
      const diff = maxMessageLength - msg.length;
      if (diff <= 0) return msg;
      const left = Math.floor(diff / 2);
      const right = diff - left;
      return `${" ".repeat(left)}${msg}${" ".repeat(right)}`;
    };

    const faces = (tile: HTMLDivElement) => {
      const flap = tile.querySelector<HTMLDivElement>(".splitflap-tile-flap")!;
      const front = tile.querySelector<HTMLDivElement>(".splitflap-tile-face-front")!;
      const back = tile.querySelector<HTMLDivElement>(".splitflap-tile-face-back")!;
      return { flap, front, back };
    };

    const setChar = (face: HTMLElement, char: string) => {
      face.textContent = char === " " ? "\u00A0" : char;
    };

    const ensureTiles = () => {
      const len = maxMessageLength;
      const current = boardEl.querySelectorAll<HTMLDivElement>(".splitflap-tile").length;

      if (current < len) {
        for (let i = current; i < len; i++) {
          const tile = document.createElement("div");
          tile.className = "splitflap-tile";
          tile.setAttribute("data-index", String(i));
          tile.innerHTML = `
            <div class="splitflap-tile-flap" role="img" aria-hidden="true">
              <div class="splitflap-tile-face splitflap-tile-face-front" aria-hidden="true"></div>
              <div class="splitflap-tile-face splitflap-tile-face-back" aria-hidden="true"></div>
            </div>
          `;
          const { front } = faces(tile);
          setChar(front, randomChar());
          boardEl.appendChild(tile);
        }
      } else if (current > len) {
        while (boardEl.querySelectorAll(".splitflap-tile").length > len) {
          boardEl.lastElementChild?.remove();
        }
      }

      tilesRef.current = Array.from(
        boardEl.querySelectorAll<HTMLDivElement>(".splitflap-tile")
      );
    };

    const flipTile = (
      tile: HTMLDivElement,
      nextChar: string,
      onComplete?: () => void
    ) => {
      const { flap, front, back } = faces(tile);
      setChar(back, nextChar);
      flap.classList.add("splitflap-flipped");

      const done = () => {
        flap.removeEventListener("transitionend", done);
        setChar(front, nextChar);
        flap.classList.remove("splitflap-flipped");
        onComplete?.();
      };

      flap.addEventListener("transitionend", done);
      // Fallback in case transitionend doesn't fire
      window.setTimeout(done, splitflapFlipDurationMs + 50);
    };

    const runSequence = (message: string, onAllDone?: () => void) => {
      if (animatingRef.current) return;
      animatingRef.current = true;
      // Ensure tiles are sized for the max message length (width stays constant)
      ensureTiles();

      const padded = padToMaxLength(message);
      const chars = padded.split("");
      let remaining = chars.length;

      const checkDone = () => {
        remaining -= 1;
        if (remaining === 0) {
          animatingRef.current = false;
          onAllDone?.();
        }
      };

      chars.forEach((finalChar, index) => {
        const tile = tilesRef.current[index];
        if (!tile) return;

        const numIntermediate =
          splitflapMinIntermediate +
          Math.floor(
            Math.random() *
              (splitflapMaxIntermediate - splitflapMinIntermediate + 1)
          );
        const baseDelay =
          index *
          (splitflapStaggerBaseMs + Math.random() * splitflapStaggerRandomMs);

        const runStep = (step: number) => {
          const isLast = step === numIntermediate;
          const nextChar = isLast ? finalChar : randomChar();

          window.setTimeout(() => {
            flipTile(tile, nextChar, () => {
              if (isLast) {
                checkDone();
              } else {
                runStep(step + 1);
              }
            });
          }, step === 0 ? baseDelay : splitflapFlipDurationMs + 20);
        };

        runStep(0);
      });
    };

    const startCycle = () => {
      const msg = targetMessage();
      const padded = padToMaxLength(msg);
      runSequence(msg, () => {
        boardEl.setAttribute("aria-label", padded.trim());
        if (typeof window !== "undefined") {
          timerRef.current = window.setTimeout(() => {
            currentIndexRef.current =
              (currentIndexRef.current + 1) % splitflapMessages.length;
            startCycle();
          }, splitflapCycleIntervalMs);
        }
      });
    };

    const init = () => {
      const initial = targetMessage();
      ensureTiles();
      tilesRef.current.forEach((tile) => {
        const { front } = faces(tile);
        setChar(front, randomChar());
      });
      startCycle();
    };

    init();

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="splitflap-wrapper">
      <div
        className="splitflap-board"
        ref={boardRef}
        role="marquee"
        aria-live="polite"
        aria-label="Availability status"
      />
    </div>
  );
}

