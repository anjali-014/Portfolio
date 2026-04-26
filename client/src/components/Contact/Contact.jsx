import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { personal, social } from "../../utils/data";
import "./Contact.css";

const initialForm = { name: "", email: "", subject: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";

  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(form.email))
    errors.email = "Enter a valid email";

  if (!form.subject.trim()) errors.subject = "Subject is required";

  if (!form.message.trim()) errors.message = "Message is required";
  else if (form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters";

  return errors;
}

export default function Contact() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMsg, setServerMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setServerMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setServerMsg(data.message || "Message sent successfully!");
        setForm(initialForm);
      } else {
        setStatus("error");

        if (data.errors) {
          const mapped = {};
          data.errors.forEach(({ field, message }) => {
            mapped[field] = message;
          });
          setErrors(mapped);
        }

        setServerMsg(data.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setServerMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container" ref={ref}>
        
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let’s Work Together</h2>
          <p className="section-subtitle">
            Have a project or question? Feel free to reach out.
          </p>
        </div>

        <div className="contact__grid">

          {/* Info */}
          <div className={`contact__info fade-up ${visible ? "visible" : ""} delay-1`}>
            <div className="contact__info-block">
              <h4>Email</h4>
              <a href={`mailto:${personal.email}`}>{personal.email}</a>
            </div>

            <div className="contact__info-block">
              <h4>Location</h4>
              <p>{personal.location}</p>
            </div>

            <div className="contact__social-links">
              {social.map(({ label, url }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer">
                  {label} →
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className={`fade-up ${visible ? "visible" : ""} delay-2`}>
            
            {status === "success" ? (
              <div className="contact__success">
                <CheckCircle size={40} />
                <h3>Message sent!</h3>
                <p>{serverMsg}</p>
                <button className="btn btn-outline" onClick={() => setStatus("idle")}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                
                <div className="form__row">
                  <Field name="name" label="Name" value={form.name} onChange={handleChange} error={errors.name} />
                  <Field name="email" label="Email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
                </div>

                <Field name="subject" label="Subject" value={form.subject} onChange={handleChange} error={errors.subject} />

                <Field name="message" label="Message" type="textarea" value={form.message} onChange={handleChange} error={errors.message} rows={5} />

                {status === "error" && serverMsg && (
                  <div className="form__error-banner">
                    <AlertCircle size={15} />
                    {serverMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "loading"}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader size={16} className="spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Send Message
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", value, onChange, error, rows }) {
  return (
    <div className="form__field">
      <label htmlFor={name}>{label}</label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`form__input ${error ? "form__input--error" : ""}`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`form__input ${error ? "form__input--error" : ""}`}
        />
      )}

      {error && <p className="form__field-error">{error}</p>}
    </div>
  );
}