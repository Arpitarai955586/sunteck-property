"use client";
import { useEffect, useRef, useState } from "react";

export default function ContactSection({ onEnquire }) {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", mobile: "", email: "", consent: true });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile)) e.mobile = "Valid 10-digit mobile required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.consent) e.consent = "Please provide consent";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-4"
      ref={sectionRef}
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #c8902d 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <h2 className="skew-head reveal mb-2">
          <span>Contact Us</span>
        </h2>
        <div className="head-line reveal" style={{ background: "rgba(200,144,45,0.5)" }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact Info */}
          <div className="reveal-left">
            <p className="text-gold text-xs tracking-widest uppercase font-semibold mb-3">
              For Any Query
            </p>
            <h3 className="font-playfair text-3xl font-bold text-white mb-6">
              Get In Touch With Us
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                  📍
                </div>
                <div>
                  <p className="text-gold font-semibold text-sm mb-1">Address</p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Sunteck OneWorld,<br />
                    Tivri, Naigaon East, 401208
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                  📞
                </div>
                <div>
                  <p className="text-gold font-semibold text-sm mb-1">Phone</p>
                  <a href="tel:02265911830" className="text-white/80 hover:text-gold transition-colors text-sm">
                    022-65911830
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                  💬
                </div>
                <div>
                  <p className="text-gold font-semibold text-sm mb-1">WhatsApp</p>
                  <a
                    href="https://wa.link/j4b7tq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-gold transition-colors text-sm"
                  >
                    +91 8451058354
                  </a>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="mt-8 p-5 rounded-2xl border border-gold/20 bg-gold/5">
              <p className="text-white font-semibold text-sm mb-3">
                Ready to book a site visit?
              </p>
              <button onClick={onEnquire} className="btn-gold w-full text-center">
                Schedule a Site Visit
              </button>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal-right">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h4 className="font-playfair text-xl font-bold text-navy mb-2">
                Enquire Now
              </h4>
              <p className="text-gray-500 text-sm mb-6">
                Please enter your details to know more about Sunteck OneWorld&apos;s Latest Offerings.
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h5 className="font-playfair text-xl font-bold text-navy mb-2">
                    Thank You!
                  </h5>
                  <p className="text-gray-500 text-sm">
                    Our team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className={`form-field ${errors.name ? "border-red-400" : ""}`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="text-red-500 text-xs mt-1" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-mobile" className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        id="contact-mobile"
                        type="tel"
                        value={form.mobile}
                        onChange={(e) => handleChange("mobile", e.target.value)}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={`form-field ${errors.mobile ? "border-red-400" : ""}`}
                        aria-invalid={!!errors.mobile}
                        aria-describedby={errors.mobile ? "contact-mobile-error" : undefined}
                      />
                      {errors.mobile && (
                        <p id="contact-mobile-error" className="text-red-500 text-xs mt-1" role="alert">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="your@email.com"
                        className={`form-field ${errors.email ? "border-red-400" : ""}`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="text-red-500 text-xs mt-1" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="flex items-start gap-2">
                      <input
                        id="contact-consent"
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => handleChange("consent", e.target.checked)}
                        className="mt-1 accent-gold w-4 h-4"
                        aria-describedby={errors.consent ? "consent-error" : undefined}
                      />
                      <label htmlFor="contact-consent" className="text-xs text-gray-500 leading-relaxed">
                        I agree to be contacted by the developer via Email, SMS, WhatsApp & Calls regarding this project.
                      </label>
                    </div>
                    {errors.consent && (
                      <p id="consent-error" className="text-red-500 text-xs" role="alert">
                        {errors.consent}
                      </p>
                    )}

                    <button type="submit" className="btn-gold w-full text-center py-3">
                      Submit Enquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
