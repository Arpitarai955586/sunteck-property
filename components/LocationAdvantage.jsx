"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { locationPoints } from "@/lib/data";
import { FaTrain, FaLink, FaSearchPlus } from "react-icons/fa";

export default function LocationAdvantage({ onLightbox }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
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

  return (
    <section id="location" className="section-base bg-light-bg" ref={sectionRef}>
      <h2 className="skew-head reveal"><span>Location Advantage</span></h2>
      <div className="head-line reveal" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-center">
          {/* Left: Map image */}
          <div className="reveal-left">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] cursor-zoom-in group"
              onClick={() => onLightbox?.("/images/location.jpg", "Location Advantage Map")}
              role="button" tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onLightbox?.("/images/location.jpg")}
              aria-label="View location map in full screen"
            >
              <Image src="/images/location.jpg" alt="Sunteck OneWorld Location Advantage Map" fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 60vw" />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-all duration-300 flex items-center justify-center">
                <FaSearchPlus size={36} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

          {/* Right: Distance list */}
          <div className="reveal-right">
            <p className="text-gold font-semibold tracking-widest uppercase text-xs mb-3">Connectivity</p>
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-navy mb-6">
              Strategic Location, <span className="text-gold">Unmatched Access</span>
            </h3>

            <div className="space-y-2">
              {locationPoints.map((point, i) => (
                <div key={i} className="loc-item reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                    {i < 3 ? <FaTrain size={14} /> : <FaLink size={14} />}
                  </div>
                  <div>
                    {point.time && <span className="font-bold text-gold text-sm mr-2">{point.time}</span>}
                    <span className="text-sm text-dark">{point.place}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-navy text-white text-sm">
              <p className="font-semibold text-gold mb-1">Naigaon East, Maharashtra</p>
              <p className="text-white/70 text-xs leading-relaxed">
                Naigaon enjoys excellent connectivity via railways, roadways, and upcoming metro infrastructure connecting it to the broader MMR region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
