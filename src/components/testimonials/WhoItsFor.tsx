"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const personas = [
  {
    role: "Fleet Controller",
    quote:
      "I need one report that covers diesel and electric, reconciled against our fleet card statements, exportable to QuickBooks.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="14" height="14" rx="2" />
        <path d="M7 7h6M7 10h6M7 13h3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    role: "VP Finance",
    quote:
      "I need to prove to the board that our EV investment is paying off — with data I can audit, not dashboards I can't export.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 17V7l4-4h6l4 4v10a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
        <path d="M7 13l2 2 4-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    role: "Fleet Director",
    quote:
      "I need to stop logging into 5 different portals to build a spreadsheet that finance complains about anyway.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="7" r="3" />
        <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function WhoItsFor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-blue mb-3">
            Who it&apos;s for
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy tracking-tight">
            Built for fleet finance teams, not fleet operations
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((p, i) => (
            <motion.div
              key={p.role}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center">
                  {p.icon}
                </div>
                <h3 className="font-semibold text-navy">{p.role}</h3>
              </div>
              <blockquote className="text-sm text-gray-600 leading-relaxed italic">
                &ldquo;{p.quote}&rdquo;
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
