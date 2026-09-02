"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const floorPlans = [
  {
    id: 1,
    type: "1 BHK",
    src: "/images/floor1.jpg",
    desc: "Smartly designed 1-bedroom homes with optimal use of space.",
  },
  {
    id: 2,
    type: "2 BHK",
    src: "/images/floor2.jpg",
    desc: "Spacious 2-bedroom homes for the growing family.",
  },
];

export default function FloorPlans({ onFloorClick }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-zoom").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 150);
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
    <section id="floor-plans" className="section-base bg-white" ref={sectionRef}>
      <h2 className="skew-head reveal">
        <span>Floor Plan</span>
      </h2>
      <div className="head-line reveal" />

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {floorPlans.map((plan, i) => (
            <div
              key={plan.id}
              className="floor-card reveal-zoom group flex flex-col"
              style={{ transitionDelay: `${i * 120}ms` }}
              onClick={onFloorClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onFloorClick?.()}
              aria-label={`View ${plan.type} floor plan details`}
            >
              {/* Fixed height image area — same for both cards */}
              <div className="relative w-full overflow-hidden" style={{ height: "300px" }}>
                <Image
                  src={plan.src}
                  alt={`${plan.type} Floor Plan`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Overlay */}
              <div className="floor-card-overlay">
                <p className="text-xs tracking-widest uppercase text-gold mb-1">
                  Click here for details
                </p>
                <h3 className="font-playfair text-3xl font-bold text-white">
                  {plan.type}
                </h3>
              </div>
              {/* Bottom label — flex-grow so both cards stretch equally */}
              <div className="p-4 bg-navy flex items-center justify-between flex-1">
                <div>
                  <h4 className="font-playfair text-lg font-bold text-white">
                    {plan.type}
                  </h4>
                  <p className="text-white/60 text-xs">{plan.desc}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onFloorClick?.(); }}
                  className="btn-gold text-xs px-4 py-2 shrink-0"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
