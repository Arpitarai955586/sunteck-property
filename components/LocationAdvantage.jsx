"use client";
import { useEffect, useRef } from "react";
import { locationPoints } from "@/lib/data";
import { FaTrain, FaLink, FaExternalLinkAlt } from "react-icons/fa";

export default function LocationAdvantage() {
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

          {/* Left: Real Google Maps embed */}
          <div className="reveal-left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ height: "420px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5!2d72.8397!3d19.3654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7af1b1b1b1b1b%3A0x0!2sSunteck+OneWorld%2C+Naigaon+West%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sunteck OneWorld – Naigaon West Location"
              />
            </div>
            {/* Open in Maps button below iframe */}
            <a
              href="https://www.google.com/maps/search/Sunteck+OneWorld+Naigaon+West/@19.3654,72.8422,16z"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white px-4 py-2 rounded-lg"
              style={{ background: "var(--navy)" }}
            >
              <FaExternalLinkAlt size={11} />
              Open in Google Maps
            </a>
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
              <p className="font-semibold text-gold mb-1">Naigaon West, Maharashtra</p>
              <p className="text-white/70 text-xs leading-relaxed">
                Naigaon enjoys excellent connectivity via railways, roadways, and upcoming metro infrastructure connecting it to the broader MMR region.
              </p>
              <a
                href="https://www.google.com/maps/search/Sunteck+OneWorld+Naigaon+West/@19.3654,72.8422,16z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-gold text-xs font-semibold hover:underline"
              >
                <FaLink size={11} />
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
