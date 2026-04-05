import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Early Access",
  description:
    "Request early access to FleetCharge HQ. Tell us about your fleet's fuel mix and current reconciliation pain points.",
};

export default function DemoPage() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4">
            Get started
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-navy leading-[1.1] tracking-tight">
            Request early access.
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl leading-relaxed">
            FleetCharge HQ is currently in early access with select fleet
            finance teams. Tell us about your fleet and we&apos;ll be in touch
            within one business day.
          </p>
        </div>

        <div className="border border-slate-200 rounded-lg bg-white">
          <div className="px-8 py-6 border-b border-slate-200 bg-slate-50/50">
            <h2 className="font-mono text-xs uppercase tracking-wider text-slate-500">
              Contact form
            </h2>
          </div>

          <form className="p-8 space-y-6">
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
                  className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
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
                  className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
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
                  className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
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
                  className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors bg-white"
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
                  className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors bg-white"
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
                  className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors bg-white"
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
                className="w-full px-4 py-3 rounded-md border border-slate-300 text-sm text-navy focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors resize-none"
                placeholder="Tell us about your current reconciliation process, which fleet card you use (WEX, Coast, Comdata…), and what's broken today."
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-navy font-semibold rounded-md hover:bg-accent-light transition-colors text-sm"
              >
                Request Early Access
              </button>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-500">
                We&apos;ll respond within one business day.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
