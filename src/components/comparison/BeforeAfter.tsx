"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const beforeRow = {
  date: "03/18",
  merchant: "CP 800 S VICTORIA AVE",
  amount: "$12.13",
  kwh: "???",
  rate: "???",
  vehicle: "???",
  driver: "???",
  soc: "???",
  cpm: "???",
  confidence: "???",
};

const afterRow = {
  date: "03/18",
  merchant: "ChargePoint, Ventura",
  amount: "$12.13",
  kwh: "29.67 kWh",
  rate: "$0.409/kWh",
  vehicle: "V-0042",
  driver: "J. Smith",
  soc: "34→82%",
  cpm: "$0.038/mi",
  confidence: "HIGH",
};

const fields = [
  { key: "date", label: "Date" },
  { key: "merchant", label: "Merchant" },
  { key: "amount", label: "Amount" },
  { key: "kwh", label: "kWh" },
  { key: "rate", label: "Rate" },
  { key: "vehicle", label: "Vehicle" },
  { key: "driver", label: "Driver" },
  { key: "soc", label: "SoC" },
  { key: "cpm", label: "Cost/Mile" },
  { key: "confidence", label: "Match" },
] as const;

type FieldKey = (typeof fields)[number]["key"];

export default function BeforeAfter() {
  const [showAfter, setShowAfter] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const row = showAfter ? afterRow : beforeRow;

  return (
    <section className="py-20 md:py-28 bg-gray-50/50" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-blue mb-3">
            Before & After
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy tracking-tight">
            What your fleet card statement looks like today
            <br className="hidden md:block" />
            <span className="text-blue"> vs. after FleetCharge HQ</span>
          </h2>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setShowAfter(false)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                !showAfter
                  ? "bg-white text-navy shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                showAfter
                  ? "bg-navy text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              After FleetCharge HQ
            </button>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[800px] rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-10 bg-gray-50 border-b border-gray-200">
              {fields.map((f) => (
                <div
                  key={f.key}
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400"
                >
                  {f.label}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-10">
              {fields.map((f) => {
                const value = row[f.key as FieldKey];
                const isMissing = value === "???";
                const isConfidence = f.key === "confidence" && !isMissing;

                return (
                  <motion.div
                    key={f.key}
                    initial={false}
                    animate={{ opacity: 1 }}
                    className={`px-4 py-4 text-sm font-mono ${
                      isMissing
                        ? "text-red/60 bg-red/5"
                        : isConfidence
                        ? "text-green font-semibold"
                        : "text-navy"
                    }`}
                  >
                    {isConfidence ? (
                      <span className="inline-flex items-center gap-1">
                        {value}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7.5l2.5 2.5L11 4.5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    ) : (
                      value
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {showAfter && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6 text-sm text-gray-500"
          >
            Every field filled. Every transaction attributed. Every match scored.
          </motion.p>
        )}
      </div>
    </section>
  );
}
