"use client";
import { disclaimerText } from "@/lib/data";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

export default function Footer({ onDisclaimer }) {
  return (
    <footer id="footer" className="bg-navy text-white">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* QR codes */}
          <div className="flex gap-4 items-center justify-center md:justify-start">
            <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center p-1">
              <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
                  <text x="10" y="55" fontSize="8" fill="#333">QR Code</text>
                  <rect x="10" y="10" width="25" height="25" fill="none" stroke="#333" strokeWidth="3"/>
                  <rect x="15" y="15" width="15" height="15" fill="#333"/>
                  <rect x="65" y="10" width="25" height="25" fill="none" stroke="#333" strokeWidth="3"/>
                  <rect x="70" y="15" width="15" height="15" fill="#333"/>
                  <rect x="10" y="65" width="25" height="25" fill="none" stroke="#333" strokeWidth="3"/>
                  <rect x="15" y="70" width="15" height="15" fill="#333"/>
                </svg>
              </div>
            </div>
            <div className="text-xs text-white/60 leading-relaxed">
              <p className="font-semibold text-gold mb-1">Scan to Visit</p>
              <p>Sunteck OneWorld</p>
              <p>Official Website</p>
            </div>
          </div>

          {/* Center: RERA + Copyright */}
          <div className="text-center">
            <div className="mb-4">
              <h3 className="font-playfair text-lg font-bold text-white mb-1">
                Sunteck <span className="text-gold">OneWorld</span>
              </h3>
              <p className="text-white/50 text-xs">Naigaon East, Maharashtra</p>
            </div>
            <div className="text-xs text-white/60 leading-relaxed">
              <p className="mb-1">
                <span className="text-gold font-semibold">RERA Registration:</span>
              </p>
              <p className="mb-1">P99000033099 / P99000033157</p>
              <p>
                Details at{" "}
                <a
                  href="https://maharera.mahaonline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  maharera.mahaonline.gov.in
                </a>
              </p>
            </div>
          </div>

          {/* Right: Links */}
          <div className="text-center md:text-right">
            <div className="space-y-2 text-sm text-white/60 mb-4">
              <p>
                <a href="tel:02265911830" className="inline-flex items-center gap-2 hover:text-gold transition-colors justify-center md:justify-end">
                  <FaPhone size={14} className="text-gold" /> 022-65911830
                </a>
              </p>
              <p>
                <a
                  href="https://wa.link/j4b7tq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gold transition-colors justify-center md:justify-end"
                >
                  <FaWhatsapp size={16} className="text-green-500" /> +91 7276622755
                </a>
              </p>
            </div>
            <button
              onClick={onDisclaimer}
              className="text-xs text-gold hover:underline"
            >
              View Disclaimer
            </button>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10 py-4 px-4 text-center">
        <p className="text-xs text-white/40">
          Copyright © Sunteck Realty 2026. All rights reserved. |{" "}
          <button onClick={onDisclaimer} className="text-gold hover:underline text-xs">
            Disclaimer
          </button>
        </p>
      </div>
    </footer>
  );
}
