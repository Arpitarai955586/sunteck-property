"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { configurations } from "@/lib/data";

export default function Configuration({ onPriceClick }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
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
    <section id="configuration" className="section-base bg-light-bg" ref={sectionRef}>
      <h2 className="skew-head reveal">
        <span>Configuration</span>
      </h2>
      <div className="head-line reveal" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Config details */}
          <div className="reveal-left">
            <p className="text-gold font-semibold tracking-widest uppercase text-xs mb-4">
              Residential Units
            </p>
            <div className="space-y-8">
              {configurations.map((config, i) => (
                <div
                  key={config.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-playfair text-2xl font-bold text-navy">
                      {config.type}
                    </h3>
                    <span className="bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full border border-gold/20">
                      Available
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {config.description}
                  </p>
                  <button
                    onClick={onPriceClick}
                    className="btn-gold text-sm px-5 py-2.5"
                  >
                    Click Here For Carpet Area &amp; Price
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Render image */}
          <div className="reveal-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/config.jpg"
                alt="Apartment Configuration Render"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/80 to-transparent">
                <p className="text-white text-sm font-medium">
                  Ultra-spacious, Well-Designed Homes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
