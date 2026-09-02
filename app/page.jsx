"use client";
import { useState } from "react";

import PageLoader from "@/components/PageLoader";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ProjectHighlights from "@/components/ProjectHighlights";
import Configuration from "@/components/Configuration";
import FloorPlans from "@/components/FloorPlans";
import Amenities from "@/components/Amenities";
import LocationAdvantage from "@/components/LocationAdvantage";
import Gallery from "@/components/Gallery";
import AboutSunteck from "@/components/AboutSunteck";
import MapSection from "@/components/MapSection";
import ContactSection from "@/components/ContactSection";
import Footer, { DisclaimerStrip } from "@/components/Footer";
import { MobileStickyBar, FloatingSideButton } from "@/components/CTABars";
import {
  EnquireModal,
  PriceModal,
  FloorModal,
  BrochureModal,
  DisclaimerModal,
  LightboxModal,
} from "@/components/Modals";

export default function Home() {
  // Modal state
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [floorOpen, setFloorOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });

  const openLightbox = (src, alt) => setLightbox({ open: true, src, alt: alt || "" });
  const closeLightbox = () => setLightbox((l) => ({ ...l, open: false }));

  return (
    <>
      <PageLoader />

      {/* Modals */}
      <EnquireModal open={enquireOpen} onClose={() => setEnquireOpen(false)} />
      <PriceModal open={priceOpen} onClose={() => setPriceOpen(false)} />
      <FloorModal open={floorOpen} onClose={() => setFloorOpen(false)} />
      <BrochureModal open={brochureOpen} onClose={() => setBrochureOpen(false)} />
      <DisclaimerModal open={disclaimerOpen} onClose={() => setDisclaimerOpen(false)} />
      <LightboxModal
        open={lightbox.open}
        onClose={closeLightbox}
        src={lightbox.src}
        alt={lightbox.alt}
      />

      {/* Navbar */}
      <Navbar onEnquire={() => setEnquireOpen(true)} />

      {/* Main Content */}
      <main className="pb-16 md:pb-0">
        {/* Scroll anchor for Home nav link */}
        <div id="home" style={{ position: "absolute", top: 0 }} aria-hidden="true" />

        {/* Hero */}
        <HeroSlider onEnquire={() => setEnquireOpen(true)} />


        {/* Project Highlights */}
        <ProjectHighlights />

        {/* Configuration */}
        <Configuration onPriceClick={() => setPriceOpen(true)} />

        {/* Floor Plans */}
        <FloorPlans onFloorClick={() => setFloorOpen(true)} />

        {/* Amenities */}
        <Amenities />

        {/* Location Advantage */}
        <LocationAdvantage onLightbox={openLightbox} />

        {/* Gallery */}
        <Gallery onLightbox={openLightbox} />

        {/* About / Why Invest */}
        <AboutSunteck />

        {/* Google Map */}
        <MapSection />

        {/* Contact */}
        <ContactSection onEnquire={() => setEnquireOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onDisclaimer={() => setDisclaimerOpen(true)} />
      {/* <DisclaimerStrip /> */}

      {/* Floating CTAs */}
      <MobileStickyBar onEnquire={() => setEnquireOpen(true)} />
      <FloatingSideButton onBrochure={() => setBrochureOpen(true)} />
    </>
  );
}
