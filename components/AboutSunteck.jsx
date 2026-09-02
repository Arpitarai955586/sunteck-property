"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { brandPortfolio } from "@/lib/data";
import { FaBuilding, FaCity, FaChartLine, FaKey } from "react-icons/fa";

export default function AboutSunteck() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom").forEach((el, i) => {
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
    <section id="about" className="section-base bg-white" ref={sectionRef}>
      {/* Why Invest sub-section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <h2 className="skew-head reveal">
          <span>Why Invest in Sunteck OneWorld</span>
        </h2>
        <div className="head-line reveal" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 reveal">
          {[
            { icon: <FaBuilding className="text-gold text-3xl" />, label: "50+ Million Sq. Ft.", sub: "Portfolio" },
            { icon: <FaCity className="text-gold text-3xl" />, label: "30+ Developments", sub: "Landmark Projects" },
            { icon: <FaChartLine className="text-gold text-3xl" />, label: "NSE & BSE Listed", sub: "Trusted Developer" },
            { icon: <FaKey className="text-gold text-3xl" />, label: "3400+ Homes", sub: "Successfully Delivered" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-gray-100 hover:border-gold/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 reveal-zoom"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {stat.icon}
              <p className="font-playfair font-bold text-navy text-lg text-center leading-tight">
                {stat.label}
              </p>
              <p className="text-gray-500 text-xs text-center">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Sunteck Realty */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="skew-head reveal">
          <span>About Sunteck Realty</span>
        </h2>
        <div className="head-line reveal" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Unique Image */}
          <div className="reveal-left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square">
              <Image
                src="/images/elevation2.jpg"
                alt="Sunteck Realty Portfolio"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="reveal-right">
            <div className="mb-6">
              <h3 className="font-playfair text-3xl font-bold text-navy mb-1">
                Sunteck <span className="text-gold">Realty</span>
              </h3>
              <div className="w-12 h-1 bg-gold rounded" />
            </div>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed mb-6">
              <p>
                Sunteck Realty Limited (SRL) is one of India&apos;s most trusted luxury real estate developers, consistently redefining what premium living means.
              </p>
              <p>
                Listed among India&apos;s top real estate companies on the NSE and BSE, Sunteck is backed by a near debt-free balance sheet, strong cash flows, and an unwavering commitment to long-term value creation.
              </p>
              <p>
                With a portfolio of over 50+ million sq. ft. across 30+ landmark developments, Sunteck has shaped some of Mumbai and the MMR&apos;s most sought-after destinations.
              </p>
            </div>

            {/* Brand Portfolio */}
            <h4 className="font-semibold text-navy text-sm mb-3 tracking-wide uppercase">
              Brand Architecture
            </h4>
            <div className="space-y-2">
              {brandPortfolio.map((brand, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 reveal"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="w-2 h-2 rounded-full bg-gold shrink-0" />
                  <p className="text-sm text-dark">
                    <strong className="text-navy">{brand.name}</strong>
                    {" — "}
                    <span className="text-gray-500">{brand.tagline}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
