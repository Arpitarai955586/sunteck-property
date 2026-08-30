"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { amenities } from "@/lib/data";

export default function Amenities() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const sectionRef = useRef(null);
  const total = amenities.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-zoom").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const amenityIcons = ["🏊", "🏋️", "🎭", "🌳", "🎯", "🏸"];

  return (
    <section id="amenities" className="section-base bg-navy" ref={sectionRef}>
      <h2 className="skew-head reveal">
        <span>Amenities</span>
      </h2>
      <div className="head-line reveal" style={{ background: "rgba(200,144,45,0.6)" }} />

      <div className="max-w-7xl mx-auto px-4">
        {/* Icon grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 reveal">
          {[
            { icon: "🏊", label: "Swimming Pool" },
            { icon: "🏋️", label: "Gymnasium" },
            { icon: "🎭", label: "Amphitheater" },
            { icon: "🌳", label: "Lush Gardens" },
            { icon: "🎯", label: "Sports Courts" },
            { icon: "🛒", label: "Hi-Street Retail" },
          ].map((a, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-gold/10 hover:border-gold/30 transition-all duration-300 cursor-default reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-3xl">{a.icon}</span>
              <p className="text-white/80 text-xs text-center font-medium">{a.label}</p>
            </div>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden rounded-2xl reveal-zoom">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {amenities.map((item) => (
              <div key={item.id} className="min-w-full relative">
                <div className="relative h-72 md:h-96 lg:h-[480px] w-full">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <p className="text-white/70 text-xs tracking-widest uppercase mb-1">
                      Shot at Sunteck OneWorld
                    </p>
                    <h4 className="font-playfair text-2xl text-white font-bold">
                      {item.caption}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow controls */}
          <button
            onClick={prev}
            aria-label="Previous amenity"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-gold text-white text-xl flex items-center justify-center transition-all"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next amenity"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-gold text-white text-xl flex items-center justify-center transition-all"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {amenities.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Amenity ${i + 1}`}
                className={`transition-all rounded-full ${
                  i === current ? "w-6 h-2 bg-gold" : "w-2 h-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
