"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const acts = [
  {
    tag: "BEFORE EVs",
    tagColor: "text-accent-dark",
    heading: "Diesel was simple.",
    body: "One WEX statement. 38 fields. Gallons, price per gallon, vehicle, driver, odometer, cost per mile. Traceable to the penny. Auditor-ready in two hours.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#16A34A" strokeWidth="2">
        <circle cx="11" cy="11" r="9" />
        <path d="M7 11l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    iconBg: "bg-accent/10 border-accent/20",
  },
  {
    tag: "AFTER EVs",
    tagColor: "text-amber",
    heading: "Now you have EVs.",
    body: "For every EV charge flowing through WEX, you get one useful field: the dollar amount. No kWh. No unit price. No vehicle ID. No session data. That's the gap that turns a 2-hour close into 15.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#F59E0B" strokeWidth="2">
        <circle cx="11" cy="11" r="9" />
        <path d="M14 8l-6 6M8 8l6 6" strokeLinecap="round" />
      </svg>
    ),
    iconBg: "bg-amber/10 border-amber/20",
  },
  {
    tag: "FLEETCHARGE HQ",
    tagColor: "text-accent",
    heading: "We close the gap.",
    body: "We take that dollar amount and return a complete transaction record — kWh from the charging network, vehicle from your telematics, cost-per-mile comparable to your diesel fleet, and an audit trail your auditor already understands.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#22C55E" strokeWidth="2">
        <path d="M4 11h14M13 6l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    iconBg: "bg-accent/10 border-accent/30",
  },
];

export default function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="problem" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4">
            The problem
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-navy leading-[1.1]">
            The gap that broke fleet finance.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
          {acts.map((act, i) => (
            <motion.div
              key={act.tag}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-white p-10"
            >
              <div
                className={`inline-flex items-center justify-center h-11 w-11 rounded-md border ${act.iconBg} mb-6`}
              >
                {act.icon}
              </div>
              <p className={`text-xs font-mono uppercase tracking-wider mb-3 ${act.tagColor}`}>
                {act.tag}
              </p>
              <h3 className="font-display text-2xl text-navy mb-4 leading-tight">
                {act.heading}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {act.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
