"use client";
import { useEffect, useRef, useState } from "react";
import { HiX as CloseIcon } from "react-icons/hi";
import { FaCheckCircle, FaEnvelope, FaWhatsapp, FaExclamationTriangle } from "react-icons/fa";

function LeadForm({ onClose, source }) {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", consent: true });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile)) e.mobile = "Valid 10-digit mobile required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.consent) e.consent = "Please provide consent";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setApiError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, mobile: form.mobile, email: form.email, source }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(onClose, 3500);
      } else {
        setApiError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <FaCheckCircle className="text-gold text-5xl mx-auto mb-3" />
        <h5 className="font-playfair text-xl font-bold text-navy mb-2">Thank You, {form.name}!</h5>
        <p className="text-gray-500 text-sm mb-2">Our team will contact you shortly.</p>
        <div className="flex flex-col items-center gap-1 text-xs text-gray-400">
          <p className="flex items-center gap-1.5"><FaEnvelope className="text-gold" /> Notification sent to team</p>
          <p className="flex items-center gap-1.5"><FaWhatsapp className="text-green-500" /> WhatsApp alert delivered</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <div>
          <label htmlFor={`modal-name-${source}`} className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            id={`modal-name-${source}`}
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter your full name"
            className={`form-field ${errors.name ? "border-red-400" : ""}`}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor={`modal-mobile-${source}`} className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number *
          </label>
          <input
            id={`modal-mobile-${source}`}
            type="tel"
            value={form.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            placeholder="10-digit mobile number"
            maxLength={10}
            className={`form-field ${errors.mobile ? "border-red-400" : ""}`}
            aria-invalid={!!errors.mobile}
          />
          {errors.mobile && <p className="text-red-500 text-xs mt-1" role="alert">{errors.mobile}</p>}
        </div>

        <div>
          <label htmlFor={`modal-email-${source}`} className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            id={`modal-email-${source}`}
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="your@email.com"
            className={`form-field ${errors.email ? "border-red-400" : ""}`}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
        </div>

        <div className="flex items-start gap-2">
          <input
            id={`modal-consent-${source}`}
            type="checkbox"
            checked={form.consent}
            onChange={(e) => handleChange("consent", e.target.checked)}
            className="mt-1 w-4 h-4 accent-gold"
          />
          <label htmlFor={`modal-consent-${source}`} className="text-xs text-gray-500 leading-relaxed">
            I agree to be contacted by the developer via Email, SMS, WhatsApp &amp; Calls.
          </label>
        </div>
        {errors.consent && <p className="text-red-500 text-xs" role="alert">{errors.consent}</p>}

        {apiError && (
          <p className="text-red-500 text-xs text-center py-2 bg-red-50 rounded-lg flex items-center justify-center gap-1.5" role="alert">
            <FaExclamationTriangle /> {apiError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full py-3 text-center disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : "Submit"}
        </button>
      </div>
    </form>
  );
}

function Modal({ open, onClose, title, children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose?.(); };
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={(e) => { if (e.target === overlayRef.current) onClose?.(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modal-box">
        <div className="modal-header">
          <h3 className="font-playfair text-white font-bold text-lg">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-white/70 hover:text-white transition-colors ml-4 p-1"
          >
            <CloseIcon size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function EnquireModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Enquire Now">
      <p className="text-gray-500 text-sm mb-5">
        Please enter your details to know more about Sunteck OneWorld&apos;s Latest Offerings.
      </p>
      <LeadForm onClose={onClose} source="enquire" />
    </Modal>
  );
}

export function PriceModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Get Carpet Area & Price Details">
      <p className="text-gray-500 text-sm mb-5">
        Please enter your details to know more about Sunteck OneWorld&apos;s Latest Offerings.
      </p>
      <LeadForm onClose={onClose} source="price" />
    </Modal>
  );
}

export function FloorModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Floor Plan Details">
      <p className="text-gray-500 text-sm mb-5">
        Please enter your details to know more about Sunteck OneWorld Floor Plan.
      </p>
      <LeadForm onClose={onClose} source="floor" />
    </Modal>
  );
}

export function BrochureModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Download Brochure">
      <p className="text-gray-500 text-sm mb-5">
        Please enter your details to download the Sunteck OneWorld Brochure.
      </p>
      <LeadForm onClose={onClose} source="brochure" />
    </Modal>
  );
}

export function DisclaimerModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Disclaimer">
      <div className="text-sm text-gray-600 leading-relaxed max-h-64 overflow-y-auto pr-2">
        <p>
          The project namely &ldquo;Sunteck ONEWorld&rdquo; (&ldquo;Project&rdquo;) is being developed by Sunteck Realty Limited (&ldquo;Promoter&rdquo;). The pictures, images, visuals, furniture, fixtures, specifications, and other details herein are the Promoter&apos;s conceptualized representation of proposed development of the Project and for reference purposes only. The layout plan, location of amenities, designs, elevation, and dimensions depicted herein are as per current sanctioned plans and approvals and are subject to further modification/change/revision/alteration in terms of various approvals, orders, directions, and/or regulations of the concerned/relevant authorities. The common areas, specifications, amenities, and facilities will be as set out in the agreement for sale as uploaded on the MahaRERA website. This electronic/printed material does not constitute an offer and/or contract of any nature whatsoever between the Promoter and the recipient. *Terms &amp; Conditions Apply.
        </p>
      </div>
      <button onClick={onClose} className="btn-gold mt-5 px-8 py-2 text-sm">
        OK
      </button>
    </Modal>
  );
}

export function LightboxModal({ open, onClose, src, alt }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose?.(); };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open || !src) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      style={{ animation: "fadeIn 0.2s ease" }}
    >
      <button
        className="absolute top-4 right-4 text-white hover:text-gold transition-colors z-10 p-2"
        onClick={onClose}
        aria-label="Close image viewer"
      >
        <CloseIcon size={32} />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || "Gallery image"}
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.3s ease" }}
      />
      {alt && (
        <p className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-sm">{alt}</p>
      )}
    </div>
  );
}
