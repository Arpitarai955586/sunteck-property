"use client";

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
        <span>📞</span>
        CALL NOW
      </a>
      <div className="w-px bg-white/20" />
      <button
        onClick={onEnquire}
        className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-semibold text-sm"
        style={{ background: "var(--gold)" }}
        aria-label="Enquire Now"
      >
        <span>✉️</span>
        ENQUIRE NOW
      </button>
    </div>
  );
}

export function FloatingSideButton({ onBrochure }) {
  return (
    <button
      onClick={onBrochure}
      className="hidden md:flex fixed right-0 top-1/2 z-30 items-center justify-center text-white text-xs font-semibold tracking-wide px-4 py-2 rounded-l-lg shadow-lg"
      style={{
        background: "var(--gold)",
        transform: "translateY(-50%) translateX(calc(100% - 36px)) rotate(90deg)",
        transformOrigin: "left center",
        writingMode: "horizontal-tb",
        width: "160px",
      }}
      aria-label="Download brochure"
    >
      Download Brochure
    </button>
  );
}
