"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

// ── Validation helpers ──────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DISPOSABLE_DOMAINS = [
  "mailinator.com",
  "tempmail.com",
  "guerrillamail.com",
  "10minutemail.com",
  "throwaway.email",
  "yopmail.com",
];

function sanitize(str: string) {
  return str.replace(/[<>&"'`]/g, "").trim();
}

function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required.";
  if (!EMAIL_RE.test(trimmed)) return "Enter a valid email address.";
  const domain = trimmed.split("@")[1]?.toLowerCase();
  if (DISPOSABLE_DOMAINS.includes(domain))
    return "Disposable email addresses are not allowed.";
  return null;
}

function validateFields(
  fields: Record<string, string>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!fields.name.trim() || fields.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";
  if (fields.name.trim().length > 80) errors.name = "Name is too long.";
  const emailErr = validateEmail(fields.email);
  if (emailErr) errors.email = emailErr;
  if (!fields.subject.trim() || fields.subject.trim().length < 3)
    errors.subject = "Subject must be at least 3 characters.";
  if (fields.subject.trim().length > 150)
    errors.subject = "Subject is too long.";
  if (!fields.message.trim() || fields.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  if (fields.message.trim().length > 2000)
    errors.message = "Message must be under 2000 characters.";
  return errors;
}
// ───────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitCount, setSubmitCount] = useState(0);
  const [messageLength, setMessageLength] = useState(0);
  const lastSubmitTime = useRef<number>(0);

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const all = {
      name: "",
      email: "",
      subject: "",
      message: "",
      [name]: value,
    };
    const fieldErrors = validateFields(all);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] ?? "" }));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    if (!touched[name]) return;
    const all = {
      name: "",
      email: "",
      subject: "",
      message: "",
      [name]: value,
    };
    const fieldErrors = validateFields(all);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] ?? "" }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    setTouched({ name: true, email: true, subject: true, message: true });
    const fieldErrors = validateFields(raw);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    // Rate limiting: max 3 submissions, min 30s between attempts
    const now = Date.now();
    if (submitCount >= 3) {
      setStatus("ratelimit");
      return;
    }
    if (now - lastSubmitTime.current < 30_000) {
      setStatus("toosoon");
      return;
    }

    setLoading(true);
    setStatus("");
    lastSubmitTime.current = now;
    setSubmitCount((c) => c + 1);

    try {
      const data = new FormData();
      data.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!);
      data.append("name", sanitize(raw.name));
      data.append("email", raw.email.trim());
      data.append("subject", sanitize(raw.subject));
      data.append("message", sanitize(raw.message));

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error("Network error");
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        form.reset();
        setTouched({});
        setErrors({});
        setMessageLength(0);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg bg-(--secondary) border text-sm text-(--foreground) placeholder:text-(--muted-foreground) focus:outline-none transition-colors ${
      touched[field] && errors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-(--border) focus:border-(--primary)"
    }`;

  return (
    <section
      id="contact"
      className="py-24 sm:py-28 relative bg-(--secondary)/30 border-t border-(--border)"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 text-center">
          <SectionHeader
            title="Contact"
            description="Have a role, a project, or a question? Send a message or email me directly."
            align="center"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">Get in touch</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                I&apos;m currently open to internship and full-time roles. If you
                have something that matches my profile, or want to collaborate,
                get in touch.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "sabinpant100@gmail.com",
                  href: "mailto:sabinpant100@gmail.com",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Kathmandu, Nepal",
                  href: "#",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card border border-(--border) hover:border-(--muted-foreground)/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href="https://github.com/SabinPant"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-lg border border-(--border) text-center text-sm text-secondary-foreground hover:bg-background transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/sabinpant"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-lg border border-(--border) text-center text-sm text-secondary-foreground hover:bg-background transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4 bg-card border border-(--border) rounded-xl p-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Name
                  </label>
                  <input
                    name="name"
                    required
                    maxLength={80}
                    placeholder="Your name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={inputClass("name")}
                  />
                  {touched.name && errors.name && (
                    <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    placeholder="sabin@example.com"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={inputClass("email")}
                  />
                  {touched.email && errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Subject
                </label>
                <input
                  name="subject"
                  required
                  maxLength={150}
                  placeholder="Project inquiry / Job opportunity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={inputClass("subject")}
                />
                {touched.subject && errors.subject && (
                  <p className="text-xs text-red-400 mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs text-muted-foreground">
                    Message
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {messageLength}/2000
                  </span>
                </div>
                <textarea
                  name="message"
                  required
                  rows={5}
                  maxLength={2000}
                  placeholder="Tell me about your project or opportunity..."
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setMessageLength(e.target.value.length);
                  }}
                  className={`${inputClass("message")} resize-none`}
                />
                {touched.message && errors.message && (
                  <p className="text-xs text-red-400 mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-primary text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="text-center text-sm text-green-400">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}
              {status === "ratelimit" && (
                <p className="text-center text-sm text-yellow-400">
                  Too many submissions. Please email me directly.
                </p>
              )}
              {status === "toosoon" && (
                <p className="text-center text-sm text-yellow-400">
                  Please wait a moment before sending again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
