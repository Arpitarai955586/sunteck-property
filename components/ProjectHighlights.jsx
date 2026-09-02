"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  FaHome, FaCity, FaSun, FaBuilding, FaTree, FaLeaf,
} from "react-icons/fa";

const uspIcons = {
  1: <FaHome size={28} className="text-gold" />,
  2: <FaCity size={28} className="text-gold" />,
  3: <FaSun size={28} className="text-gold" />,
  4: <FaBuilding size={28} className="text-gold" />,
  5: <FaTree size={28} className="text-gold" />,
  6: <FaLeaf size={28} className="text-gold" />,
};

const projectHighlights = [
  { id: 1, title: "Ultra Spacious & Well-Designed Homes" },
  { id: 2, title: "World-Class Gated Community Living" },
  { id: 3, title: "Mesmerising Views" },
  { id: 4, title: "Largest Clubhouse in Naigaon" },
  { id: 5, title: "150 Acres: The Largest Township of the Western Suburbs" },
  { id: 6, title: "10.2 Acres of Lush Green Expanse" },
];

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
      <h2 className="skew-head reveal"><span>Project Highlights</span></h2>
      <div className="head-line reveal" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="reveal-left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image src="/images/highlight.jpg" alt="Sunteck OneWorld – Project Highlight" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 100vw, 50vw" />
              {/* <div className="absolute top-4 left-4 bg-gold text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wide"></div> */}
            </div>
          </div>

          {/* USP Grid */}
          <div className="reveal-right">
            <p className="text-gold font-semibold tracking-widest uppercase text-xs mb-3">Why Choose Us</p>
            <h3 className="font-playfair text-3xl font-bold text-navy mb-6 leading-tight">
              An Address That Defines <span className="text-gold">Aspirational Living</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projectHighlights.map((item, i) => (
                <div key={item.id} className="usp-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="shrink-0 mt-0.5">{uspIcons[item.id]}</span>
                  <p className="text-sm text-dark font-medium leading-snug">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
