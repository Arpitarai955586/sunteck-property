"use client";
import { FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";

export default function MapSection() {
  return (
    <section id="map" aria-label="Project location on Google Maps" className="relative bg-navy py-6">
      <div className="max-w-7xl mx-auto px-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white">
          <FaMapMarkerAlt className="text-gold text-xl shrink-0" />
          <div>
            <h4 className="font-playfair font-bold text-lg leading-tight">Sunteck OneWorld Location</h4>
            <p className="text-white/60 text-xs">Naigaon West, Maharashtra – Near Naigaon Railway Station</p>
          </div>
        </div>
        <a
          href="https://maps.app.goo.gl/Sunteck-OneWorld-Naigaon"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold text-xs px-4 py-2 flex items-center gap-2 shrink-0"
          onClick={(e) => {
            e.preventDefault();
            window.open(
              "https://www.google.com/maps/search/Sunteck+OneWorld+Naigaon+West/@19.3654,72.8422,16z",
              "_blank"
            );
          }}
        >
          <span>Open in Google Maps</span>
          <FaExternalLinkAlt size={12} />
        </a>
      </div>

      <div className="w-full h-[450px] relative overflow-hidden shadow-xl border-y border-white/10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5!2d72.8422!3d19.3654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7af0000000001%3A0x0!2sSunteck+OneWorld%2C+Naigaon+West%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Sunteck OneWorld location on Google Maps – Naigaon West"
        />
      </div>
    </section>
  );
}
