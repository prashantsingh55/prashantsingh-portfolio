"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { PROFILE } from "@/contents/profile";
import {
  attachFormValidationHandlers,
  syncAriaInvalid,
} from "@/lib/userInvalidFallback";
import { validateContactPayload } from "@/lib/validation";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const cleanupValidation = attachFormValidationHandlers(formRef.current);
    return () => {
      cleanupValidation();
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async (value: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(value);
      }
      setCopiedEmail(value);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedEmail(null);
        copyTimerRef.current = null;
      }, 2000);
    } catch {
      setCopiedEmail(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // MANDATORY (validate-input-after-interaction):
    // Sync aria-invalid on all form controls and focus the first invalid field if validation fails.
    const clientValidation = validateContactPayload(formData);
    if (!form.checkValidity() || !clientValidation.valid) {
      const controls = Array.from(form.elements);
      let firstInvalidFocused = false;
      for (const control of controls) {
        syncAriaInvalid(control);
        if (
          !firstInvalidFocused &&
          "checkValidity" in control &&
          typeof (control as HTMLInputElement).checkValidity === "function" &&
          !(control as HTMLInputElement).checkValidity()
        ) {
          control.classList.add("user-invalid-fallback");
          if (control instanceof HTMLElement) {
            control.focus();
          }
          firstInvalidFocused = true;
        }
      }
      setStatus("error");
      setFeedbackMessage(
        clientValidation.error ||
          "Please check the highlighted fields and try again."
      );
      if (clientValidation.fieldErrors) {
        setFieldErrors(clientValidation.fieldErrors);
      }
      return;
    }

    setStatus("loading");
    setFeedbackMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setFeedbackMessage(
          data.message || "Please check the highlighted fields and try again."
        );
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        return;
      }

      setStatus("success");
      setFeedbackMessage(
        "Message sent successfully! Prashant will get back to you shortly."
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
      form.reset();
    } catch {
      setStatus("error");
      setFeedbackMessage(
        "Failed to send message. Please try again or email directly."
      );
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Coordinates Ledger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            suppressHydrationWarning
            className="lg:col-span-5 space-y-6"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-[#8A8F98]">
                <span className="text-[#090A0B] dark:text-[#F7F8F8] font-semibold">
                  05 / DIRECT TRANSMISSION
                </span>
                <span>—</span>
                <span>COLLABORATE &amp; CONSULT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-[#090A0B] dark:text-[#F7F8F8]">
                Initiate a Technical or Product Conversation
              </h2>
              <p className="text-sm text-zinc-600 dark:text-[#8A8F98] leading-relaxed">
                Available for full-stack Next.js platforms, IT business
                analysis, product engineering leadership, Flutter AR apps, and
                Web3 builds.
              </p>
            </div>

            {/* Clean Architectural Coordinate Rows */}
            <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0A142F] divide-y divide-[#E8DEC8] dark:divide-[#1E325C]/60 shadow-sm">
              <div className="p-4 space-y-2">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#1E3A8A] dark:text-[#9FB3D9]">
                  01 / ELECTRONIC MAIL (CLICK TO COPY)
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="font-mono text-xs font-semibold text-[#0A1226] dark:text-[#FAF6EE] hover:text-red-600 dark:hover:text-red-400 hover:underline truncate"
                    >
                      {PROFILE.email}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(PROFILE.email)}
                      className="tactile-control inline-flex items-center gap-1 rounded border border-[#E8DEC8] dark:border-[#1E325C] bg-[#F2ECE1] dark:bg-[#12234D] px-2 py-0.5 font-mono text-[10px] text-[#0A1226] dark:text-[#FAF6EE]"
                    >
                      {copiedEmail === PROFILE.email ? (
                        <>
                          <Check className="h-3 w-3 text-red-500" />
                          <span className="text-red-600 dark:text-red-400 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={`mailto:${PROFILE.secondaryEmail}`}
                      className="font-mono text-xs text-zinc-600 dark:text-[#9FB3D9] hover:text-red-600 dark:hover:text-red-400 hover:underline truncate"
                    >
                      {PROFILE.secondaryEmail}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(PROFILE.secondaryEmail)}
                      className="tactile-control inline-flex items-center gap-1 rounded border border-[#E8DEC8] dark:border-[#1E325C] bg-[#F2ECE1] dark:bg-[#12234D] px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:text-[#9FB3D9]"
                    >
                      {copiedEmail === PROFILE.secondaryEmail ? (
                        <>
                          <Check className="h-3 w-3 text-red-500" />
                          <span className="text-red-600 dark:text-red-400 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#1E3A8A] dark:text-[#9FB3D9]">
                    02 / VOICE &amp; WHATSAPP
                  </div>
                  <a
                    href={`tel:${PROFILE.phoneRaw}`}
                    className="font-mono text-xs font-semibold text-[#0A1226] dark:text-[#FAF6EE] hover:text-red-600 dark:hover:text-red-400 hover:underline mt-1 block"
                  >
                    {PROFILE.phone}
                  </a>
                </div>
                <a
                  href={PROFILE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tactile-control inline-flex items-center gap-1 rounded border border-[#E8DEC8] dark:border-[#1E325C] bg-[#F2ECE1] dark:bg-[#12234D] px-2.5 py-1 font-mono text-[10px] text-[#0A1226] dark:text-[#FAF6EE] hover:border-red-400"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>

              <div className="p-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#1E3A8A] dark:text-[#9FB3D9]">
                  03 / BASE COORDINATES
                </div>
                <div className="font-mono text-xs text-[#0A1226] dark:text-[#FAF6EE] mt-1">
                  {PROFILE.location} ({PROFILE.timezone})
                </div>
              </div>
            </div>

            {/* Verified Networks */}
            <div className="flex flex-wrap gap-2">
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-control inline-flex items-center gap-1.5 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-white dark:bg-[#0A142F] px-3 py-2 font-mono text-xs text-[#0A1226] dark:text-[#FAF6EE] hover:border-red-400"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3 w-3 opacity-50" />
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-control inline-flex items-center gap-1.5 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-white dark:bg-[#0A142F] px-3 py-2 font-mono text-xs text-[#0A1226] dark:text-[#FAF6EE] hover:border-red-400"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3 w-3 opacity-50" />
              </a>
              <a
                href={PROFILE.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-control inline-flex items-center gap-1.5 rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-white dark:bg-[#0A142F] px-3 py-2 font-mono text-xs text-[#0A1226] dark:text-[#FAF6EE] hover:border-red-400"
              >
                <FaXTwitter className="h-3.5 w-3.5" />
                <span>@singhprashant57</span>
                <ArrowUpRight className="h-3 w-3 opacity-50" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            suppressHydrationWarning
            className="lg:col-span-7"
          >
            <div className="rounded-xl border border-[#E8DEC8] dark:border-[#1E325C] bg-[#FAF7F2] dark:bg-[#0A142F] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E8DEC8] dark:border-[#1E325C]/60 pb-4 mb-6">
                <h3 className="text-base font-semibold text-[#0A1226] dark:text-[#FAF6EE]">
                  Direct Message Dispatch
                </h3>
                <span className="font-mono text-[10px] text-zinc-400 dark:text-[#5B73A8]">
                  POST /api/contact
                </span>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-mono text-xs font-medium text-[#0A1226] dark:text-[#FAF6EE] mb-1"
                    >
                      Your Name *
                    </label>
                    {/* MANDATORY (validate-input-after-interaction): Place format hints above the input so autocomplete popovers don't cover them */}
                    <span
                      id="name-hint"
                      className="block font-mono text-[11px] text-zinc-500 dark:text-[#9FB3D9] mb-1.5"
                    >
                      2–100 characters
                    </span>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      autoComplete="name"
                      aria-describedby="name-hint"
                      aria-errormessage="name-error"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Aarav Sharma"
                      className={`w-full rounded-lg border ${
                        fieldErrors.name
                          ? "border-red-500"
                          : "border-[#E8DEC8] dark:border-[#1E325C]"
                      } bg-white dark:bg-[#070D1E] px-3.5 py-2.5 text-sm text-[#0A1226] dark:text-[#FAF6EE] placeholder:text-zinc-400 dark:placeholder:text-[#9FB3D9]/60 focus:border-red-500 focus:outline-none`}
                    />
                    <div
                      id="name-error"
                      className="error-msg items-center gap-1.5 mt-1.5 text-xs text-rose-600 dark:text-rose-400"
                    >
                      <span aria-hidden="true">❌</span>
                      <span>
                        {fieldErrors.name ||
                          "Please enter your name (at least 2 characters)."}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs font-medium text-[#0A1226] dark:text-[#FAF6EE] mb-1"
                    >
                      Email Address *
                    </label>
                    {/* MANDATORY (validate-input-after-interaction): Place format hints above the input so autocomplete popovers don't cover them */}
                    <span
                      id="email-hint"
                      className="block font-mono text-[11px] text-zinc-500 dark:text-[#9FB3D9] mb-1.5"
                    >
                      Format: you@example.com
                    </span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      aria-describedby="email-hint"
                      aria-errormessage="email-error"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={`w-full rounded-lg border ${
                        fieldErrors.email
                          ? "border-red-500"
                          : "border-[#E8DEC8] dark:border-[#1E325C]"
                      } bg-white dark:bg-[#070D1E] px-3.5 py-2.5 text-sm text-[#0A1226] dark:text-[#FAF6EE] placeholder:text-zinc-400 dark:placeholder:text-[#9FB3D9]/60 focus:border-red-500 focus:outline-none`}
                    />
                    <div
                      id="email-error"
                      className="error-msg items-center gap-1.5 mt-1.5 text-xs text-rose-600 dark:text-rose-400"
                    >
                      <span aria-hidden="true">❌</span>
                      <span>
                        {fieldErrors.email ||
                          "Please enter a valid email address."}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-mono text-xs font-medium text-[#0A1226] dark:text-[#FAF6EE] mb-1.5"
                  >
                    Subject / Scope
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    maxLength={150}
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Meta/Google Ads Consulting / Full-Stack Next.js / Technical SEO"
                    className="w-full rounded-lg border border-[#E8DEC8] dark:border-[#1E325C] bg-white dark:bg-[#070D1E] px-3.5 py-2.5 text-sm text-[#0A1226] dark:text-[#FAF6EE] placeholder:text-zinc-400 dark:placeholder:text-[#9FB3D9]/60 focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs font-medium text-[#0A1226] dark:text-[#FAF6EE] mb-1"
                  >
                    Message *
                  </label>
                  <span
                    id="message-hint"
                    className="block font-mono text-[11px] text-zinc-500 dark:text-[#9FB3D9] mb-1.5"
                  >
                    At least 10 characters describing your project or inquiry
                  </span>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    minLength={10}
                    maxLength={3000}
                    aria-describedby="message-hint"
                    aria-errormessage="message-error"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your system requirements, ad budget, growth objectives, or timeline..."
                    className={`w-full rounded-lg border ${
                      fieldErrors.message
                        ? "border-red-500"
                        : "border-[#E8DEC8] dark:border-[#1E325C]"
                    } bg-white dark:bg-[#070D1E] px-3.5 py-2.5 text-sm text-[#0A1226] dark:text-[#FAF6EE] placeholder:text-zinc-400 dark:placeholder:text-[#9FB3D9]/60 focus:border-red-500 focus:outline-none`}
                  />
                  <div
                    id="message-error"
                    className="error-msg items-center gap-1.5 mt-1.5 text-xs text-rose-600 dark:text-rose-400"
                  >
                    <span aria-hidden="true">❌</span>
                    <span>
                      {fieldErrors.message ||
                        "Message must be at least 10 characters."}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="tactile-control w-full inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-60 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>
                    {status === "loading"
                      ? "Transmitting Message..."
                      : "Send Message"}
                  </span>
                </button>

                {status === "success" && (
                  <div
                    role="status"
                    className="flex items-center gap-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3.5 text-xs font-medium text-emerald-700 dark:text-emerald-300"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {status === "error" && (
                  <div
                    role="alert"
                    className="flex items-center gap-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 p-3.5 text-xs font-medium text-rose-700 dark:text-rose-300"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
