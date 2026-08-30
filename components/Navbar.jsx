"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { navLinks } from "@/lib/data";

export default function Navbar({ onEnquire }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setDrawerOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Overlay backdrop ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Side Drawer (mobile) ── */}
      <nav
        className={`side-drawer ${drawerOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!drawerOpen}
      >
        <button
          className="self-end text-white text-2xl mb-8 p-2 hover:text-gold transition-colors"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        <div className="mb-8">
          <span className="text-white font-playfair text-xl font-bold">
            Sunteck{" "}
            <span className="text-gold">OneWorld</span>
          </span>
        </div>
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block py-3 px-2 text-white/80 hover:text-gold border-b border-white/10 text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => { setDrawerOpen(false); onEnquire?.(); }}
          className="mt-8 btn-gold w-full text-center"
        >
          Enquire Now
        </button>
      </nav>

      {/* ── Main Navbar ── */}
      <header
        id="home"
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-400 ${
          scrolled
            ? "bg-navy shadow-lg py-2"
            : "bg-navy/95 py-3"
        }`}
        style={{ background: scrolled ? "var(--navy)" : "rgba(26,26,46,0.97)" }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Left: Project Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="flex flex-col leading-tight">
              <span className="text-white font-playfair text-lg md:text-xl font-bold tracking-wide">
                Sunteck
              </span>
              <span className="text-gold font-playfair text-sm md:text-base font-semibold tracking-widest uppercase">
                OneWorld
              </span>
            </div>
          </a>

          {/* Center: Nav Links (desktop) */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            <ul className="flex items-center gap-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="nav-link block px-3 py-2 text-white/80 hover:text-gold text-xs xl:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onEnquire}
              className="hidden md:inline-block btn-gold text-xs px-4 py-2"
            >
              Enquire Now
            </button>
            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 text-white focus:outline-none"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <span className="block w-6 h-0.5 bg-white transition-all" />
              <span className="block w-6 h-0.5 bg-white transition-all" />
              <span className="block w-4 h-0.5 bg-gold transition-all" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
