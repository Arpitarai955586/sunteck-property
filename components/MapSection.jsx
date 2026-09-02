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
            <p className="text-white/60 text-xs">Naigaon East, Maharashtra (19°21&apos;55.8&quot;N 72°51&apos;31.9&quot;E)</p>
          </div>
        </div>
        <a
          href="https://maps.app.goo.gl/HubYibK1KbUz5ESs9"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold text-xs px-4 py-2 flex items-center gap-2 shrink-0"
        >
          <span>Open in Google Maps</span>
          <FaExternalLinkAlt size={12} />
        </a>
      </div>

      <div className="w-full h-[450px] relative overflow-hidden shadow-xl border-y border-white/10">
        <iframe
          src="https://maps.google.com/maps?q=19.3654976,72.8588562&hl=en&z=16&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Sunteck OneWorld exact location on Google Maps"
        />
      </div>
    </section>
  );
}
