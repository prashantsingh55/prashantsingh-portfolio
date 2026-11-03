"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import {
  attachFormValidationHandlers,
  syncAriaInvalid,
} from "@/lib/userInvalidFallback";
import { validateNewsletterPayload } from "@/lib/validation";

export default function Newsletter() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    return attachFormValidationHandlers(formRef.current);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem(
      "email"
    ) as HTMLInputElement | null;

    const clientValidation = validateNewsletterPayload({ email });
    if (!form.checkValidity() || !clientValidation.valid) {
      if (input) {
        syncAriaInvalid(input);
        input.classList.add("user-invalid-fallback");
        input.focus();
      }
      setStatus("error");
      setFeedback(
        clientValidation.error || "Please enter a valid email address."
      );
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setFeedback(data.message || "Please enter a valid email address.");
        return;
      }

      setStatus("success");
      setFeedback(
        data.message || "Subscribed successfully! Thank you for joining."
      );
      setEmail("");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("Unable to subscribe right now. Please try again.");
    }
  };

  return (
    <section className="py-12 md:py-16 border-b border-zinc-200/80 dark:border-white/[0.08]">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          suppressHydrationWarning
          className="rounded-xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0E1012] p-6 sm:p-10 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2.5">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-[#8A8F98]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>ENGINEERING DISPATCH // CHANGELOG &amp; RELEASES</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#090A0B] dark:text-[#F7F8F8]">
                Subscribe to Engineering Notes &amp; Architecture Updates
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#8A8F98] max-w-xl leading-relaxed">
                Low-frequency dispatches covering Next.js systems architecture,
                Sharp SIMD image pipelines, Flutter AR sensor fusion, and
                Solidity smart contract experiments. Zero noise.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-2"
              >
                <label
                  htmlFor="newsletter-email"
                  className="block font-mono text-xs font-medium text-[#090A0B] dark:text-[#F7F8F8]"
                >
                  Email Address
                </label>
                {/* MANDATORY (validate-input-after-interaction): Place format hints above the input so autocomplete popovers don't cover them */}
                <span
                  id="newsletter-email-hint"
                  className="block font-mono text-[11px] text-zinc-500 dark:text-[#8A8F98]"
                >
                  Format: you@example.com
                </span>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="flex-1">
                    <input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      aria-describedby="newsletter-email-hint"
                      aria-errormessage="newsletter-email-error"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      required
                      className="w-full rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-zinc-50 dark:bg-[#141517] px-3.5 py-2.5 text-sm text-[#090A0B] dark:text-[#F7F8F8] placeholder:text-zinc-400 dark:placeholder:text-[#555962] focus:border-zinc-400 dark:focus:border-white/30 focus:outline-none"
                    />
                    <div
                      id="newsletter-email-error"
                      className="error-msg items-center gap-1.5 mt-1.5 text-xs text-rose-600 dark:text-rose-400"
                    >
                      <span aria-hidden="true">❌</span>
                      <span>Please enter a valid email address.</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="tactile-control inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#090A0B] dark:bg-[#F7F8F8] disabled:opacity-60 px-5 py-2.5 text-xs sm:text-sm font-medium text-white dark:text-[#08090A] shrink-0"
                  >
                    <span>
                      {status === "submitting" ? "Subscribing..." : "Subscribe"}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>

              {status === "success" && (
                <p
                  role="status"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{feedback}</span>
                </p>
              )}
              {status === "error" && (
                <p
                  role="alert"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{feedback}</span>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
