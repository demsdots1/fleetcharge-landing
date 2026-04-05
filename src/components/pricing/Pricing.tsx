"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const tiers = [
  {
    name: "Essentials",
    price: "$6",
    unit: "/vehicle/mo",
    description: "For fleets starting their EV reconciliation journey.",
    features: [
      "WEX import (diesel + EV)",
      "ChargePoint session import",
      "Vehicle Master (all external ID mapping)",
      "Auto-matching engine with confidence scoring",
      "Exception queue",
      "Immutable audit trail",
      "EV + diesel transaction view",
    ],
    cta: "Request Early Access",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$12",
    unit: "/vehicle/mo",
    description:
      "For fleets that need to answer 'Are our EVs saving money?' — and back it up.",
    features: [
      "Everything in Essentials",
      "EV vs. diesel CPM report (with data completeness badge)",
      "Multi-network ingestion (EVgo, Blink)",
      "Home charging reimbursement module",
      "IFTA quarterly filing report",
      "Depot-level cost comparison",
      "QuickBooks / Xero export",
      "Budget variance analysis",
    ],
    cta: "Request Early Access",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$18",
    unit: "/vehicle/mo",
    description:
      "For fleets where the energy cost line is material enough to require CFO-grade documentation.",
    features: [
      "Everything in Professional",
      "One-click audit package generator (PDF with source index)",
      "Multi-entity / multi-depot support",
      "Custom GL mapping (segment-level)",
      "ERP integration (SAP, NetSuite)",
      "API access",
      "Role-based access control with approval thresholds",
      "Priority implementation support",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-24 md:py-32 bg-slate-50 border-y border-slate-200" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4">
            Pricing
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-navy leading-[1.1]">
            Priced per vehicle. Built for fleets.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative p-10 ${
                tier.highlighted ? "bg-navy text-white" : "bg-white"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
              )}
              {tier.highlighted && (
                <span className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded">
                  Most Popular
                </span>
              )}

              <h3
                className={`font-display text-2xl ${
                  tier.highlighted ? "text-white" : "text-navy"
                }`}
              >
                {tier.name}
              </h3>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span
                  className={`font-mono tabular-nums text-5xl font-medium tracking-tight ${
                    tier.highlighted ? "text-white" : "text-navy"
                  }`}
                >
                  {tier.price}
                </span>
                <span
                  className={`text-sm font-mono ${
                    tier.highlighted ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {tier.unit}
                </span>
              </div>
              <p
                className={`mt-4 text-sm leading-relaxed min-h-[40px] ${
                  tier.highlighted ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {tier.description}
              </p>

              <div
                className={`my-8 h-px ${
                  tier.highlighted ? "bg-white/10" : "bg-slate-200"
                }`}
              />

              <ul className="space-y-3.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 flex-shrink-0"
                    >
                      <path
                        d="M3 8.5L6.5 12L13 4"
                        stroke="#22C55E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className={`text-sm leading-snug ${
                        tier.highlighted ? "text-slate-200" : "text-slate-700"
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/demo"
                className={`mt-10 block text-center py-3 rounded-md text-sm font-semibold transition-colors ${
                  tier.highlighted
                    ? "bg-accent text-navy hover:bg-accent-light"
                    : "bg-navy text-white hover:bg-navy-light"
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center text-sm text-slate-500 max-w-2xl mx-auto"
        >
          Pricing covers all vehicles — diesel, electric, hybrid, and alternative
          fuel. We price per vehicle because the problem is fleet-wide, not just
          EV-specific.
        </motion.p>
      </div>
    </section>
  );
}
