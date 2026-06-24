"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Send, CheckCircle, AlertCircle, Loader2,
} from "lucide-react";

// Inline brand SVGs — lucide-react dropped brand icons in recent versions
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// ── Social links ──────────────────────────────────────────────────────
const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Ashiii27",
    icon: GitHubIcon,
    handle: "@Ashiii27",
    color: "hover:text-foreground hover:border-foreground/40",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: LinkedInIcon,
    handle: "Ashish Kumar",
    color: "hover:text-blue-400 hover:border-blue-400/40",
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: TwitterIcon,
    handle: "@ashish_sec",
    color: "hover:text-sky-400 hover:border-sky-400/40",
  },
  {
    label: "Email",
    href: "mailto:ashish@example.com",
    icon: Mail,
    handle: "ashish@example.com",
    color: "hover:text-cyber-cyan hover:border-cyber-cyan/40",
  },
];

// ── Info cards ────────────────────────────────────────────────────────
const infoItems = [
  { label: "Based in",      value: "India"                       },
  { label: "Available for", value: "Internships & Freelance"     },
  { label: "Response time", value: "Within 24 hours"             },
  { label: "Open to",       value: "Remote / On-site"            },
];

type FormState = "idle" | "loading" | "success" | "error";

// ── Section ───────────────────────────────────────────────────────────
export default function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fields.name.trim())    e.name    = "Name is required";
    if (!fields.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Invalid email";
    if (!fields.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setFormState("loading");

    // Simulate network request — replace with your real action
    await new Promise((r) => setTimeout(r, 1600));
    setFormState("success");
    setFields({ name: "", email: "", subject: "", message: "" });
  };

  const inputCls = (field: string) =>
    `w-full bg-cyber-surface border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50
     focus:outline-none focus:ring-1 transition-colors duration-200
     ${errors[field]
       ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/30"
       : "border-cyber-border focus:border-cyber-cyan/60 focus:ring-cyber-cyan/20"
     }`;

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,oklch(0.82_0.15_205/0.06),transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="font-terminal text-xs text-cyber-cyan tracking-widest uppercase">
            // contact
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
            Let&apos;s Connect<span className="text-cyber-cyan text-glow-cyan">.</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-md mx-auto">
            Have a project, opportunity, or just want to talk security? My inbox is open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* ── Left panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Availability badge */}
            <div className="cyber-card rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-green" />
                </span>
                <span className="font-terminal text-xs text-cyber-green tracking-widest">AVAILABLE FOR WORK</span>
              </div>
              <div className="space-y-3">
                {infoItems.map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-terminal text-xs">{label}</span>
                    <span className="text-foreground text-xs">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-2.5">
              <p className="font-terminal text-xs text-muted-foreground tracking-widest">FIND ME ON</p>
              {socials.map(({ label, href, icon: Icon, handle, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-cyber-border
                              text-muted-foreground transition-all duration-200 group ${color}`}
                >
                  <Icon className="w-4 h-4 shrink-0 transition-colors duration-200" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium transition-colors duration-200">{label}</p>
                    <p className="font-terminal text-[10px] text-muted-foreground truncate">{handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="cyber-card rounded-xl p-6 lg:p-8">
              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <div className="p-4 rounded-full bg-cyber-green/10 border border-cyber-green/30">
                    <CheckCircle className="w-8 h-8 text-cyber-green" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Message sent!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="font-terminal text-xs text-cyber-cyan hover:underline mt-2"
                  >
                    Send another →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="font-terminal text-xs text-muted-foreground tracking-widest block mb-2">
                        NAME <span className="text-cyber-cyan">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={fields.name}
                        onChange={(e) => setFields({ ...fields, name: e.target.value })}
                        className={inputCls("name")}
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1 mt-1 text-xs text-red-400">
                          <AlertCircle className="w-3 h-3" />{errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-terminal text-xs text-muted-foreground tracking-widest block mb-2">
                        EMAIL <span className="text-cyber-cyan">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={fields.email}
                        onChange={(e) => setFields({ ...fields, email: e.target.value })}
                        className={inputCls("email")}
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1 mt-1 text-xs text-red-400">
                          <AlertCircle className="w-3 h-3" />{errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="font-terminal text-xs text-muted-foreground tracking-widest block mb-2">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      placeholder="Let's collaborate on..."
                      value={fields.subject}
                      onChange={(e) => setFields({ ...fields, subject: e.target.value })}
                      className={inputCls("subject")}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-terminal text-xs text-muted-foreground tracking-widest block mb-2">
                      MESSAGE <span className="text-cyber-cyan">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      value={fields.message}
                      onChange={(e) => setFields({ ...fields, message: e.target.value })}
                      className={`${inputCls("message")} resize-none`}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1 mt-1 text-xs text-red-400">
                        <AlertCircle className="w-3 h-3" />{errors.message}
                      </p>
                    )}
                  </div>

                  {/* Error banner */}
                  {formState === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-400/10 border border-red-400/30 text-red-400 text-xs font-terminal">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Something went wrong. Please try again or email directly.
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                               bg-cyber-cyan/10 border border-cyber-cyan/40 text-cyber-cyan
                               font-terminal text-sm hover:bg-cyber-cyan/20 hover:border-cyber-cyan
                               transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
