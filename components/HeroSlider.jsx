"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { heroSlides } from "@/lib/data";

export default function HeroSlider({ onEnquire }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(idx);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % heroSlides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + heroSlides.length) % heroSlides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-screen min-h-[500px] overflow-hidden" aria-label="Hero image slideshow">
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pt-20">
        <div
          className="reveal visible"
          style={{ animationDelay: "0.2s" }}
        >
          <p className="text-gold font-semibold tracking-[0.3em] uppercase text-sm mb-3">
            Premium Luxury Township
          </p>
          <h1 className="font-playfair text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg mb-4">
            Sunteck <span className="text-gold">OneWorld</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
            150 Acres of Aspirational Living in Naigaon West
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={onEnquire}
              className="btn-gold px-8 py-4 text-base animate-pulse-gold"
            >
              Enquire Now
            </button>
            <a
              href="#highlights"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-outline-gold px-8 py-4 text-base text-white border-white hover:bg-white hover:text-navy"
            >
              Explore Project
            </a>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 text-white text-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 text-white text-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2.5 bg-gold"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 right-6 z-20 text-white/60 text-xs hidden md:flex flex-col items-center gap-1">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/40" />
      </div>
    </section>
  );
}
