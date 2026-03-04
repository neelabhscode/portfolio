"use client";

import Image from "next/image";
import React, { useRef, useCallback, useEffect } from "react";
import LedBoard from "@/components/LedBoard";
import { SplitflapBoard } from "@/components/SplitflapBoard";

const NAV_H = 64; // px — total nav height

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
        padding: "8rem 1rem",
      }}
    >
      <div className="section-wrap">
        <p className="section-title">UX AIR BOARDING PASS</p>

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
            <div className="boarding-pass-outer">
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
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
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
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
          height: `${NAV_H}px`,
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
              fontWeight: 500, letterSpacing: "0.15em"
            }}
          >
            NEELABH
          </button>

          {/* Links */}
          <nav style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <button onClick={() => scrollTo("destinations")} className="nav-link">work</button>
            <button onClick={() => scrollTo("about")} className="nav-link">about</button>
            <button onClick={() => scrollTo("contact")} className="nav-link">collaborate &rarr;</button>
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
            padding: "140px 1rem 4rem",
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
                // 20% darker than the 70% opacity version (0.021 * 1.2 ≈ 0.025)
                "linear-gradient(rgba(0, 0, 0, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.025) 1px, transparent 1px)",
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
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "#999",
                  textAlign: "center",
                  marginBottom: "16px",
                  fontFamily:
                    "'Inter', 'IBM Plex Mono', sans-serif, monospace",
                  textTransform: "uppercase",
                }}
              >
                Identity Verified • Product Designer • 2026
              </div>

              <PassportCard />
            </div>

            <p
              className="hero-line"
              style={{
                fontFamily: "'Cardo', serif",
                fontSize: "28px",
                fontWeight: 400,
                color: "#1a1a1a",
                textAlign: "center",
                lineHeight: 1.6,
                marginTop: "44px",
              }}
            >
              Neelabh is a{" "}
              <em className="shimmer-text" style={{ fontStyle: "italic" }}>
                product designer
              </em>{" "}
              crafting human-centered experiences.
            </p>
          </div>

          <div className="hero-grid-fade" />
        </section>

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
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "36px" }}>
            <div style={{ width: "80px", height: "1px", backgroundColor: "#e5e5e5", marginBottom: "20px" }} />
            <div style={{
              fontSize: "12px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#777",
              textAlign: "center",
              fontFamily: "'IBM Plex Mono', monospace"
            }}>
              Departures
            </div>
            <div style={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#888",
              textAlign: "center",
              fontFamily: "'IBM Plex Mono', monospace",
              marginTop: "10px"
            }}>
              UX AIRWAYS TERMINAL
            </div>
            <div style={{ width: "80px", height: "1px", backgroundColor: "#e5e5e5", marginTop: "20px" }} />
          </div>
          <SplitflapBoard />
        </section>

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
            marginBottom: "48px",
            textAlign: "center",
            fontFamily: "'IBM Plex Mono', monospace"
          }}>
            Destinations
          </div>

          <div className="project-grid">
            {[
              {
                title: "MIROOH",
                route: "UX-01",
                type: "E-commerce UX redesign",
                year: "2026",
                desc: "Redesigning product discovery and purchase flow to improve usability and trust."
              },
              {
                title: "KULLVI WHIMS",
                route: "UX-02",
                type: "E-commerce UX redesign",
                year: "2025",
                desc: "Redesigning product discovery and purchase flow to improve usability and trust."
              },
              {
                title: "TILFI",
                route: "UX-03",
                type: "E-commerce UX redesign",
                year: "2026",
                desc: "Redesigning product discovery and purchase flow to improve usability and trust."
              },
              {
                title: "",
                route: "",
                type: "",
                year: "",
                desc: ""
              }
            ].map((proj, idx) => (
              <a
                href={proj.title ? "#" : undefined}
                className="project-card"
                key={idx}
                style={{
                  opacity: proj.title ? 1 : 0.05,
                  pointerEvents: proj.title ? 'auto' : 'none',
                  textDecoration: "none"
                }}
              >
                {proj.title ? (
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>

                    {/* Top Row: Title + Year */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", width: "100%", marginBottom: "8px" }}>
                      <h3 style={{ fontSize: "20px", fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "#111", letterSpacing: "-0.02em", margin: 0, display: "flex", alignItems: "center" }}>
                        <span style={{ fontSize: "12px", letterSpacing: "0.15em", color: "#888", marginRight: "8px", fontFamily: "'IBM Plex Mono', monospace" }}>{proj.route}</span>
                        {proj.title}
                      </h3>
                      <span style={{ fontSize: "14px", fontFamily: "'IBM Plex Mono', monospace", color: "#111", letterSpacing: "0.05em", fontWeight: 500 }}>
                        {proj.year}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#999", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace" }}>ROUTE</span>
                      <span style={{ fontSize: "13px", letterSpacing: "0.05em", fontFamily: "'IBM Plex Mono', monospace", color: "#777" }}>
                        {proj.type}
                      </span>
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
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    height: "100%", width: "100%", minHeight: "220px"
                  }}>
                    {/* Empty placeholder */}
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>

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
            backgroundColor: "#ffffff"
          }}
        >
          <div style={{
            fontSize: "12px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#777",
            marginBottom: "64px",
            textAlign: "center",
            fontFamily: "'IBM Plex Mono', monospace"
          }}>
            Design Path
          </div>

          <div className="flight-path-grid">
            {/* Continuous Line (Desktop Only) */}
            <div
              className="flight-path-line-full"
              style={{
                gridColumn: "2 / 9",
                gridRow: 3,
                width: "100%",
                height: "2px",
                backgroundColor: "#d1d5db",
                alignSelf: "center",
                zIndex: 1
              }}
            />

            {/* Steps */}
            {[
              {
                title: "DISCOVER",
                desc: "Understanding users, problems and context."
              },
              {
                title: "DEFINE",
                desc: "Clarifying the core problem and constraints."
              },
              {
                title: "DESIGN",
                desc: "Exploring solutions and building prototypes."
              },
              {
                title: "REFINE",
                desc: "Testing, learning and improving the product."
              }
            ].map((step, i) => (
              <React.Fragment key={i}>
                <h4 className="flight-path-title" style={{ gridColumn: i * 2 + 2, gridRow: 1 }}>{step.title}</h4>
                <div className="flight-path-node" style={{ gridColumn: i * 2 + 2, gridRow: 3 }} />
                <p className="flight-path-desc" style={{ gridColumn: i * 2 + 2, gridRow: 5 }}>{step.desc}</p>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* 5. ABOUT */}
        <section
          id="boardingpass"
          className="scroll-section about-section section-soft reveal reveal-narrative"
        >
          <BoardingPass />
        </section>

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
            backgroundColor: "#ffffff"
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
            <div style={{ marginBottom: "36px", display: "flex", justifyContent: "center" }}>
              <LedBoard />
            </div>

            <p
              style={{
                fontSize: "48px",
                fontWeight: 500,
                lineHeight: 1.25,
                color: "#222222",
                maxWidth: "720px",
                margin: "24px auto",
                fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Let’s build thoughtful digital products together.
            </p>

            {/* Primary CTA */}
            <a
              href="mailto:neelabh@example.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 22px",
                marginTop: "24px",
                background: "#111111",
                color: "#ffffff",
                borderRadius: "10px",
                fontSize: "14px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.2s ease",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span>COLLABORATE</span>
              <span style={{ display: "inline-block" }}>→</span>
            </a>

            {/* Secondary links */}
            <div
              style={{
                fontSize: "15px",
                color: "#555555",
                marginTop: "28px",
                display: "flex",
                justifyContent: "center",
                gap: "22px",
              }}
            >
              {[
                { label: "Email", href: "mailto:neelabh@example.com" },
                { label: "LinkedIn", href: "https://www.linkedin.com" },
                { label: "Resume", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "15px",
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
              ))}
            </div>

            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "#999999",
                marginTop: "44px",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              STATUS: AVAILABLE FOR PRODUCT DESIGN ROLES
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer / Runway ── */}
      <footer
        style={{
          padding: "100px 0 70px",
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
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#aaaaaa",
              marginTop: "10px",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            FLIGHT COMPLETE
          </div>
          <div
            style={{
              fontSize: "16px",
              marginTop: "12px",
              color: "#cccccc",
              fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Thanks for visiting the terminal.
          </div>

          {/* Runway lights */}
          <div className="runway-lights-row">
            {Array.from({ length: 36 }).map((_, idx) => (
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
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.12em",
              color: "#7a7a7a",
              marginTop: "32px",
              fontFamily: "'IBM Plex Mono', monospace",
              textTransform: "uppercase",
            }}
          >
            © 2026 Neelabh Srivastava
          </div>
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "0.12em",
              color: "#7a7a7a",
              marginTop: "8px",
              fontFamily: "'IBM Plex Mono', monospace",
              textTransform: "uppercase",
            }}
          >
            Terminal: Internet · Gate: UX
          </div>
        </div>
      </footer>
    </>
  );
}
