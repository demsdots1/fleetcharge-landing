"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    label: "RECONCILIATION ENGINE",
    heading: "WEX pays it. We explain it.",
    body: "WEX processes your EV charges. FleetCharge HQ enriches them — matching each payment to the charging session that generated it, and attaching the kWh, vehicle, and cost-per-kWh that WEX doesn't provide. The missing fields, found.",
  },
  {
    label: "CONFIDENCE SCORING",
    heading: "Transparency is a feature, not a disclaimer.",
    body: "Every matched transaction displays its confidence score and match rationale. Every report shows a data completeness badge — green for metered, yellow for estimated. You always know what you're signing off on before it hits the GL.",
  },
  {
    label: "AUDIT TRAIL",
    heading: "From scrapbook to source document.",
    body: "Every match, manual override, and approval is timestamped and immutable. When your auditor asks how you determined kWh for an EVgo session, you click one button and show them the chain of evidence — not a 47-tab workbook.",
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4">
            Differentiators
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-navy leading-[1.1]">
            Built for fleet finance, not fleet ops.
          </h2>
        </motion.div>

        <div className="border-y border-slate-200">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`grid md:grid-cols-12 gap-8 py-12 ${
                i > 0 ? "border-t border-slate-200" : ""
              }`}
            >
              <div className="md:col-span-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tabular-nums text-accent-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
                    {f.label}
                  </span>
                </div>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-display text-2xl md:text-3xl text-navy leading-tight mb-4">
                  {f.heading}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                  {f.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
