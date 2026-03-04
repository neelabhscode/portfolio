"use client";

import { useEffect, useRef } from "react";

const MESSAGES = [
    "FINAL BOARDING CALL"
];

// Combine all messages into a single sequence with a dot separator
const FULL_MSG = MESSAGES.join(" • ") + " • "; // Add trailing dot for seamless connection

// We want a speed that takes about 25-30s for the full loop. Let's start with a base speed.
// 25-35 seconds per loop means we need to know the pixel width. 
// We will calculate exact speed based on width later or stick to a reasonable pixel/sec speed.
const SPEED = 80;  // px/s

// LED geometry (px)
// Match split-flap visual height by shrinking LED size,
// but keep full 9-row glyphs so characters aren't clipped.
const LED = 6;
const GAP = 2;
const P = LED + GAP; // pitch = 8px
const COLS = 7;
const ROWS = 9;
const CGAP = 2;  // blank columns between chars
const PAD_V = 9;
const PAD_H = 24;

const CHAR_PIT = (COLS + CGAP) * P;         // 72px per char
const CANVAS_H = PAD_V * 2 + ROWS * P;      // 90px

const BG = "#050505";
const OFF_CLR = "rgba(255,255,255,0.08)";
const ON_CLRS = ["#ffffff", "#e8e8e8", "#d0d0d0"];

const CHAR_MAP: Record<string, string[]> = {
    " ": ["0000000", "0000000", "0000000", "0000000", "0000000", "0000000", "0000000", "0000000", "0000000"],
    A: ["0011100", "0100010", "1000001", "1000001", "1111111", "1000001", "1000001", "1000001", "0000000"],
    B: ["1111100", "1000010", "1000010", "1111100", "1000010", "1000010", "1000010", "1111100", "0000000"],
    C: ["0011110", "0100001", "1000000", "1000000", "1000000", "1000000", "1000000", "0100001", "0011110"],
    D: ["1111100", "1000010", "1000001", "1000001", "1000001", "1000001", "1000001", "1000010", "1111100"],
    E: ["1111111", "1000000", "1000000", "1111100", "1000000", "1000000", "1000000", "1111111", "0000000"],
    F: ["1111111", "1000000", "1000000", "1111100", "1000000", "1000000", "1000000", "1000000", "0000000"],
    G: ["0011110", "0100001", "1000000", "1000000", "1001111", "1000001", "1000001", "0100001", "0011110"],
    H: ["1000001", "1000001", "1000001", "1111111", "1000001", "1000001", "1000001", "1000001", "0000000"],
    I: ["1111111", "0011100", "0011100", "0011100", "0011100", "0011100", "0011100", "1111111", "0000000"],
    J: ["0000011", "0000001", "0000001", "0000001", "0000001", "1000001", "1000001", "0111110", "0000000"],
    K: ["1000001", "1000010", "1000100", "1111000", "1000100", "1000010", "1000001", "1000001", "0000000"],
    L: ["1000000", "1000000", "1000000", "1000000", "1000000", "1000000", "1000000", "1111111", "0000000"],
    M: ["1000001", "1100011", "1010101", "1001001", "1000001", "1000001", "1000001", "1000001", "0000000"],
    N: ["1000001", "1100001", "1010001", "1001001", "1000101", "1000011", "1000001", "1000001", "0000000"],
    O: ["0011100", "0100010", "1000001", "1000001", "1000001", "1000001", "0100010", "0011100", "0000000"],
    P: ["1111110", "1000001", "1000001", "1000001", "1111110", "1000000", "1000000", "1000000", "0000000"],
    R: ["1111100", "1000010", "1000010", "1111100", "1001000", "1000100", "1000010", "1000001", "0000000"],
    S: ["0011110", "0100001", "0100000", "0011110", "0000001", "0000001", "0100001", "0011110", "0000000"],
    T: ["1111111", "0011100", "0011100", "0011100", "0011100", "0011100", "0011100", "0011100", "0000000"],
    U: ["1000001", "1000001", "1000001", "1000001", "1000001", "1000001", "1000001", "0111110", "0000000"],
    V: ["1000001", "1000001", "1000001", "1000001", "0100010", "0100010", "0010100", "0001000", "0000000"],
    W: ["1000001", "1000001", "1000001", "1001001", "1001001", "1001001", "0101010", "0011100", "0000000"],
    Y: ["1000001", "1000001", "0100010", "0010100", "0001000", "0001000", "0001000", "0001000", "0000000"],
    "-": ["0000000", "0000000", "0000000", "0000000", "0111110", "0000000", "0000000", "0000000", "0000000"],
    "•": ["0000000", "0000000", "0000000", "0011100", "0011100", "0011100", "0000000", "0000000", "0000000"],
};

function led(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (typeof ctx.roundRect === "function") {
        ctx.beginPath();
        ctx.roundRect(x, y, LED, LED, 2);
        ctx.fill();
    } else {
        ctx.fillRect(x, y, LED, LED);
    }
}

// Pre-render the full message strip to an offscreen canvas (done once)
function makeStrip(msg: string): HTMLCanvasElement {
    const chars = msg.toUpperCase().split("");
    const W = PAD_H * 2 + chars.length * CHAR_PIT;

    const c = document.createElement("canvas");
    c.width = W;
    c.height = CANVAS_H;
    const ctx = c.getContext("2d")!;

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, CANVAS_H);

    chars.forEach((ch, ci) => {
        const map = CHAR_MAP[ch] ?? CHAR_MAP[" "];
        const cx = PAD_H + ci * CHAR_PIT;

        for (let r = 0; r < ROWS; r++) {
            const row = map[r] ?? "0000000";
            for (let col = 0; col < COLS; col++) {
                const x = cx + col * P;
                const y = PAD_V + r * P;
                const on = row[col] === "1";

                if (on) {
                    const clr = ON_CLRS[Math.floor(Math.random() * ON_CLRS.length)];
                    ctx.shadowColor = clr;
                    ctx.shadowBlur = 6;
                    ctx.fillStyle = clr;
                } else {
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = OFF_CLR;
                }
                led(ctx, x, y);
            }
        }
    });

    return c;
}

export default function LedBoard() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrapper || !canvas) return;

        const W = wrapper.offsetWidth;
        canvas.width = W;
        canvas.height = CANVAS_H;

        const ctx = canvas.getContext("2d", { alpha: false })!;

        // Pre-render the single combined message strip
        const strip = makeStrip(FULL_MSG);
        const sw = strip.width;

        let x = 0;
        let lastT: number | null = null;
        let rafId: number;

        const tick = (t: number) => {
            if (lastT === null) lastT = t;
            const dt = Math.min(t - lastT, 50) / 1000;
            lastT = t;

            x -= SPEED * dt;

            // Loop seamlessly
            // Once we have scrolled left by exactly one full string width, reset x to 0.
            // Notice we need to render the strip twice if it's currently wrapping around.
            if (x <= -sw) {
                x += sw;
            }

            ctx.fillStyle = BG;
            ctx.fillRect(0, 0, W, CANVAS_H);

            // Draw primary strip
            ctx.drawImage(strip, x, 0);

            // Draw a secondary identical strip immediately following the first one 
            // to create the infinite loop illusion without gaps.
            if (x + sw < W) {
                ctx.drawImage(strip, x + sw, 0);
            }

            rafId = requestAnimationFrame(tick);
        };

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            ctx.fillStyle = BG;
            ctx.fillRect(0, 0, W, CANVAS_H);
            ctx.drawImage(strip, 0, 0);
        } else {
            rafId = requestAnimationFrame(tick);
        }

        return () => cancelAnimationFrame(rafId!);
    }, []);

    return (
        <div
            ref={wrapperRef}
            style={{
                width: "100%",
                maxWidth: "842px",
                margin: "0 auto",
                transform: "scale(0.72)",
                transformOrigin: "center center",
            }}
        >
            {/* Outer frame chrome */}
            <div
                className="led-board-chrome"
                style={{
                    borderRadius: "13px",
                    padding: "10px 14px",
                    background: "radial-gradient(circle at 10% 0, rgba(255,255,255,0.10), transparent 55%), #111",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
                    transition: "box-shadow 0.4s ease, transform 0.4s ease"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 24px 50px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)";
                    e.currentTarget.style.transform = "translateY(0px)";
                }}
                >
                <canvas
                    ref={canvasRef}
                    role="img"
                    aria-label="LED Board"
                    style={{ display: "block", width: "100%", borderRadius: "9px" }}
                />
            </div>
        </div>
    );
}
