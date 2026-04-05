"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function EarlyAccessForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Capture the form element before any await — React nullifies
    // e.currentTarget after the handler returns.
    const form = e.currentTarget;
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      role: formData.get("role") as string,
      fleetSize: formData.get("fleet-size") as string,
      evShare: formData.get("ev-share") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data.detail
          ? `${data.error}: ${data.detail}`
          : data.error || "Something went wrong";
        throw new Error(msg);
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="p-12 text-center">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-accent/10 border border-accent/30 mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-3xl text-navy mb-3">Request received.</h3>
        <p className="text-slate-600 max-w-md mx-auto">
          Thanks for your interest in FleetCharge HQ. We&apos;ll respond within
          one business day.
        </p>
      </div>
    );
  }

  const disabled = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
          >
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={disabled}
            className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors disabled:opacity-50"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
          >
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={disabled}
            className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors disabled:opacity-50"
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="company"
            className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
          >
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            disabled={disabled}
            className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors disabled:opacity-50"
            placeholder="Acme Fleet Services"
          />
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            disabled={disabled}
            className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors bg-white disabled:opacity-50"
            defaultValue=""
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="fleet-controller">Fleet Controller</option>
            <option value="vp-finance">VP Finance / CFO</option>
            <option value="fleet-director">Fleet Director / Manager</option>
            <option value="accounting">Accounting / Finance Team</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="fleet-size"
            className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
          >
            Fleet size
          </label>
          <select
            id="fleet-size"
            name="fleet-size"
            disabled={disabled}
            className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors bg-white disabled:opacity-50"
            defaultValue=""
          >
            <option value="" disabled>
              Select range
            </option>
            <option value="1-50">1–50 vehicles</option>
            <option value="51-200">51–200 vehicles</option>
            <option value="201-500">201–500 vehicles</option>
            <option value="500+">500+ vehicles</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="ev-share"
            className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
          >
            EV share of fleet
          </label>
          <select
            id="ev-share"
            name="ev-share"
            disabled={disabled}
            className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors bg-white disabled:opacity-50"
            defaultValue=""
          >
            <option value="" disabled>
              Select range
            </option>
            <option value="none-planned">No EVs yet, planning to add</option>
            <option value="under-10">Under 10%</option>
            <option value="10-25">10–25%</option>
            <option value="25-50">25–50%</option>
            <option value="50-plus">Over 50%</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2"
        >
          What are you looking to solve?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          disabled={disabled}
          className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors resize-none disabled:opacity-50"
          placeholder="Tell us about your current reconciliation process, which fleet card you use (WEX, Coast, Comdata…), and what's broken today."
        />
      </div>

      {status === "error" && (
        <div className="p-4 rounded-md bg-red/5 border border-red/20 text-sm text-red">
          {errorMessage}
        </div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-navy font-semibold rounded-md hover:bg-accent-light transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Submitting…" : "Request Early Access"}
        </button>
        <p className="text-xs font-mono uppercase tracking-wider text-slate-500">
          We&apos;ll respond within one business day.
        </p>
      </div>
    </form>
  );
}
