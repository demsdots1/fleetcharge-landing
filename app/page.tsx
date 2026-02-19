// app/page.tsx
import Image from 'next/image'

const BOOK_URL = 'https://calendly.com/YOUR_CALENDLY_LINK'

function Button({
  href,
  children,
  variant = 'primary',
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}) {
  const base =
    'inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
  const styles =
    variant === 'primary'
      ? 'bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-500'
      : 'bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15 focus-visible:ring-white'
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      className={`${base} ${styles}`}
    >
      {children}
    </a>
  )
}

function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string
  title: string
  desc?: string
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h2>
      {desc ? <p className="mt-4 text-base text-slate-600">{desc}</p> : null}
    </div>
  )
}

function Card({
  title,
  children,
  icon,
}: {
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        {icon ? (
          <div className="mt-0.5 rounded-lg bg-slate-900/5 p-2 text-slate-900">
            {icon}
          </div>
        ) : null}
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <div className="mt-2 text-sm leading-6 text-slate-600">{children}</div>
        </div>
      </div>
    </div>
  )
}

function StatTile({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
    </div>
  )
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700">
        ✓
      </span>
      <span className="text-sm text-slate-200">{children}</span>
    </li>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* TOP NAV */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-white">
              <Image
                src="/logo.png"
                alt="FleetCharge HQ"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="leading-tight">
              <p className="text-sm font-semibold">FleetCharge HQ</p>
              <p className="text-xs text-slate-500">Fleet Charging System of Record</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#morning" className="text-sm text-slate-600 hover:text-slate-900">
              8:00 AM view
            </a>
            <a href="#why" className="text-sm text-slate-600 hover:text-slate-900">
              Why
            </a>
            <a href="#how" className="text-sm text-slate-600 hover:text-slate-900">
              How it works
            </a>
            <a href="#different" className="text-sm text-slate-600 hover:text-slate-900">
              Different
            </a>
            <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={BOOK_URL}
              target="_blank"
              className="hidden rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 md:inline-flex"
            >
              Book a Call
            </a>
            <a
              href="#morning"
              className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              See the 8:00 AM view
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(900px circle at 20% 10%, rgba(249,115,22,0.25), transparent 60%), radial-gradient(700px circle at 80% 20%, rgba(56,189,248,0.20), transparent 55%), radial-gradient(800px circle at 50% 90%, rgba(34,197,94,0.18), transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200 ring-1 ring-white/15">
              <span className="font-semibold text-white">MVP built</span>
              <span className="text-slate-300">•</span>
              <span>Operator-first</span>
              <span className="text-slate-300">•</span>
              <span>No silent fixes</span>
              <span className="text-slate-300">•</span>
              <span>Traceable numbers</span>
              <span className="text-slate-300">•</span>
              <span>Fail-closed attribution</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Know what happened. Prove it. Act fast.
            </h1>

            <p className="mt-6 text-lg leading-7 text-slate-200 md:text-xl">
              FleetCharge HQ gives fleet operations a single, defensible record of charging cost, energy,
              and readiness across depot, public, and home—so you can answer leadership in minutes and fix
              exceptions before routes slip.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={BOOK_URL} variant="primary">
                Book a Call
              </Button>
              <Button href="#morning" variant="secondary">
                See the 8:00 AM view
              </Button>
            </div>

            <p className="mt-6 text-sm text-slate-300">
              Built for the daily question at 8:00 AM:{' '}
              <span className="text-white font-semibold">“Are we good today?”</span>
            </p>
          </div>

          {/* Hero mini-panels */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/7 p-5 ring-1 ring-white/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                8:00 AM readiness
              </p>
              <p className="mt-2 text-sm text-slate-200">
                See which vehicles need attention today—low SOC, missed charging, or stale telematics—then drill into the exact evidence.
              </p>
            </div>
            <div className="rounded-2xl bg-white/7 p-5 ring-1 ring-white/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Costs you can defend
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Every cost number is tied to explicit pricing rules and traceable sessions—no hand-waving, no spreadsheet reconciliation.
              </p>
            </div>
            <div className="rounded-2xl bg-white/7 p-5 ring-1 ring-white/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Evidence-first drill-through
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Click from summaries to the underlying ledger rows that created them—so ops and finance align on the same source of truth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: 8:00 AM PROOF SECTION */}
      <section id="morning" className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Proof"
          title="What you see at 8:00 AM"
          desc="A fast operational check—then one click into the ledger evidence."
        />

        <div className="mx-auto mt-12 max-w-6xl px-6">
          {/* Status tiles */}
          <div className="grid gap-4 md:grid-cols-4">
            <StatTile label="Low SOC vehicles" value="4" />
            <StatTile label="Missed charging" value="3" />
            <StatTile label="Stale telematics" value="2" />
            <StatTile label="Unassigned sessions" value="1" />
          </div>

          <p className="mt-4 text-sm text-slate-600">
            Click any number to see the exact vehicles and sessions behind it.
          </p>

          {/* Vehicles needing attention table */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-sm font-semibold text-slate-900">Vehicles needing attention</p>
              <p className="mt-1 text-sm text-slate-600">
                No silent fixes. Every number is traceable.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-white">
                  <tr className="border-b border-slate-200">
                    <th className="px-5 py-3 font-semibold text-slate-700">Vehicle</th>
                    <th className="px-5 py-3 font-semibold text-slate-700">Assigned Driver</th>
                    <th className="px-5 py-3 font-semibold text-slate-700">Issue</th>
                    <th className="px-5 py-3 font-semibold text-slate-700">Last Charge</th>
                    <th className="px-5 py-3 font-semibold text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-slate-200">
                    <td className="px-5 py-4 font-medium text-slate-900">Van 12</td>
                    <td className="px-5 py-4 text-slate-600">Smith</td>
                    <td className="px-5 py-4 text-slate-600">Low SOC + No recent charge</td>
                    <td className="px-5 py-4 text-slate-600">18h ago</td>
                    <td className="px-5 py-4">
                      <a href="#why" className="text-orange-700 hover:text-orange-800 font-semibold">
                        View evidence
                      </a>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-5 py-4 font-medium text-slate-900">Truck 3</td>
                    <td className="px-5 py-4 text-slate-600">Lee</td>
                    <td className="px-5 py-4 text-slate-600">Missed charging window</td>
                    <td className="px-5 py-4 text-slate-600">30h ago</td>
                    <td className="px-5 py-4">
                      <a href="#why" className="text-orange-700 hover:text-orange-800 font-semibold">
                        View evidence
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-medium text-slate-900">Van 7</td>
                    <td className="px-5 py-4 text-slate-600">—</td>
                    <td className="px-5 py-4 text-slate-600">Stale telematics</td>
                    <td className="px-5 py-4 text-slate-600">12h stale</td>
                    <td className="px-5 py-4">
                      <a href="#why" className="text-orange-700 hover:text-orange-800 font-semibold">
                        View evidence
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-200 bg-white px-5 py-4">
              <p className="text-sm text-slate-600">
                No guessing. If a session can’t be attributed, it stays explicitly unassigned.
              </p>
            </div>
          </div>

          {/* 24h snapshot strip */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">24h snapshot</p>
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total sessions</p>
                <p className="mt-1 text-lg font-bold text-slate-900">22</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total kWh</p>
                <p className="mt-1 text-lg font-bold text-slate-900">312.4</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total cost</p>
                <p className="mt-1 text-lg font-bold text-slate-900">$148.90</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">DC energy share</p>
                <p className="mt-1 text-lg font-bold text-slate-900">41%</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Then move on—or drill in only when something is off.
            </p>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Why this exists"
          title="Fleet charging data is fragmented — and it shows."
          desc="Operations teams end up reconciling CPO sessions, telematics feeds, assignments, and pricing logic by hand. FleetCharge HQ replaces that workflow with a defensible system of record."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          <Card title="Spreadsheets & defensive reconciliation">
            Manual work just to understand what happened — and to explain it confidently.
          </Card>
          <Card title="Uncertain attribution">
            Sessions without clear vehicle/driver alignment become cost disputes and operational noise.
          </Card>
          <Card title="Readiness risk at 8:00 AM">
            If telematics is stale or charging was missed, operations needs to know immediately.
          </Card>
        </div>

        <div className="mx-auto mt-10 max-w-6xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <p className="text-sm font-semibold text-slate-900">The daily workflow (fleet reality)</p>
            <div className="mt-4 grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">1) Operational check</p>
                <p className="mt-2 text-sm text-slate-600">
                  Vehicles below SOC threshold, missed charging, stale telematics, unassigned sessions.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">2) Investigate exceptions</p>
                <p className="mt-2 text-sm text-slate-600">
                  Click a vehicle → view last session → view assignment → verify cost, energy, reconciliation.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">3) Weekly review</p>
                <p className="mt-2 text-sm text-slate-600">
                  AC/DC mix, cost by vehicle/network, exposure breakdown — not daily, but essential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section className="bg-slate-50 py-16 md:py-20">
        <SectionHeading
          eyebrow="What it does"
          title="A charging ledger you can defend"
          desc="FleetCharge HQ creates one structured record for every charging event — with explicit cost logic and audit-ready metadata."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          <Card title="A ledger row you can defend">
            Each session is stored as a structured record with vehicle identity, driver attribution (when available), energy, cost, charging type (AC/DC), and reconciliation status.
          </Card>

          <Card title="No silent fixes. Every number is traceable.">
            Ambiguity is represented, not hidden. If telematics is stale or attribution fails closed, you see it immediately.
          </Card>

          <Card title="Pricing rules are explicit">
            Costs are calculated using explicit pricing rules — and the applied rule metadata is attached to the session for traceability.
          </Card>

          <Card title="Every summary drills back to evidence">
            Dashboards and summaries are only as useful as their audit trail. Metrics link back to ledger rows.
          </Card>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="py-16 md:py-20">
        <SectionHeading
          eyebrow="How it works"
          title="Ingest → Normalize → Operate"
          desc="A simple model that keeps trust high and operational action fast."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          <Card title="1) Ingest">
            Charging sessions from CPOs. SOC and freshness from telematics. No control loops.
          </Card>
          <Card title="2) Normalize">
            Sessions become ledger rows with explicit cost logic and visible reconciliation state.
          </Card>
          <Card title="3) Operate">
            Start with exceptions at 8:00 AM, investigate with evidence, then review trends weekly.
          </Card>
        </div>
      </section>

      {/* DIFFERENT */}
      <section id="different" className="bg-slate-900 py-16 md:py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Trust-first positioning</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              Built for operators — not dashboards and hype.
            </h2>
            <p className="mt-3 text-base text-slate-200">
              Operators don’t need more charts. They need fewer surprises—and proof behind every number.
            </p>
            <p className="mt-3 text-base text-slate-200">
              FleetCharge HQ focuses on a defensible charging record. No inference. No optimization. No control.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl bg-white/7 p-7 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white">What you get</p>
              <ul className="mt-5 space-y-3">
                <CheckItem>8:00 AM operational check (vehicles needing attention today)</CheckItem>
                <CheckItem>Exception-first investigation flow (drill into evidence)</CheckItem>
                <CheckItem>Explicit pricing rules + traceable session-level costs</CheckItem>
                <CheckItem>AC/DC visibility grounded in CPO-reported data</CheckItem>
                <CheckItem>Exports for audits and reporting (CSV/PDF)</CheckItem>
              </ul>
            </div>

            <div className="rounded-2xl bg-white/7 p-7 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white">What it’s not</p>
              <ul className="mt-5 space-y-3">
                <CheckItem>No vehicle control</CheckItem>
                <CheckItem>No charger control / CPMS functionality</CheckItem>
                <CheckItem>No optimization or predictive AI</CheckItem>
                <CheckItem>No invoice replacement / settlement engine</CheckItem>
                <CheckItem>No telematics replacement</CheckItem>
              </ul>
              <p className="mt-5 text-sm text-slate-200">
                No silent fixes. Every number is traceable—even when data is missing or delayed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          desc="Short answers, operator-first."
        />

        <div className="mx-auto mt-12 max-w-4xl space-y-4 px-6">
          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              Do you control chargers or vehicles?
              <span className="float-right text-slate-400 group-open:rotate-180 transition">⌄</span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              No. FleetCharge HQ is read-only. It ingests charging and telematics data and produces a defensible system of record.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              Is this an optimization platform?
              <span className="float-right text-slate-400 group-open:rotate-180 transition">⌄</span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              No. We don’t predict or optimize. We replace manual reconciliation with traceable, session-level evidence.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              What is the “system of record” in practice?
              <span className="float-right text-slate-400 group-open:rotate-180 transition">⌄</span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              It means summaries and totals can be traced back to the ledger sessions that created them — with explicit pricing logic and visible gaps when data is missing or delayed.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              Will this always match my invoices?
              <span className="float-right text-slate-400 group-open:rotate-180 transition">⌄</span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              FleetCharge HQ doesn’t replace invoices. It replaces manual reconciliation—by showing a defensible, session-level record with explicit pricing logic and visible gaps when data is missing or delayed.
            </p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  Stop reconciling charging data by hand.
                </h2>
                <p className="mt-3 text-base text-slate-600">
                  If you manage an EV fleet and want operational confidence in charging cost, usage, and readiness — let’s talk.
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Currently onboarding pilot fleets.
                </p>
              </div>

              <div className="flex md:justify-end">
                <a
                  href={BOOK_URL}
                  target="_blank"
                  className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 md:w-auto"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </div>

          <footer className="mt-10 flex flex-col items-center justify-between gap-3 text-center text-xs text-slate-500 md:flex-row md:text-left">
            <p>© {new Date().getFullYear()} FleetCharge HQ. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a className="hover:text-slate-700" href="#morning">
                8:00 AM view
              </a>
              <a className="hover:text-slate-700" href="#why">
                Why
              </a>
              <a className="hover:text-slate-700" href="#how">
                How it works
              </a>
              <a className="hover:text-slate-700" href="#faq">
                FAQ
              </a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  )
}
