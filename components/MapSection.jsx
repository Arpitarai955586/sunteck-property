"use client";

export default function MapSection() {
  return (
    <section id="map" aria-label="Project location on Google Maps">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.082311394045!2d72.8663164!3d19.365588300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7af251f902f65%3A0xd17c28996052665a!2sSunteck%20One%20World%2C%20Naigaon!5e0!3m2!1sen!2sin!4v1758892063435!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Sunteck OneWorld location on Google Maps"
      />
    </section>
  );
}
