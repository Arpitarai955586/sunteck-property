"use client";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center flex-col gap-4"
      style={{
        background: "var(--navy)",
        animation: visible ? "none" : "fadeOut 0.5s ease forwards",
      }}
      aria-label="Loading"
      role="status"
    >
      <div className="animate-bounce-logo">
        <div className="text-center">
          <span className="font-playfair text-4xl font-bold text-white tracking-wide">
            Sunteck
          </span>
          <br />
          <span className="font-playfair text-2xl font-semibold text-gold tracking-widest uppercase">
            OneWorld
          </span>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gold"
            style={{
              animation: `bounceLogo 0.9s ${i * 0.2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
