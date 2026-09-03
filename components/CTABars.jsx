"use client";
import { FaPhone, FaEnvelope, FaDownload } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export function MobileStickyBar({ onEnquire }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex"
      style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.2)" }}
    >
      <a
        href="tel:02265911830"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-semibold text-sm"
        style={{ background: "var(--navy)" }}
        aria-label="Call Now"
      >
        <FaPhone size={14} />
        CALL NOW
      </a>
      <div className="w-px bg-white/20" />
      <button
        onClick={onEnquire}
        className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-semibold text-sm"
        style={{ background: "var(--gold)" }}
        aria-label="Enquire Now"
      >
        <FaEnvelope size={14} />
        ENQUIRE NOW
      </button>
    </div>
  );
}

export function BrochureSideButton({ onBrochure }) {
  return (
    <button
      onClick={onBrochure}
      className="fixed right-6 z-50 flex flex-col items-center justify-center rounded-full shadow-2xl transition-transform duration-300 hover:scale-110"
      style={{
        background: "var(--gold)",
        width: "60px",
        height: "60px",
        bottom: "140px",
        boxShadow: "0 4px 20px rgba(184,134,11,0.5)",
      }}
      aria-label="Download brochure"
    >
      <FaDownload size={20} color="white" />
      <span style={{ fontSize: "8px", color: "white", fontWeight: 700, marginTop: "3px", lineHeight: 1, textAlign: "center" }}>
        Brochure
      </span>
    </button>
  );
}

export function FloatingSideButton() {
  const whatsappNumber = "919026784051";
  const whatsappMessage = encodeURIComponent(
    "Hello! I am interested in Sunteck OneWorld. Please share more details."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-2xl transition-transform duration-300 hover:scale-110"
      style={{
        background: "#25D366",
        width: "60px",
        height: "60px",
        boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
      }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} color="white" />
    </a>
  );
}
