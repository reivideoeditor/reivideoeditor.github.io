"use client";

import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

/* -------------------------------
   INNER FORM (hooks are legal)
-------------------------------- */
function ContactForm({ formId }) {
  const [state, handleSubmit] = useForm(formId);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowPopup(true);
    }
  }, [state.succeeded]);

  return (
    <>
      <section className="contact" id="contact">
        <h2 className="section-title">
          Get <span className="red">In Touch</span>
        </h2>

        <div className="contact-container">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" required />
                <ValidationError prefix="Subject" field="subject" errors={state.errors} />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={state.submitting}
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="popup-backdrop" onClick={() => setShowPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>Message Sent 🚀</h3>
            <p>
              Your message has been received.
              <br />
              We’ll reach back to you shortly.
            </p>
            <button className="popup-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* --------------------------------
   WRAPPER (prevents build crash)
--------------------------------- */
export default function ContactSection() {
  const [formId, setFormId] = useState(null);

  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
    if (id) setFormId(id);
  }, []);

  // ⛔ Prevents static export from running useForm
  if (!formId) return null;

  return <ContactForm formId={formId} />;
}
