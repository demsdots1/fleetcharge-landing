"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    label: "INGEST",
    heading: "Upload once. Reconcile everything.",
    body: "Import your WEX statement and ChargePoint export as CSV. FleetCharge HQ maps every field automatically, detects duplicates, and flags anything missing before you've touched a spreadsheet.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    label: "MATCH",
    heading: "The engine finds what's missing.",
    body: "Our reconciliation engine links each WEX EV payment to the charging network session that generated it — attaching kWh, vehicle, driver, and cost-per-kWh to every charge. 90%+ auto-matched. The rest surface in a prioritized exception queue.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    label: "SCORE",
    heading: "Every number shows its confidence.",
    body: "Each transaction gets a confidence score. Every report gets a data completeness badge — showing exactly how much of your EV cost-per-mile is based on metered network data versus estimates. You stop hiding uncertainty and start quantifying it.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 22a10 10 0 10-10-10" strokeLinecap="round" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "04",
    label: "REPORT & EXPORT",
    heading: "The report your CFO stopped asking for.",
    body: "Pull the EV vs. diesel cost-per-mile comparison by vehicle class, depot, or route. Export to QuickBooks with your exact GL mapping. Generate an audit package that gives your auditor one document instead of a scrapbook.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
        <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-navy text-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-20"
        >
          <p className="text-xs font-mono uppercase tracking-wider text-accent mb-4">
            How it works
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.1]">
            From raw CSV to audit-ready report in four steps.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute left-0 right-0 top-[30px] h-px bg-white/10" />

          <div className="grid md:grid-cols-4 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative"
              >
                <div className="relative flex items-center justify-center h-[60px] w-[60px] rounded-md bg-navy-light border border-white/10 text-accent mb-6 z-10">
                  {step.icon}
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-xs text-accent tabular-nums">
                    {step.number}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                    {step.label}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-white leading-tight mb-3">
                  {step.heading}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
