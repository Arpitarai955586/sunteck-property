"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { projectHighlights } from "@/lib/data";

export default function ProjectHighlights() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom").forEach((el, i) => {
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
    <section id="highlights" className="section-base bg-white" ref={sectionRef}>
      <h2 className="skew-head reveal">
        <span>Project Highlights</span>
      </h2>
      <div className="head-line reveal" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Image */}
          <div className="reveal-left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/highlight.jpg"
                alt="Sunteck OneWorld – Project Highlight"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-gold text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">
                150 Acres Township
              </div>
            </div>
          </div>

          {/* Right: USP Grid */}
          <div className="reveal-right">
            <p className="text-gold font-semibold tracking-widest uppercase text-xs mb-3">
              Why Choose Us
            </p>
            <h3 className="font-playfair text-3xl font-bold text-navy mb-6 leading-tight">
              An Address That Defines{" "}
              <span className="text-gold">Aspirational Living</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projectHighlights.map((item, i) => (
                <div
                  key={item.id}
                  className="usp-card reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="text-3xl shrink-0 mt-0.5">{item.icon}</span>
                  <p className="text-sm text-dark font-medium leading-snug">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
