import type { Metadata } from "next";
import Pricing from "@/components/pricing/Pricing";
import CTA from "@/components/cta/CTA";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for FleetCharge HQ. Per vehicle across your entire fleet — not just EVs. Starting at $6/vehicle/month.",
};

export default function PricingPage() {
  return (
    <div className="pt-20">
      <Pricing />

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-gray-50/50">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-navy tracking-tight text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Why do I pay per vehicle across my entire fleet, not just EVs?",
                a: "Because the whole point is comparing diesel and electric costs side by side. You can't measure whether EVs are saving money without the diesel baseline. Our pricing reflects that — you get full coverage of every vehicle in your fleet.",
              },
              {
                q: "What if I only have a few EVs in my fleet?",
                a: "That's actually our sweet spot. Fleets in early electrification have the hardest time getting clean data because EV transactions are scattered across multiple charging networks. Even 5-10 EVs mixed into a 200-vehicle fleet creates a reconciliation nightmare.",
              },
              {
                q: "Can I try it before committing?",
                a: "Yes. Book a discovery call and we'll run your actual fleet card data through the platform so you can see the enrichment on your own transactions. No generic demo — your data, your vehicles.",
              },
              {
                q: "What charging networks do you support?",
                a: "Professional and Enterprise plans support all major networks: ChargePoint, EVgo, Electrify America, Tesla Supercharger, Blink, and more. We're adding new integrations regularly.",
              },
              {
                q: "How does home charging reimbursement work?",
                a: "We calculate reimbursement amounts based on the driver's local utility rate, the kWh consumed (from telematics data), and the applicable IRS or HMRC guidelines. The output is a per-driver reimbursement amount you can process through payroll.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer text-navy font-semibold text-sm hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="flex-shrink-0 ml-4 transition-transform group-open:rotate-180"
                  >
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
