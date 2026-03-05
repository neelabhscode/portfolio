"use client";

import Image from "next/image";
import React, { useRef, useCallback, useEffect, useState } from "react";
import LedBoard from "@/components/LedBoard";
import { SplitflapBoard } from "@/components/SplitflapBoard";

const NAV_H = 60; // px — total nav height

function BoardingPass() {
  const tiltRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const tilt = tiltRef.current;
    if (!tilt) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = tilt.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tilt.style.transform = `rotateX(${(-y * 12).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) scale3d(1.02,1.02,1.02)`;
      const glint = glintRef.current;
      if (glint) {
        glint.style.opacity = "1";
        glint.style.background = `radial-gradient(circle at ${((x + 0.5) * 100).toFixed(1)}% ${((y + 0.5) * 100).toFixed(1)}%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.08) 35%, transparent 70%)`;
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const tilt = tiltRef.current;
    if (tilt) tilt.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (glintRef.current) glintRef.current.style.opacity = "0";
  }, []);

  return (
    <section
      id="about"
      className="scroll-section about-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 1rem 60px",
      }}
    >
      <div className="section-wrap">
        <p className="boarding-bridge-line">
          &quot;I design the gap between what exists and what should.&quot;
        </p>

        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: "1200px",
            cursor: "default",
            width: "100%",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div
            ref={tiltRef}
            style={{
              transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
              willChange: "transform",
            }}
          >
            <div className="boarding-pass-outer boarding-pass-reveal">
              <div className="boarding-pass">
            <div className="punch top" />
            <div className="punch bottom" />

                {/* Left main ticket */}
                <div className="ticket-main">
                  <div className="dot-grid" />
                  <div className="paper-texture" />
                  <div className="light-sweep" />
                  <div
                    ref={glintRef}
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0,
                      pointerEvents: "none",
                      transition: "opacity 0.35s ease",
                      mixBlendMode: "screen",
                    }}
                  />

                  <div className="ticket-main-content">
                <div className="airline-row">
                  <span className="airline-name">ux airways</span>
                  <span className="boarding-class">Economy · Class A</span>
                </div>

                <div className="route-row">
                  <div className="airport left">
                    <span className="airport-label">From</span>
                    <span className="airport-code">VNS</span>
                    <span className="airport-subtext">India</span>
                  </div>

                  <div className="route-connector">
                    <div className="route-path">
                      <div className="route-dot-line">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="route-plane">
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor" />
                        </svg>
                      </div>
                      <div className="route-dot-line">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                    <span className="route-flight-num">UX2026 • IND → UX</span>
                  </div>

                  <div className="airport right">
                    <span className="airport-label">To</span>
                    <span className="airport-code">UX</span>
                    <span className="airport-subtext">Product Design</span>
                  </div>
                </div>

                <hr className="ticket-rule" />

                <div className="flight-desc">
                  <p className="block-label">Current Flight</p>
                  <p className="flight-desc-text">
                    Designing human-centered digital products and thoughtful interfaces.
                  </p>
                </div>

                <div className="meta-row">
                  <div className="meta-block">
                    <span className="meta-label">Passenger</span>
                    <span className="meta-value small">Neelabh Srivastava</span>
                  </div>
                  <div className="meta-block">
                    <span className="meta-label">Flight</span>
                    <span className="meta-value">UX 2026</span>
                  </div>
                  <div className="meta-block">
                    <span className="meta-label">Seat</span>
                    <span className="meta-value">17F</span>
                  </div>
                  <div className="meta-block">
                    <span className="meta-label">Gate</span>
                    <span className="meta-value">Design</span>
                  </div>
                  <div className="meta-block">
                    <span className="meta-label">Terminal</span>
                    <span className="meta-value">Internet</span>
                  </div>
                </div>

                    <div className="perf-edge" />
                  </div>
                </div>

                {/* Right stub */}
                <div className="ticket-stub">
                  <div>
                    <p className="stub-header">Boarding Pass</p>
                    <div className="stub-fields">
                      <div className="stub-field">
                        <span className="stub-field-label">Passenger</span>
                        <span className="stub-field-value">
                          Neelabh
                          <br />
                          Srivastava
                        </span>
                      </div>
                      <div className="stub-field">
                        <span className="stub-field-label">Role</span>
                        <span className="stub-field-value">Product Designer</span>
                      </div>
                      <div className="stub-field">
                        <span className="stub-field-label">Based In</span>
                        <span className="stub-field-value">India</span>
                      </div>
                      <div className="stub-field">
                        <span className="stub-field-label">Status</span>
                        <span className="stub-field-value">
                          <span className="status-dot" />
                          Available for work
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="stub-barcode">
                    <div className="barcode-bar" />
                    <p className="barcode-label">UX2026 · IND → UX · 17F</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PassportCard — 3-D tilt, single side ─────────────────────────────────────
function PassportCard() {
  const tiltRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const tilt = tiltRef.current;
    if (!tilt) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = tilt.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tilt.style.transform = `rotateX(${(-y * 18).toFixed(2)}deg) rotateY(${(x * 18).toFixed(2)}deg) scale3d(1.03,1.03,1.03)`;
      const glint = glintRef.current;
      if (glint) {
        glint.style.opacity = "1";
        glint.style.background = `radial-gradient(circle at ${((x + 0.5) * 100).toFixed(1)}% ${((y + 0.5) * 100).toFixed(1)}%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.10) 35%, transparent 70%)`;
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const tilt = tiltRef.current;
    if (tilt) tilt.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (glintRef.current) glintRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px", cursor: "default", width: "min(498px, 92vw)" }}
    >
      <div ref={tiltRef} style={{ transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)", willChange: "transform" }}>
        <div style={{
          borderRadius: "1rem", overflow: "hidden", position: "relative",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.10), 0 24px 64px rgba(0,0,0,0.14)",
        }}>
          <Image
            src="/passport-assets/passport1.jpg"
            alt="Neelabh passport-style portrait"
            width={498} height={621} priority
            style={{ display: "block", width: "100%", height: "auto", userSelect: "none", pointerEvents: "none" }}
          />
          <div ref={glintRef} aria-hidden="true" style={{
            position: "absolute", inset: 0, opacity: 0,
            borderRadius: "1rem", pointerEvents: "none",
            transition: "opacity 0.35s ease", mixBlendMode: "screen",
          }} />
          <div className="passport-scan-line" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function GateSeparator({ gate }: { gate: string }) {
  return (
    <div className="gate-separator">
      <div className="gate-separator-line" />
      <span className="gate-separator-label">GATE {gate}</span>
      <div className="gate-separator-line" />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [depClockTime, setDepClockTime] = useState("");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const format = () =>
      setDepClockTime(
        new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone,
        })
      );
    format();
    const id = setInterval(format, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reveals = document.querySelectorAll<HTMLElement>(".reveal, .boarding-pass-reveal");
    if (!("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
      }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);


  // Terminal gate indicator — scroll tracking temporarily disabled
  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //
  //   const sectionIds = [
  //     "hero",
  //     "departures",
  //     "destinations",
  //     "flightpath",
  //     "boardingpass",
  //     "contact",
  //   ] as const;
  //
  //   const sections = sectionIds
  //     .map((id) => document.getElementById(id))
  //     .filter((el): el is HTMLElement => !!el);
  //
  //   if (!sections.length) return;
  //
  //   const listItems = Array.from(
  //     document.querySelectorAll<HTMLLIElement>(
  //       ".terminal-indicator li[data-section]"
  //     )
  //   );
  //
  //   const setActive = (id: string) => {
  //     listItems.forEach((li) => {
  //       if (li.dataset.section === id) {
  //         li.classList.add("active");
  //       } else {
  //         li.classList.remove("active");
  //       }
  //     });
  //   };
  //
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           const id = (entry.target as HTMLElement).id;
  //           if (id) setActive(id);
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.35,
  //     }
  //   );
  //
  //   sections.forEach((el) => observer.observe(el));
  //
  //   const initial =
  //     sections.find((el) => {
  //       const rect = el.getBoundingClientRect();
  //       return rect.top <= window.innerHeight * 0.4 && rect.bottom >= 0;
  //     }) ?? sections[0];
  //   if (initial?.id) setActive(initial.id);
  //
  //   return () => observer.disconnect();
  // }, []);

  return (
    <>
      {/* ── Header ── */}
      <header
        aria-label="Site navigation"
        style={{
          position: "sticky", top: 0, zIndex: 50,
          backgroundColor: "rgba(25, 25, 25, 0.9)",
          color: "white",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderTop: "2px solid #4C6EF5",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: `${NAV_H}px`,
          width: "100%",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", maxWidth: "1200px", padding: "0 32px",
        }}>
          {/* Brand */}
          <button
            onClick={() => scrollTo("hero")}
            style={{
              background: "none", border: "none", padding: 0, cursor: "pointer",
              color: "white", fontFamily: "'Inter', sans-serif", fontSize: "14px",
              fontWeight: 700, letterSpacing: "0.15em"
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <span>NEELABH</span>
              <span className="brand-cursor" aria-hidden="true" />
            </span>
          </button>

          {/* Links */}
          <nav style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <button onClick={() => scrollTo("destinations")} className="nav-link">
              <span className="nav-link-main">WORK</span>
            </button>
            <button onClick={() => scrollTo("about")} className="nav-link">
              <span className="nav-link-main">ABOUT</span>
            </button>
            <a href="mailto:iamneelabhsrivastava@gmail.com" className="nav-link">
              <span className="nav-link-main">COLLABORATE</span>
            </a>
          </nav>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main
        style={{ backgroundColor: "#ffffff", position: "relative", zIndex: 1 }}
      >
        {/* Terminal gate indicator temporarily commented out */}
        {/*
        <div className="terminal-indicator" aria-hidden="true">
          <div className="terminal-indicator-inner">
            <div className="terminal-title">Terminal</div>
            <ul>
              <li data-section="hero">01 Passport</li>
              <li data-section="departures">02 Departures</li>
              <li data-section="destinations">03 Destinations</li>
              <li data-section="flightpath">04 Flight Path</li>
              <li data-section="boardingpass">05 Boarding Pass</li>
              <li data-section="contact">06 Final Call</li>
            </ul>
          </div>
        </div>
        */}
        {/* 1. HERO */}
        <section
          id="hero"
          className="scroll-section"
          style={{
            minHeight: `calc(100vh - ${NAV_H}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "140px 1rem 60px",
            backgroundColor: "#ffffff",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Subtle terminal-like background grid with soft radial spotlight */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 0,
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.045) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              backgroundPosition: "center center",
              maskImage:
                "radial-gradient(circle at 50% 30%, transparent 10%, black 80%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 30%, transparent 10%, black 80%)",
            }}
          />

          {/* Content Wrapper */}
          <div
            className="reveal reveal-hero"
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              marginTop: "-20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "-25px",
              }}
            >
              <div
                className="hero-fade-up identity-stamp"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  color: "#999",
                  textAlign: "center",
                  marginBottom: "16px",
                  fontFamily:
                    "'Inter', 'IBM Plex Mono', sans-serif, monospace",
                  textTransform: "uppercase",
                  animation: "heroFadeUp 0.6s ease-out 0.75s forwards, identityStamp 0.35s ease-out 0.8s forwards",
                }}
              >
                Identity Verified ◆ NEELABH SRIVASTAVA ◆ 2026
              </div>

              <div
                className="hero-fade-up"
                style={{
                  animation: "heroFadeUp 0.85s ease-out 0.15s forwards",
                }}
              >
                <PassportCard />
              </div>
            </div>

            <p
              className="hero-line hero-fade-up"
              style={{
                fontFamily: "'Cardo', serif",
                fontSize: "32px",
                fontWeight: 400,
                color: "#1a1a1a",
                textAlign: "center",
                lineHeight: 1.6,
                marginTop: "44px",
                animation: "heroFadeUp 0.95s ease-out 1.15s forwards",
              }}
            >
              Neelabh is a{" "}
              <em style={{ fontStyle: "italic", color: "#4C6EF5" }}>
                product designer
              </em>{" "}
              crafting human-centered experiences.
            </p>

            <div
              className="hero-cta hero-fade-up"
              role="button"
              tabIndex={0}
              onClick={() => scrollTo("departures")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  scrollTo("departures");
                }
              }}
              style={{
                animation: "heroFadeUp 0.75s ease-out 1.85s forwards",
              }}
            >
              ↓ Proceed to Departures
            </div>
          </div>

          <div className="hero-grid-fade" />
        </section>

        <div style={{ padding: "40px 0" }}>
          <GateSeparator gate="01 — DEPARTURES" />
        </div>

        {/* 2. DEPARTURES */}
        <section
          id="departures"
          className="scroll-section"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 1rem",
            backgroundColor: "#ffffff"
          }}
        >
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="departures-divider" />
            <div className="departures-board-wrap">
              <div className="departures-header">
                <span className="departures-header-label">DEPARTURES</span>
                <span className="departures-header-meta">UX AIRWAYS · TERMINAL 01</span>
                <span className="departures-header-time" id="dep-clock" aria-live="off">
                  {depClockTime}
                </span>
              </div>
              <SplitflapBoard />
              <div className="departures-cta">
                <span className="departures-cta-label">STATUS: BOARDING</span>
                <a href="mailto:iamneelabhsrivastava@gmail.com" className="departures-cta-link">
                  Book a flight with Neelabh →
                </a>
              </div>
            </div>
            <div className="departures-divider" />
          </div>
        </section>

        <div style={{ padding: "40px 0" }}>
          <GateSeparator gate="02 — DESTINATIONS" />
        </div>

        {/* 3. WORK */}
        <section
          id="destinations"
          className="scroll-section section-alt reveal reveal-standard"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "140px 1rem 8rem 1rem",
            backgroundColor: "#ffffff"
          }}
        >
          <div style={{
            fontSize: "12px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#777",
            marginBottom: "32px",
            textAlign: "center",
            fontFamily: "'IBM Plex Mono', monospace"
          }}>
            Destinations
            <p className="section-sub-label">
              Select your flight below
            </p>
          </div>

          <div className="project-grid">
            {[
              {
                title: "MIROOH",
                route: "UX-01",
                type: "E-commerce UX redesign",
                year: "2026",
                desc: "Redesigning product discovery and purchase flow to improve usability and trust.",
                status: "BOARDING" as const,
                placeholder: false,
              },
              {
                title: "KULLVI WHIMS",
                route: "UX-02",
                type: "E-commerce UX redesign",
                year: "2025",
                desc: "Redesigning product discovery and purchase flow to improve usability and trust.",
                status: "ON TIME" as const,
                placeholder: false,
              },
              {
                title: "TILFI",
                route: "UX-03",
                type: "E-commerce UX redesign",
                year: "2026",
                desc: "Redesigning product discovery and purchase flow to improve usability and trust.",
                status: "CASE STUDY READY" as const,
                placeholder: false,
              },
              {
                title: "ROUTE UNDISCLOSED",
                route: "UX-04",
                type: "",
                year: "",
                desc: "Next destination being charted. Check back soon.",
                status: "COMING SOON" as const,
                placeholder: true,
              }
            ].map((proj, idx) => (
              <a
                href={proj.placeholder ? undefined : "#"}
                className="project-card"
                key={idx}
                style={{
                  opacity: proj.placeholder ? 0.6 : 1,
                  pointerEvents: proj.placeholder ? 'none' : 'auto',
                  textDecoration: "none"
                }}
              >
                {!proj.placeholder ? (
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>

                    {/* Top Row: Title + (Year & Status) */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%", marginBottom: "8px", gap: "12px" }}>
                      <h3 style={{ fontSize: "20px", fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "#111", letterSpacing: "-0.02em", margin: 0, display: "flex", alignItems: "center", minWidth: 0 }}>
                        <span style={{ fontSize: "13px", letterSpacing: "0.2em", color: "#4C6EF5", marginRight: "8px", fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0 }}>{proj.route}</span>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{proj.title}</span>
                      </h3>
                      <div style={{ flexShrink: 0 }}>
                        <span className="card-status-chip">
                          {proj.status}
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#999", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace" }}>ROUTE</span>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px" }}>
                        <span style={{ fontSize: "13px", letterSpacing: "0.05em", fontFamily: "'IBM Plex Mono', monospace", color: "#777" }}>
                          {proj.type}
                        </span>
                        <span style={{ fontSize: "14px", fontFamily: "'IBM Plex Mono', monospace", color: "#111", letterSpacing: "0.05em", fontWeight: 500, flexShrink: 0 }}>
                          {proj.year}
                        </span>
                      </div>
                    </div>

                    {/* Divider Line */}
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#e6e6e6", margin: "16px 0" }} />

                    {/* Description */}
                    <p style={{ fontSize: "15px", fontFamily: "'Inter', sans-serif", color: "#666", lineHeight: 1.6, marginBottom: "32px", flexGrow: 1 }}>
                      {proj.desc}
                    </p>

                    {/* View Link */}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontFamily: "'Inter', sans-serif", color: "#111", fontWeight: 500 }}>
                      View flight details
                      <span className="case-arrow" style={{ display: "inline-block" }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%", marginBottom: "8px", gap: "12px" }}>
                      <h3 style={{ fontSize: "18px", fontFamily: "'Inter', sans-serif", fontWeight: 500, color: "#111", letterSpacing: "0.12em", margin: 0, textTransform: "uppercase", minWidth: 0 }}>
                        {proj.title}
                      </h3>
                      <span className="card-status-chip card-status-chip--soon" style={{ flexShrink: 0 }}>
                        {proj.status}
                      </span>
                    </div>
                    <p style={{ fontSize: "14px", fontFamily: "'Inter', sans-serif", color: "#666", lineHeight: 1.6 }}>
                      {proj.desc}
                    </p>
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>

        <div style={{ padding: "40px 0" }}>
          <GateSeparator gate="03 — FLIGHT PATH" />
        </div>

        {/* 4. PROCESS */}
        <section
          id="flightpath"
          className="scroll-section reveal reveal-standard"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "8rem 1rem",
            backgroundColor: "#fafafa"
          }}
        >
          <div style={{
            fontSize: "12px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#777",
            marginBottom: "32px",
            textAlign: "center",
            fontFamily: "'IBM Plex Mono', monospace"
          }}>
            Design Path
            <p className="section-sub-label" style={{ marginBottom: 0 }}>
              How I fly from brief to launch
            </p>
          </div>

          <div className="flight-timeline">
            <div className="flight-timeline-rail">
              <div className="flight-timeline-line" aria-hidden="true" />
              <div className="flight-stop">
                <div className="flight-stop-dot" />
              </div>
              <div className="flight-stop">
                <div className="flight-stop-dot" />
              </div>
              <div className="flight-stop">
                <div className="flight-stop-dot" />
              </div>
              <div className="flight-stop">
                <div className="flight-stop-dot" />
              </div>
            </div>

            <div className="flight-steps">
              <div className="flight-step">
                <h3 className="flight-step-heading">
                  <span className="flight-step-num">01.</span> DISCOVER
                </h3>
                <p className="flight-step-desc">Understanding users, problems, and new contexts through research and observation.</p>
              </div>
              <div className="flight-step">
                <h3 className="flight-step-heading">
                  <span className="flight-step-num">02.</span> DEFINE
                </h3>
                <p className="flight-step-desc">Clarifying the core problem and mapping the most meaningful solution space.</p>
              </div>
              <div className="flight-step">
                <h3 className="flight-step-heading">
                  <span className="flight-step-num">03.</span> DESIGN
                </h3>
                <p className="flight-step-desc">Exploring and building prototypes that are clear, considered, and testable.</p>
              </div>
              <div className="flight-step">
                <h3 className="flight-step-heading">
                  <span className="flight-step-num">04.</span> REFINE
                </h3>
                <p className="flight-step-desc">Testing, learning and sharpening until the solution earns its place.</p>
              </div>
            </div>
          </div>
        </section>

        <div style={{ padding: "40px 0" }}>
          <GateSeparator gate="04 — BOARDING" />
        </div>

        {/* 5. ABOUT */}
        <section
          id="boardingpass"
          className="scroll-section about-section section-soft reveal reveal-narrative"
        >
          <BoardingPass />
        </section>

        <div style={{ padding: "40px 0" }}>
          <GateSeparator gate="05 — FINAL CALL" />
        </div>

        {/* 6. CONTACT */}
        <section
          id="contact"
          className="scroll-section reveal"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 1rem",
          }}
        >
          <div className="reveal reveal-narrative"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "140px 0",
              textAlign: "center",
            }}
          >
            <div className="gate-closing-bar">
              <span className="gate-closing-label">GATE 05 · CLOSING</span>
              <div className="gate-closing-track">
                <div className="gate-closing-fill" />
              </div>
            </div>

            <div className="led-board-glow-wrapper">
              <LedBoard />
            </div>

            <p
              style={{
                fontSize: "38px",
                fontWeight: 500,
                lineHeight: 1.3,
                color: "#222222",
                maxWidth: "720px",
                margin: "24px auto",
                fontFamily: "'Cardo', serif",
              }}
            >
              Last call. Gate closes when you close this tab.
            </p>

            {/* Primary CTA */}
            <a
              href="mailto:iamneelabhsrivastava@gmail.com"
              className="contact-cta-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "24px",
                background: "#111111",
                color: "#ffffff",
                textTransform: "uppercase",
                textDecoration: "none",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              <span>COLLABORATE</span>
              <span style={{ display: "inline-block" }}>→</span>
            </a>

            {/* Secondary links */}
            <div
              style={{
                color: "#555555",
                marginTop: "28px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Email", href: "mailto:iamneelabhsrivastava@gmail.com" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/neelabhsr", external: true },
                { label: "Resume", href: "#" },
              ].map((link, idx) => (
                <React.Fragment key={link.label}>
                  {idx > 0 && <span className="link-sep" aria-hidden="true">·</span>}
                  <a
                    href={link.href}
                    className="contact-secondary-link"
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                    style={{
                      color: "#555555",
                      textDecoration: "none",
                      fontFamily: "'IBM Plex Mono', monospace",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#111111";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#555555";
                    }}
                  >
                    {link.label}
                  </a>
                </React.Fragment>
              ))}
            </div>

            <div className="contact-status-line">
              <span className="status-dot" aria-hidden="true" />
              <span>STATUS: AVAILABLE FOR PRODUCT DESIGN ROLES</span>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer / Runway ── */}
      <footer
        style={{
          padding: "64px 0 48px",
          textAlign: "center",
          backgroundColor: "#0B0B0B",
          color: "#EAEAEA",
          scrollSnapAlign: "end",
        }}
      >
        <div className="reveal reveal-narrative"
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div className="footer-stamp">
            FLIGHT COMPLETE
          </div>
          <div
            style={{
              fontSize: "15px",
              marginTop: "12px",
              marginBottom: "32px",
              color: "#999",
              fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Thanks for visiting the terminal.
          </div>

          {/* Runway lights */}
          <div className="runway-lights-row">
            {Array.from({ length: 24 }).map((_, idx) => (
              <span
                key={idx}
                className="runway-light"
                style={{
                  background: idx % 2 === 0 ? "#FACC15" : "#F97373",
                }}
              />
            ))}
          </div>

          {/* Metadata */}
          <p className="footer-meta">
            © 2026 Neelabh Srivastava · UX Airways · Terminal: Internet · Gate: UX
          </p>
          <p className="footer-tail">REG: ND2026UX · AIRCRAFT: PRODUCT DESIGN · CREW: 01</p>
        </div>
      </footer>
    </>
  );
}
