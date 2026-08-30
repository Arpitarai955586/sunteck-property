"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { galleryInterior, galleryElevation, galleryVideos } from "@/lib/data";

const TABS = ["Interior", "Elevation", "Videos"];

export default function Gallery({ onLightbox }) {
  const [activeTab, setActiveTab] = useState(0);
  const [elevCurrent, setElevCurrent] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-zoom").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const elevNext = () => setElevCurrent((c) => (c + 1) % galleryElevation.length);
  const elevPrev = () => setElevCurrent((c) => (c - 1 + galleryElevation.length) % galleryElevation.length);

  return (
    <section id="gallery" className="section-base bg-white" ref={sectionRef}>
      <h2 className="skew-head reveal">
        <span>Gallery</span>
      </h2>
      <div className="head-line reveal" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8 reveal overflow-x-auto">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              id={`gallery-tab-${i}`}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls={`gallery-panel-${i}`}
              onClick={() => setActiveTab(i)}
              className={`gallery-tab whitespace-nowrap ${activeTab === i ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        {/* Interior */}
        <div
          id="gallery-panel-0"
          role="tabpanel"
          aria-labelledby="gallery-tab-0"
          hidden={activeTab !== 0}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryInterior.map((img, i) => (
              <div
                key={img.id}
                className="gallery-card reveal-zoom"
                style={{ transitionDelay: `${i * 100}ms` }}
                onClick={() => onLightbox?.(img.src, img.alt)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onLightbox?.(img.src, img.alt)}
                aria-label={`View ${img.alt} in full screen`}
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-107"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-navy/0 hover:bg-navy/30 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 hover:opacity-100 text-white text-4xl transition-opacity">
                      🔍
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-light-bg">
                  <p className="text-xs text-gray-500 tracking-wide">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elevation */}
        <div
          id="gallery-panel-1"
          role="tabpanel"
          aria-labelledby="gallery-tab-1"
          hidden={activeTab !== 1}
        >
          <div className="relative overflow-hidden rounded-2xl reveal-zoom">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${elevCurrent * 100}%)` }}
            >
              {galleryElevation.map((img) => (
                <div
                  key={img.id}
                  className="min-w-full cursor-zoom-in"
                  onClick={() => onLightbox?.(img.src, img.alt)}
                >
                  <div className="relative w-full h-80 md:h-[480px]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={elevPrev}
              aria-label="Previous elevation"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 hover:bg-gold text-white text-xl flex items-center justify-center backdrop-blur-sm transition-all"
            >
              ‹
            </button>
            <button
              onClick={elevNext}
              aria-label="Next elevation"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 hover:bg-gold text-white text-xl flex items-center justify-center backdrop-blur-sm transition-all"
            >
              ›
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryElevation.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setElevCurrent(i)}
                  aria-label={`Elevation ${i + 1}`}
                  className={`transition-all rounded-full ${
                    i === elevCurrent ? "w-6 h-2 bg-gold" : "w-2 h-2 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Videos */}
        <div
          id="gallery-panel-2"
          role="tabpanel"
          aria-labelledby="gallery-tab-2"
          hidden={activeTab !== 2}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal">
            {galleryVideos.map((video) => (
              <div key={video.id} className="rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="320"
                  src={video.src}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="block"
                />
                <div className="p-3 bg-navy">
                  <p className="text-white/80 text-xs">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
