import type { Metadata } from "next";
import EarlyAccessForm from "@/components/forms/EarlyAccessForm";

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
          <EarlyAccessForm />
        </div>
      </div>
    </section>
  );
}
