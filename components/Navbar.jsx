"use client";
import { useState, useEffect } from "react";
import { navLinks } from "@/lib/data";
import { HiX, HiMenu } from "react-icons/hi";

export default function Navbar({ onEnquire }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      if (window.scrollY < 150) {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks
      .map((l) => l.href.replace("#", ""))
      .filter((id) => id && id !== "home");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 150) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href) => {
    setDrawerOpen(false);
    const id = href.replace("#", "");
    setActiveSection(id);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Side Drawer (mobile) */}
      <div
        className={`side-drawer ${drawerOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
      >
        <button
          className="self-end text-white text-2xl mb-8 p-2 hover:text-gold transition-colors"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
        >
          <HiX size={24} />
        </button>
        <div className="mb-8">
          <span
            className="text-white text-xl font-bold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Sunteck <span className="text-gold">OneWorld</span>
          </span>
        </div>
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className={`w-full text-left py-3 px-2 border-b border-white/10 text-sm font-medium transition-colors ${
                    isActive ? "text-gold" : "text-white/80 hover:text-gold"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => {
            setDrawerOpen(false);
            onEnquire?.();
          }}
          className="mt-8 btn-gold w-full text-center"
        >
          Enquire Now
        </button>
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? "shadow-lg py-2" : "py-3"
        }`}
        style={{ background: scrolled ? "var(--navy)" : "rgba(26,26,46,0.97)" }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2 shrink-0 focus:outline-none"
            aria-label="Go to top"
          >
            <div className="flex flex-col leading-tight text-left">
              <span
                className="text-white text-lg md:text-xl font-bold tracking-wide"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Sunteck
              </span>
              <span
                className="text-gold text-sm md:text-base font-semibold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                OneWorld
              </span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center" aria-label="Main navigation">
            <ul className="flex items-center gap-0">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className={`relative block px-3 py-2 text-xs xl:text-sm font-medium transition-colors duration-200 focus:outline-none group ${
                        isActive ? "text-gold" : "text-white/80 hover:text-gold"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full transition-all duration-300 ${
                          isActive ? "opacity-100 bg-gold" : "opacity-0 group-hover:opacity-50 bg-gold"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onEnquire}
              className="hidden md:inline-block btn-gold text-xs px-4 py-2"
            >
              Enquire Now
            </button>
            <button
              className="lg:hidden p-2 text-white focus:outline-none"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
            >
              <HiMenu size={26} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
