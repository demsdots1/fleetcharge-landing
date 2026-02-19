// app/page.tsx

export default function Home() {
  return (
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="bg-slate-900 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your Fleet Charging System of Record.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Confidently explain charging cost, energy usage, and vehicle readiness —
            without spreadsheets, guesswork, or defensively reconciling data by hand.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="https://calendly.com/YOUR_CALENDLY_LINK"
              target="_blank"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition"
            >
              Book a Call
            </a>
            <a
              href="#how-it-works"
              className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-slate-900 transition"
            >
              See How It Works
            </a>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Built for fleet operations teams who need clarity.
          </p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">
            Fleet charging data is fragmented — and it shows.
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Fleet managers juggle CPO session data, telematics feeds,
            driver assignments, pricing rules, and delayed roaming updates.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h3 className="font-semibold">Spreadsheets & Guesswork</h3>
              <p className="text-gray-600 mt-2">
                Manual reconciliation just to understand what happened.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Uncertain Cost Attribution</h3>
              <p className="text-gray-600 mt-2">
                Sessions without clear driver or vehicle alignment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Vehicle Readiness Risk</h3>
              <p className="text-gray-600 mt-2">
                Morning uncertainty about SOC and charging status.
              </p>
            </div>
          </div>

          <p className="mt-12 text-xl font-medium">
            You shouldn’t need to defend your charging data.
          </p>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center">
            A Deterministic Charging Ledger for Fleet Operations
          </h2>

          <div className="mt-12 grid md:grid-cols-2 gap-10">
            <ul className="space-y-4 text-gray-700">
              <li>• Vehicle & driver attribution</li>
              <li>• Explicit pricing rule application</li>
              <li>• Energy & cost metadata</li>
              <li>• AC/DC classification</li>
              <li>• Confidence & reconciliation state</li>
            </ul>

            <div className="text-gray-700">
              <p>
                Every charging session is normalized into a structured,
                traceable record.
              </p>
              <p className="mt-4 font-medium">
                Traceable. Drillable. Nothing inferred.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold">How It Works</h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="font-semibold text-lg">1. Ingest</h3>
              <p className="mt-2 text-gray-600">
                Charging sessions from CPOs and SOC data from telematics.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">2. Normalize</h3>
              <p className="mt-2 text-gray-600">
                Deterministic ledger with explicit cost logic and metadata.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">3. Operate</h3>
              <p className="mt-2 text-gray-600">
                Operational readiness visibility and drill-through evidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT'S NOT */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center">
            What FleetCharge HQ Is Not
          </h2>

          <ul className="mt-10 space-y-3 text-slate-300">
            <li>• No vehicle control</li>
            <li>• No charger management (CPMS)</li>
            <li>• No optimization or predictive AI</li>
            <li>• No invoice settlement engine</li>
            <li>• No telematics replacement</li>
          </ul>

          <p className="mt-10 text-center text-lg">
            We are the reconciliation layer for fleet charging.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold">
          Stop Reconciling Charging Data by Hand.
        </h2>
        <p className="mt-4 text-gray-600">
          If you manage an EV fleet and want operational confidence in your charging data —
          let’s talk.
        </p>

        <div className="mt-8">
          <a
            href="https://calendly.com/YOUR_CALENDLY_LINK"
            target="_blank"
            className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-md font-semibold transition"
          >
            Book a Call
          </a>
        </div>
      </section>

    </main>
  );
}
