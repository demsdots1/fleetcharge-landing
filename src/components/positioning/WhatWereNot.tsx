"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const rows = [
  {
    name: "Not Geotab or Samsara",
    body: "They manage vehicles. We manage the money. FleetCharge HQ consumes telematics data — we don't replace it.",
  },
  {
    name: "Not WEX or Coast",
    body: "They process payments. We finish the transaction — adding the kWh, vehicle, and cost-per-mile that fleet cards don't provide for EV charging.",
  },
  {
    name: "Not Ampcontrol or Synop",
    body: "They optimize charging operations. We account for what that charging cost, in a format your CFO can put in a board presentation.",
  },
  {
    name: "Not a real-time dashboard",
    body: "FleetCharge HQ is built for the monthly close cycle. It feels like QuickBooks, not a live ops screen — because your CFO evaluates it alongside accounting tools, not fleet management tools.",
  },
];

export default function WhatWereNot() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-200" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4">
            Positioning
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-navy leading-[1.1]">
            We&apos;re not another fleet platform.
          </h2>
        </motion.div>

        {/* Table layout */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="hidden md:grid md:grid-cols-12 px-8 py-4 bg-slate-50 border-b border-slate-200">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-slate-500">
              Category
            </div>
            <div className="md:col-span-8 font-mono text-xs uppercase tracking-wider text-slate-500">
              Why we&apos;re different
            </div>
          </div>
          {rows.map((row, i) => (
            <motion.div
              key={row.name}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`grid md:grid-cols-12 gap-4 md:gap-8 px-8 py-6 ${
                i > 0 ? "border-t border-slate-200" : ""
              } hover:bg-slate-50/50 transition-colors`}
            >
              <div className="md:col-span-4 flex items-start gap-3">
                <span className="font-mono text-xs tabular-nums text-slate-400 mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold text-navy text-sm md:text-base">
                  {row.name}
                </span>
              </div>
              <div className="md:col-span-8 text-sm md:text-base text-slate-600 leading-relaxed">
                {row.body}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-slate-500 max-w-2xl mx-auto"
        >
          FleetCharge HQ is the{" "}
          <span className="text-navy font-semibold">financial layer</span>{" "}
          between your fleet tools and your accounting system.
        </motion.p>
      </div>
    </section>
  );
}
