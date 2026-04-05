"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  {
    value: "12–15 hrs → <2 hrs",
    label: "Monthly EV reconciliation time",
  },
  {
    value: "38 fields → 1",
    label: "What WEX gives you on an EV charge",
  },
  {
    value: "$156K/yr",
    label: "Typical home charging reimbursement exposure",
  },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-navy text-white overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Reconciliation engine for mixed-fuel fleets
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight"
          >
            Diesel gives you{" "}
            <span className="font-mono font-medium text-accent">38 fields</span>.
            <br />
            Your EV charge gives you{" "}
            <span className="font-mono font-medium text-accent">one</span>.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed"
          >
            FleetCharge HQ is the reconciliation engine for mixed-fuel fleets —
            turning WEX EV charges into complete transaction records with
            verified kWh, vehicle ID, cost-per-mile, and an audit trail your CFO
            and auditor will accept.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          >
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-accent text-navy font-semibold rounded-md hover:bg-accent-light transition-colors text-sm"
            >
              Request Early Access
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-accent transition-colors group"
            >
              See how it works
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 border-t border-white/10 pt-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-white/10">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`md:px-10 ${i === 0 ? "md:pl-0" : ""} ${
                  i === stats.length - 1 ? "md:pr-0" : ""
                }`}
              >
                <div className="font-mono tabular-nums text-2xl md:text-3xl font-medium text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-wider text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
