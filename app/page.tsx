// app/page.tsx
'use client'

import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

const PILOT_ENDPOINT = '/api/pilot'

function GhostLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white/90 ring-1 ring-white/20 hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  )
}

function SectionHeading({
  eyebrow,
  title,
  desc,
  light,
}: {
  eyebrow?: string
  title: string
  desc?: string
  light?: boolean
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p
          className={`text-xs font-semibold uppercase tracking-wider ${
            light ? 'text-orange-300' : 'text-orange-600'
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 text-2xl font-bold tracking-tight md:text-3xl ${
          light ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {desc ? (
        <p className={`mt-4 text-base ${light ? 'text-slate-300' : 'text-slate-600'}`}>{desc}</p>
      ) : null}
    </div>
  )
}

function Card({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-slate-600">{children}</div>
    </div>
  )
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700">
        ✓
      </span>
      <span className="text-sm text-slate-200">{children}</span>
    </li>
  )
}

function Pill({
  tone = 'neutral',
  children,
}: {
  tone?: 'neutral' | 'danger' | 'warn'
  children: ReactNode
}) {
  const cls =
    tone === 'danger'
      ? 'bg-rose-50 text-rose-700 ring-rose-200'
      : tone === 'warn'
      ? 'bg-amber-50 text-amber-800 ring-amber-200'
      : 'bg-slate-50 text-slate-700 ring-slate-200'
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${cls}`}
    >
      {children}
    </span>
  )
}

function TrustSignal({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">
      {children}
    </span>
  )
}

function StepCard({
  step,
  title,
  children,
}: {
  step: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
        {step}
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-slate-600">{children}</div>
    </div>
  )
}

function EarlyAccessForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')

    try {
      const fd = new FormData(e.currentTarget)
      const payload = {
        name: String(fd.get('name') || ''),
        email: String(fd.get('email') || ''),
        company: String(fd.get('company') || ''),
        fleetSize: String(fd.get('fleetSize') || ''),
      }

      const res = await fetch(PILOT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('done')
      e.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-2xl bg-white p-7 shadow-2xl ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Request Early Access</h3>
          <p className="mt-2 text-sm text-slate-600">
            Currently onboarding fleets with structured charging data needs.
          </p>
        </div>
        <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 sm:inline-flex">
          Read-only
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-700">Full name</span>
            <input
              name="name"
              required
              placeholder="Jane Smith"
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs font-semibold text-slate-700">Work email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="jane@fleetco.com"
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-xs font-semibold text-slate-700">Company</span>
          <input
            name="company"
            required
            placeholder="FleetCo"
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-xs font-semibold text-slate-700">Fleet size (optional)</span>
          <input
            name="fleetSize"
            placeholder="e.g., 25 vehicles"
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />
        </label>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'submitting' ? 'Submitting...' : 'Request Early Access'}
        </button>

        {status === 'done' ? (
          <div className="mt-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 ring-1 ring-emerald-200">
            Request received. We'll be in touch.
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="mt-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-800 ring-1 ring-rose-200">
            Something went wrong. Please try again.
          </div>
        ) : null}

        <p className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-500">
          <span aria-hidden="true">&#128274;</span>
          Secure form &bull; No spam &bull; Early access only
        </p>
      </form>
    </div>
  )
}

type MockPage = 'dashboard' | 'operations' | 'ledger' | 'analytics' | 'setup'
type OpsTab = 'combined' | 'low_soc' | 'missed' | 'stale' | 'unassigned'

function miniNowLabel() {
  return 'Last refresh: 7:58 AM'
}

export default function Home() {
  const [mockPage, setMockPage] = useState<MockPage>('dashboard')
  const [opsTab, setOpsTab] = useState<OpsTab>('combined')
  const [opsFilter, setOpsFilter] = useState<string>('Last 24h')
  const [ledgerFilter, setLedgerFilter] = useState<string>('Last 7d')
  const [showWhy, setShowWhy] = useState(false)
  const [whyTitle, setWhyTitle] = useState('Why?')
  const [whyBody, setWhyBody] = useState(
    'This explanation is derived from explicit inputs (sessions, SOC freshness, assignments). No inference.'
  )

  const addressBar = useMemo(() => {
    const base = 'fleetchargehq.com/app/'
    if (mockPage === 'dashboard') return base + 'dashboard'
    if (mockPage === 'operations') return base + 'operations'
    if (mockPage === 'ledger') return base + 'ledger'
    if (mockPage === 'analytics') return base + 'analytics'
    return base + 'fleet-setup'
  }, [mockPage])

  function openOperations(tab: OpsTab, filterLabel?: string) {
    setMockPage('operations')
    setOpsTab(tab)
    setOpsFilter(filterLabel || 'Last 24h')
    setShowWhy(false)
  }

  function openLedger(filterLabel: string) {
    setMockPage('ledger')
    setLedgerFilter(filterLabel)
    setShowWhy(false)
  }

  function openWhy(title: string, body: string) {
    setWhyTitle(title)
    setWhyBody(body)
    setShowWhy(true)
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* ───────────────────────────── TOP NAV ───────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="FleetCharge HQ" className="h-16 w-16" />
            <div className="leading-tight">
              <p className="text-lg font-semibold text-slate-900">FleetCharge HQ</p>
              <p className="text-sm text-slate-500">Fleet Charging System of Record</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#ledger-section" className="text-base font-medium text-slate-600 hover:text-slate-900">
              Ledger
            </a>
            <a href="#walkthrough" className="text-base font-medium text-slate-600 hover:text-slate-900">
              Product
            </a>
            <a href="#how" className="text-base font-medium text-slate-600 hover:text-slate-900">
              How it Works
            </a>
            <a href="#integration" className="text-base font-medium text-slate-600 hover:text-slate-900">
              Integration
            </a>
            <a href="#ecosystem" className="text-base font-medium text-slate-600 hover:text-slate-900">
              Ecosystem
            </a>
            <a href="#faq" className="text-base font-medium text-slate-600 hover:text-slate-900">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#early-access"
              className="hidden rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 md:inline-flex"
            >
              Request Early Access
            </a>
            <a
              href="#walkthrough"
              className="inline-flex rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              See Product Walkthrough
            </a>
          </div>
        </div>
      </header>

      {/* ───────────────────────────── 1. HERO ───────────────────────────── */}
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
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="max-w-xl">
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200 ring-1 ring-white/15">
                <span className="font-semibold text-white">System of Record</span>
                <span className="text-slate-300">&bull;</span>
                <span>Read-only</span>
                <span className="text-slate-300">&bull;</span>
                <span>Deterministic</span>
                <span className="text-slate-300">&bull;</span>
                <span>Fail-closed</span>
              </div>

              <h1 className="mt-7 text-4xl font-bold tracking-tight text-white md:text-5xl">
                The Fleet Charging System of Record.
              </h1>

              <p className="mt-6 text-lg leading-7 text-slate-200 md:text-xl">
                FleetCharge HQ gives EV fleets a deterministic charging ledger that explains energy,
                cost, and charging risk across networks. Every number traces back to the session that
                produced it. No silent fixes. No retroactive rewrites.
              </p>

              <p className="mt-4 text-sm text-slate-300">
                <span className="font-semibold text-white">Trust boundary:</span> If attribution or
                cost cannot be proven from explicit inputs, the session stays explicitly unassigned.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                    &#10003;
                  </span>
                  <span>
                    Structured ledger row per charging event &mdash; vehicle, driver, energy, cost,
                    AC/DC classification, reconciliation state.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                    &#10003;
                  </span>
                  <span>
                    Deterministic cost engine with explicit pricing rules and applied-rule metadata
                    on every session.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                    &#10003;
                  </span>
                  <span>
                    Operational exceptions surfaced at 8:00 AM &mdash; low SOC, missed charging,
                    stale telematics, unassigned sessions.
                  </span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <GhostLink href="#walkthrough">See the product walkthrough</GhostLink>
                <GhostLink href="#early-access">Request Early Access</GhostLink>
              </div>
            </div>

            <div id="early-access" className="lg:justify-self-end">
              <EarlyAccessForm />
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            <TrustSignal>OCPI session ingestion</TrustSignal>
            <TrustSignal>Telematics SOC ingestion</TrustSignal>
            <TrustSignal>Deterministic cost engine</TrustSignal>
            <TrustSignal>Fail-closed attribution</TrustSignal>
            <TrustSignal>Replay-safe ingestion</TrustSignal>
            <TrustSignal>Data lineage transparency</TrustSignal>
          </div>
        </div>
      </section>

      {/* ──────────────── 2. TRUSTED INPUTS / SYSTEM BOUNDARY ──────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <SectionHeading
          eyebrow="System boundary"
          title="Explicit inputs. Read-only."
          desc="FleetCharge HQ consumes charging and telematics data. It does not control vehicles, chargers, or settlement systems."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          <Card title="CPO charging sessions">
            OCPI-like Sessions and CDRs ingested from charge point operators. Session boundaries,
            kWh delivered, charging type (AC/DC), network, and location.
          </Card>

          <Card title="Vehicle SOC from telematics">
            State of charge and freshness timestamps from telematics providers or OEM APIs. Used for
            readiness visibility only &mdash; no control loops.
          </Card>

          <Card title="Explicit assignment records">
            Time-bound driver-to-vehicle assignments. If no assignment exists at session time,
            attribution fails closed. Assignment changes do not retroactively modify historical
            sessions.
          </Card>
        </div>

        <div className="mx-auto mt-8 max-w-6xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">Read-only boundary:</span> FleetCharge
              HQ does not send commands to chargers, vehicles, or CPO networks. It records,
              reconciles, and produces traceable evidence.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────── 3. CHARGING EVENT LEDGER ────────────────── */}
      <section id="ledger-section" className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Core abstraction"
          title="The Charging Event Ledger"
          desc="Every charging event becomes a structured, traceable record. Summaries and analytics derive from ledger rows &mdash; not the other way around."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          <Card title="Structured ledger row">
            Each session is stored with vehicle identity, driver attribution (when provable),
            energy delivered, cost, charging type (AC/DC), reconciliation state, and applied
            pricing rule metadata.
          </Card>

          <Card title="Deterministic cost logic">
            Costs are calculated using explicit pricing rules. The applied rule ID is attached to
            the session so cost derivation is auditable, not opaque.
          </Card>

          <Card title="Explicit reconciliation state">
            Every session carries a reconciliation status &mdash; complete, partial, or
            unreconciled. Ambiguity is represented, not hidden.
          </Card>

          <Card title="Fail-closed attribution">
            If vehicle identity or driver assignment cannot be proven from explicit signals at
            session time, the session stays explicitly unassigned. Unassigned is a valid, visible
            state &mdash; not a gap to silently fill.
          </Card>

          <Card title="AC/DC classification">
            Charging current type is derived from CPO-reported session data. DC sessions are
            flagged for cost and operational visibility.
          </Card>

          <Card title="Evidence lineage">
            Every dashboard tile, every aggregate, every chart drills back to the ledger rows that
            produced it. No summary exists without traceable sessions behind it.
          </Card>
        </div>

        <div className="mx-auto mt-8 max-w-6xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">Historical immutability:</span>{' '}
              Ledger rows are append-only. Session mutation history is preserved. Assignment
              changes are forward-looking and do not silently rewrite past sessions.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────── 4. PRODUCT WALKTHROUGH (Interactive Mock) ──────────────── */}
      <section id="walkthrough" className="bg-slate-50 py-16 md:py-20">
        <SectionHeading
          eyebrow="Product walkthrough"
          title="Operational workflow: the 8:00 AM view"
          desc="Start with exceptions, drill into evidence, review trends. Every path leads to the ledger."
        />

        <div className="mx-auto mt-12 max-w-6xl px-6">
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-700">
              In-product: click a tile &#8594; filtered Operations &#8594; pre-filtered Ledger view &#8594;{' '}
              <span className="font-semibold">&quot;Why?&quot;</span> explains attribution and
              reconciliation from the underlying fields.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            {/* Browser chrome */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-amber-400" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" aria-hidden="true" />
              </div>
              <div className="hidden w-full max-w-xl items-center justify-center sm:flex">
                <div className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500">
                  {addressBar}
                </div>
              </div>
              <div className="text-xs font-semibold text-slate-500">Interactive</div>
            </div>

            <div className="grid md:grid-cols-[240px_1fr]">
              {/* Left nav */}
              <aside className="border-b border-slate-200 bg-slate-900 text-white md:border-b-0 md:border-r">
                <div className="flex items-center gap-3 px-5 py-5">
                  <div className="leading-tight">
                    <p className="text-sm font-semibold">FleetCharge HQ</p>
                  </div>
                </div>

                <nav className="px-3 pb-5">
                  {[
                    { key: 'dashboard', label: 'Dashboard' },
                    { key: 'operations', label: 'Operations' },
                    { key: 'ledger', label: 'Ledger' },
                    { key: 'analytics', label: 'Analytics' },
                    { key: 'setup', label: 'Fleet setup' },
                  ].map((item) => {
                    const active = mockPage === (item.key as MockPage)
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => {
                          setMockPage(item.key as MockPage)
                          setShowWhy(false)
                        }}
                        className={[
                          'w-full text-left flex items-center justify-between rounded-xl px-3 py-2 text-sm transition',
                          active
                            ? 'bg-white/10 text-white'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white',
                        ].join(' ')}
                      >
                        <span className="font-semibold">{item.label}</span>
                        {active ? (
                          <span className="text-xs text-slate-300">Active</span>
                        ) : null}
                      </button>
                    )
                  })}
                </nav>
              </aside>

              {/* Main content */}
              <div className="bg-white">
                {/* DASHBOARD */}
                {mockPage === 'dashboard' ? (
                  <>
                    <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Dashboard
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">
                          Are we good today?
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          Immediate operational status.{' '}
                          <span className="font-semibold">No inference.</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          {miniNowLabel()}
                        </span>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                          Status: Monitoring
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-4 px-5 py-5 md:grid-cols-4">
                      <button
                        type="button"
                        onClick={() => openOperations('low_soc', 'Low SOC')}
                        className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Low SOC
                        </p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">4</p>
                        <p className="mt-2 text-xs text-slate-600">Vehicles below threshold</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => openOperations('missed', 'Missed charging')}
                        className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Missed charging
                        </p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">3</p>
                        <p className="mt-2 text-xs text-slate-600">No charge in window</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => openOperations('stale', 'Stale telematics')}
                        className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Stale telematics
                        </p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">2</p>
                        <p className="mt-2 text-xs text-slate-600">SOC freshness risk</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => openOperations('unassigned', 'Unassigned')}
                        className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Unassigned
                        </p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">1</p>
                        <p className="mt-2 text-xs text-slate-600">Explicitly unassigned</p>
                      </button>
                    </div>

                    <div className="px-5">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <p className="text-sm font-semibold text-slate-900">24h snapshot</p>
                          <p className="text-xs text-slate-600">
                            All aggregates traceable to sessions.
                          </p>
                        </div>

                        <div className="mt-4 grid gap-4 md:grid-cols-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Sessions
                            </p>
                            <p className="mt-1 text-lg font-bold text-slate-900">22</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              kWh
                            </p>
                            <p className="mt-1 text-lg font-bold text-slate-900">312.4</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Cost
                            </p>
                            <p className="mt-1 text-lg font-bold text-slate-900">$148.90</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              DC %
                            </p>
                            <p className="mt-1 text-lg font-bold text-slate-900">41%</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-5">
                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              Vehicles needing attention
                            </p>
                            <p className="mt-1 text-xs text-slate-600">
                              Row &#8594; Ledger filtered to vehicle.
                            </p>
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                            Derived from ledger rows
                          </span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-white">
                              <tr className="border-b border-slate-200">
                                <th className="px-5 py-3 font-semibold text-slate-700">Vehicle</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Driver</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Issue</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">
                                  Last charge
                                </th>
                                <th className="px-5 py-3 font-semibold text-slate-700">SOC</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">View</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="border-b border-slate-200">
                                <td className="px-5 py-4 font-medium text-slate-900">Van 12</td>
                                <td className="px-5 py-4 text-slate-600">Smith</td>
                                <td className="px-5 py-4">
                                  <div className="flex flex-wrap gap-2">
                                    <Pill tone="danger">Low SOC</Pill>
                                    <Pill tone="warn">No recent charge</Pill>
                                  </div>
                                </td>
                                <td className="px-5 py-4 text-slate-600">18h ago (AC)</td>
                                <td className="px-5 py-4 text-slate-600">18%</td>
                                <td className="px-5 py-4">
                                  <button
                                    type="button"
                                    onClick={() => openLedger('Vehicle: Van 12')}
                                    className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>

                              <tr className="border-b border-slate-200">
                                <td className="px-5 py-4 font-medium text-slate-900">Truck 3</td>
                                <td className="px-5 py-4 text-slate-600">Lee</td>
                                <td className="px-5 py-4">
                                  <Pill tone="warn">Missed charging</Pill>
                                </td>
                                <td className="px-5 py-4 text-slate-600">30h ago (DC)</td>
                                <td className="px-5 py-4 text-slate-600">&mdash;</td>
                                <td className="px-5 py-4">
                                  <button
                                    type="button"
                                    onClick={() => openLedger('Vehicle: Truck 3')}
                                    className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>

                              <tr>
                                <td className="px-5 py-4 font-medium text-slate-900">Van 7</td>
                                <td className="px-5 py-4 text-slate-600">&mdash;</td>
                                <td className="px-5 py-4">
                                  <Pill tone="warn">Stale telematics</Pill>
                                </td>
                                <td className="px-5 py-4 text-slate-600">12h stale</td>
                                <td className="px-5 py-4 text-slate-600">Unknown</td>
                                <td className="px-5 py-4">
                                  <button
                                    type="button"
                                    onClick={() => openLedger('Vehicle: Van 7')}
                                    className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="border-t border-slate-200 bg-white px-5 py-4">
                          <p className="text-sm text-slate-600">
                            Trust cues:{' '}
                            <span className="font-semibold">
                              All metrics derived from ledger rows.
                            </span>{' '}
                            No inference.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                {/* OPERATIONS */}
                {mockPage === 'operations' ? (
                  <>
                    <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Operations
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">
                          What needs attention right now?
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          Exception console. Deterministic. No scoring.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          Range: Last 24h
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          Filter: {opsFilter}
                        </span>
                      </div>
                    </div>

                    <div className="border-b border-slate-200 bg-white px-5 py-4">
                      <div className="grid gap-3 md:grid-cols-5">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                          Date: Last 24h
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                          Vehicle: All
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                          Driver: All
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                          Charge type: All
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setOpsFilter('Last 24h')
                            setOpsTab('combined')
                            setShowWhy(false)
                          }}
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs font-semibold text-slate-900 hover:bg-slate-50"
                        >
                          Clear filters
                        </button>
                      </div>
                    </div>

                    <div className="border-b border-slate-200 bg-white px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        {[
                          { key: 'combined', label: 'Combined' },
                          { key: 'low_soc', label: 'Low SOC' },
                          { key: 'missed', label: 'Missed charging' },
                          { key: 'stale', label: 'Stale telematics' },
                          { key: 'unassigned', label: 'Unassigned sessions' },
                        ].map((t) => {
                          const active = opsTab === (t.key as OpsTab)
                          return (
                            <button
                              key={t.key}
                              type="button"
                              onClick={() => {
                                setOpsTab(t.key as OpsTab)
                                setOpsFilter(t.label)
                                setShowWhy(false)
                              }}
                              className={[
                                'rounded-full px-3 py-1 text-xs font-semibold ring-1 transition',
                                active
                                  ? 'bg-slate-900 text-white ring-slate-900'
                                  : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50',
                              ].join(' ')}
                            >
                              {t.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {opsTab !== 'unassigned' ? (
                      <div className="px-5 py-5">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                Vehicles needing attention
                              </p>
                              <p className="mt-1 text-xs text-slate-600">
                                Row &#8594; Ledger filtered. Explain &#8594; session narrative.
                              </p>
                            </div>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                              Tab: {opsFilter}
                            </span>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                              <thead className="bg-white">
                                <tr className="border-b border-slate-200">
                                  <th className="px-5 py-3 font-semibold text-slate-700">
                                    Vehicle
                                  </th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">
                                    Driver
                                  </th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">Issue</th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">
                                    Last charge
                                  </th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">SOC</th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">View</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                <tr className="border-b border-slate-200">
                                  <td className="px-5 py-4 font-medium text-slate-900">Van 12</td>
                                  <td className="px-5 py-4 text-slate-600">Smith</td>
                                  <td className="px-5 py-4">
                                    <div className="flex flex-wrap gap-2">
                                      <Pill tone="danger">Low SOC</Pill>
                                      <Pill tone="warn">No recent charge</Pill>
                                    </div>
                                  </td>
                                  <td className="px-5 py-4 text-slate-600">18h ago (AC)</td>
                                  <td className="px-5 py-4 text-slate-600">18%</td>
                                  <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => openLedger('Vehicle: Van 12')}
                                        className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                      >
                                        View
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          openWhy(
                                            'Why is Van 12 flagged?',
                                            'Low SOC derived from SOC authority + freshness. "No recent charge" derived from session timestamps. All evidence links to ledger rows. No inference.'
                                          )
                                        }
                                        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                                      >
                                        Explain
                                      </button>
                                    </div>
                                  </td>
                                </tr>

                                <tr className="border-b border-slate-200">
                                  <td className="px-5 py-4 font-medium text-slate-900">
                                    Truck 3
                                  </td>
                                  <td className="px-5 py-4 text-slate-600">Lee</td>
                                  <td className="px-5 py-4">
                                    <Pill tone="warn">Missed charging</Pill>
                                  </td>
                                  <td className="px-5 py-4 text-slate-600">30h ago (DC)</td>
                                  <td className="px-5 py-4 text-slate-600">&mdash;</td>
                                  <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => openLedger('Vehicle: Truck 3')}
                                        className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                      >
                                        View
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          openWhy(
                                            'Why is Truck 3 flagged?',
                                            'Missed charging window is evaluated against explicit policy inputs + last session timestamps. Gaps remain gaps. No silent fixes.'
                                          )
                                        }
                                        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                                      >
                                        Explain
                                      </button>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td className="px-5 py-4 font-medium text-slate-900">Van 7</td>
                                  <td className="px-5 py-4 text-slate-600">&mdash;</td>
                                  <td className="px-5 py-4">
                                    <Pill tone="warn">Stale telematics</Pill>
                                  </td>
                                  <td className="px-5 py-4 text-slate-600">12h stale</td>
                                  <td className="px-5 py-4 text-slate-600">Unknown</td>
                                  <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => openLedger('Vehicle: Van 7')}
                                        className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                      >
                                        View
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          openWhy(
                                            'Why is Van 7 flagged?',
                                            'SOC freshness exceeded threshold from explicit telematics/OEM timestamps. Readiness uses SOC + freshness only.'
                                          )
                                        }
                                        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                                      >
                                        Explain
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="border-t border-slate-200 bg-white px-5 py-4">
                            <p className="text-sm text-slate-600">
                              Trust cue:{' '}
                              <span className="font-semibold">
                                Assignment changes do not retroactively modify sessions.
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="px-5 py-5">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                Unassigned sessions
                              </p>
                              <p className="mt-1 text-xs text-slate-600">
                                Explicitly unassigned until proven.
                              </p>
                            </div>
                            <Pill tone="neutral">Fail-closed</Pill>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                              <thead className="bg-white">
                                <tr className="border-b border-slate-200">
                                  <th className="px-5 py-3 font-semibold text-slate-700">Start</th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">
                                    Network
                                  </th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">kWh</th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">Cost</th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">
                                    Reconciliation
                                  </th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">View</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white">
                                <tr>
                                  <td className="px-5 py-4 text-slate-600">2026-02-18 21:12</td>
                                  <td className="px-5 py-4 text-slate-600">Public Network A</td>
                                  <td className="px-5 py-4 text-slate-600">24.6</td>
                                  <td className="px-5 py-4 text-slate-600">$11.30</td>
                                  <td className="px-5 py-4">
                                    <Pill tone="warn">Partial</Pill>
                                  </td>
                                  <td className="px-5 py-4">
                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => openLedger('Unassigned sessions')}
                                        className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                      >
                                        View
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          openWhy(
                                            'Why is this unassigned?',
                                            'External session lacks a vehicle identity signal. Without an explicit mapping policy (vehicle-bound token or strict assignment), the session stays unassigned.'
                                          )
                                        }
                                        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                                      >
                                        Explain
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="border-t border-slate-200 bg-white px-5 py-4">
                            <p className="text-sm text-slate-600">
                              Trust cue: historical sessions are immutable. Attribution is
                              evidence-driven (not retroactive guessing).
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : null}

                {/* LEDGER */}
                {mockPage === 'ledger' ? (
                  <>
                    <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Ledger
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">
                          Show me the exact session rows
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          Forensic evidence. Expand rows. Explain shows &quot;Why?&quot;.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          Filter: {ledgerFilter}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          External IDs visible
                        </span>
                      </div>
                    </div>

                    <div className="border-b border-slate-200 bg-white px-5 py-4">
                      <div className="grid gap-3 md:grid-cols-4">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                          Date: Last 7d
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                          Vehicle: (from filter)
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                          Driver: Any
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
                          Type: AC/DC/Any
                        </div>
                      </div>
                    </div>

                    <div className="px-5 py-5">
                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Sessions</p>
                            <p className="mt-1 text-xs text-slate-600">
                              Expand row &#8594; pricing metadata. Explain &#8594; &quot;Why?&quot;
                              panel.
                            </p>
                          </div>
                          <Pill tone="neutral">Audit-grade</Pill>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-white">
                              <tr className="border-b border-slate-200">
                                <th className="px-5 py-3 font-semibold text-slate-700">Start</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">
                                  Vehicle
                                </th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Driver</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Type</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">AC/DC</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">
                                  Duration
                                </th>
                                <th className="px-5 py-3 font-semibold text-slate-700">kWh</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Cost</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">
                                  Reconciliation
                                </th>
                                <th className="px-5 py-3 font-semibold text-slate-700">
                                  Attribution
                                </th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Why?</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="border-b border-slate-200 align-top">
                                <td className="px-5 py-4 text-slate-600">2026-02-18 21:12</td>
                                <td className="px-5 py-4 font-medium text-slate-900">Van 12</td>
                                <td className="px-5 py-4 text-slate-600">Smith</td>
                                <td className="px-5 py-4 text-slate-600">Public</td>
                                <td className="px-5 py-4">
                                  <Pill tone="warn">DC</Pill>
                                </td>
                                <td className="px-5 py-4 text-slate-600">00:42</td>
                                <td className="px-5 py-4 text-slate-600">24.6</td>
                                <td className="px-5 py-4 text-slate-600">$11.30</td>
                                <td className="px-5 py-4">
                                  <Pill tone="neutral">Complete</Pill>
                                </td>
                                <td className="px-5 py-4">
                                  <Pill tone="neutral">Attributed</Pill>
                                </td>
                                <td className="px-5 py-4">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openWhy(
                                        'Why is this session attributed + priced?',
                                        'External session ID: cpo_sess_0001. Vehicle/driver attribution comes from explicit mapping policy/assignments at session time. Applied pricing rule ID: PR-DC-001. No inference.'
                                      )
                                    }
                                    className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                                  >
                                    Explain
                                  </button>
                                </td>
                              </tr>

                              <tr className="align-top">
                                <td className="px-5 py-4 text-slate-600">2026-02-18 08:10</td>
                                <td className="px-5 py-4 font-medium text-slate-900">&mdash;</td>
                                <td className="px-5 py-4 text-slate-600">&mdash;</td>
                                <td className="px-5 py-4 text-slate-600">Public</td>
                                <td className="px-5 py-4">
                                  <Pill tone="neutral">AC</Pill>
                                </td>
                                <td className="px-5 py-4 text-slate-600">01:05</td>
                                <td className="px-5 py-4 text-slate-600">18.1</td>
                                <td className="px-5 py-4 text-slate-600">$7.20</td>
                                <td className="px-5 py-4">
                                  <Pill tone="warn">Partial</Pill>
                                </td>
                                <td className="px-5 py-4">
                                  <Pill tone="neutral">Unassigned</Pill>
                                </td>
                                <td className="px-5 py-4">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openWhy(
                                        'Why is this unassigned?',
                                        'External session ID: cpo_sess_0006. No vehicle identity signal present. Without explicit mapping policy, session remains unassigned. No silent fixes.'
                                      )
                                    }
                                    className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                                  >
                                    Explain
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Expandable row detail (mock)
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Pill tone="neutral">External session ID: cpo_sess_0001</Pill>
                            <Pill tone="neutral">Applied pricing rule ID: PR-DC-001</Pill>
                            <Pill tone="neutral">Charging current type: DC</Pill>
                            <Pill tone="neutral">Reconciliation: Complete</Pill>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                {/* ANALYTICS */}
                {mockPage === 'analytics' ? (
                  <>
                    <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Analytics
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">
                          What changed this week?
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          Weekly review + finance defensibility.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          Period: Last 7d
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          All aggregates traceable
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-4 px-5 py-5 md:grid-cols-4">
                      {[
                        { label: 'Cost', value: '$1,482' },
                        { label: 'kWh', value: '3,214' },
                        { label: 'Sessions', value: '198' },
                        { label: 'DC %', value: '37%' },
                      ].map((k) => (
                        <div
                          key={k.label}
                          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {k.label}
                          </p>
                          <p className="mt-2 text-2xl font-bold text-slate-900">{k.value}</p>
                          <p className="mt-2 text-xs text-slate-600">
                            Click-through to ledger (mock).
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-4 px-5 pb-6 lg:grid-cols-[1fr_1fr]">
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              Cost by charging type
                            </p>
                            <p className="mt-1 text-xs text-slate-600">
                              Any slice drills to ledger.
                            </p>
                          </div>
                          <Pill tone="neutral">kWh + cost</Pill>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => openLedger('Slice: DC sessions')}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left hover:bg-slate-100"
                          >
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              DC
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-900">$820</p>
                            <p className="mt-1 text-xs text-slate-600">1,120 kWh</p>
                          </button>
                          <button
                            type="button"
                            onClick={() => openLedger('Slice: AC sessions')}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left hover:bg-slate-100"
                          >
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              AC
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-900">$662</p>
                            <p className="mt-1 text-xs text-slate-600">2,094 kWh</p>
                          </button>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-slate-900">
                          Cost by vehicle (Top 10)
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          Row &#8594; Ledger filtered to vehicle.
                        </p>
                        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-slate-50">
                              <tr className="border-b border-slate-200">
                                <th className="px-4 py-2 font-semibold text-slate-700">
                                  Vehicle
                                </th>
                                <th className="px-4 py-2 font-semibold text-slate-700">Cost</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">kWh</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">View</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {[
                                { v: 'Van 12', c: '$214', k: '412' },
                                { v: 'Truck 3', c: '$198', k: '360' },
                                { v: 'Van 7', c: '$156', k: '298' },
                              ].map((r) => (
                                <tr
                                  key={r.v}
                                  className="border-b border-slate-200 last:border-0"
                                >
                                  <td className="px-4 py-3 font-medium text-slate-900">
                                    {r.v}
                                  </td>
                                  <td className="px-4 py-3 text-slate-600">{r.c}</td>
                                  <td className="px-4 py-3 text-slate-600">{r.k}</td>
                                  <td className="px-4 py-3">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        openLedger(`Vehicle: ${r.v} (weekly slice)`)
                                      }
                                      className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                    >
                                      View
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pb-6">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm font-semibold text-slate-900">Trust cue</p>
                        <p className="mt-2 text-sm text-slate-600">
                          All aggregates are traceable to sessions. No hidden adjustments.
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}

                {/* FLEET SETUP */}
                {mockPage === 'setup' ? (
                  <>
                    <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Fleet setup
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">
                          Administrative configuration
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          Vehicles, drivers, assignments, pricing rules.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                          Historical sessions immutable
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-4 px-5 py-5 lg:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-slate-900">Vehicles</p>
                        <p className="mt-1 text-xs text-slate-600">
                          Vehicle &#8594; recent sessions &#8594; Ledger.
                        </p>
                        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-slate-50">
                              <tr className="border-b border-slate-200">
                                <th className="px-4 py-2 font-semibold text-slate-700">Name</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">
                                  Telematics key
                                </th>
                                <th className="px-4 py-2 font-semibold text-slate-700">
                                  Last SOC
                                </th>
                                <th className="px-4 py-2 font-semibold text-slate-700">View</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {[
                                { n: 'Van 12', k: 'geo_001', soc: '18%' },
                                { n: 'Truck 3', k: 'geo_014', soc: '—' },
                                { n: 'Van 7', k: 'oem_223', soc: 'Unknown' },
                              ].map((r) => (
                                <tr
                                  key={r.n}
                                  className="border-b border-slate-200 last:border-0"
                                >
                                  <td className="px-4 py-3 font-medium text-slate-900">
                                    {r.n}
                                  </td>
                                  <td className="px-4 py-3 text-slate-600">{r.k}</td>
                                  <td className="px-4 py-3 text-slate-600">{r.soc}</td>
                                  <td className="px-4 py-3">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        openLedger(`Vehicle: ${r.n} (recent sessions)`)
                                      }
                                      className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                    >
                                      Ledger
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-slate-900">Assignments</p>
                        <p className="mt-1 text-xs text-slate-600">
                          Explicit, time-bound. Changes don&apos;t rewrite history.
                        </p>
                        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-slate-50">
                              <tr className="border-b border-slate-200">
                                <th className="px-4 py-2 font-semibold text-slate-700">
                                  Driver
                                </th>
                                <th className="px-4 py-2 font-semibold text-slate-700">
                                  Vehicle
                                </th>
                                <th className="px-4 py-2 font-semibold text-slate-700">Start</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">End</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="border-b border-slate-200">
                                <td className="px-4 py-3 font-medium text-slate-900">Smith</td>
                                <td className="px-4 py-3 text-slate-600">Van 12</td>
                                <td className="px-4 py-3 text-slate-600">2026-02-01</td>
                                <td className="px-4 py-3 text-slate-600">&mdash;</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 font-medium text-slate-900">Lee</td>
                                <td className="px-4 py-3 text-slate-600">Truck 3</td>
                                <td className="px-4 py-3 text-slate-600">2026-02-10</td>
                                <td className="px-4 py-3 text-slate-600">&mdash;</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Trust cue
                          </p>
                          <p className="mt-2 text-sm text-slate-600">
                            Historical sessions are immutable. Attribution is derived from explicit
                            signals at session time.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pb-6">
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-slate-900">Pricing rules</p>
                        <p className="mt-1 text-xs text-slate-600">
                          Rule &#8594; sessions using rule &#8594; Ledger.
                        </p>
                        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-slate-50">
                              <tr className="border-b border-slate-200">
                                <th className="px-4 py-2 font-semibold text-slate-700">
                                  Rule name
                                </th>
                                <th className="px-4 py-2 font-semibold text-slate-700">Type</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">Rate</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">
                                  Window
                                </th>
                                <th className="px-4 py-2 font-semibold text-slate-700">View</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="border-b border-slate-200">
                                <td className="px-4 py-3 font-medium text-slate-900">
                                  PR-DC-001
                                </td>
                                <td className="px-4 py-3 text-slate-600">Per kWh</td>
                                <td className="px-4 py-3 text-slate-600">$0.46</td>
                                <td className="px-4 py-3 text-slate-600">All</td>
                                <td className="px-4 py-3">
                                  <button
                                    type="button"
                                    onClick={() => openLedger('Rule: PR-DC-001')}
                                    className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                  >
                                    Ledger
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 font-medium text-slate-900">
                                  PR-AC-002
                                </td>
                                <td className="px-4 py-3 text-slate-600">Per kWh</td>
                                <td className="px-4 py-3 text-slate-600">$0.28</td>
                                <td className="px-4 py-3 text-slate-600">All</td>
                                <td className="px-4 py-3">
                                  <button
                                    type="button"
                                    onClick={() => openLedger('Rule: PR-AC-002')}
                                    className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                                  >
                                    Ledger
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                {/* WHY PANEL */}
                {showWhy ? (
                  <div className="border-t border-slate-200 bg-white px-5 py-5">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Why?
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">{whyTitle}</p>
                          <p className="mt-2 text-sm text-slate-600">{whyBody}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Pill tone="neutral">Derived from explicit inputs</Pill>
                            <Pill tone="neutral">No inference</Pill>
                            <Pill tone="neutral">Fail-closed attribution</Pill>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowWhy(false)}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {!mockPage ? (
                  <div className="px-5 py-8">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                      <p className="text-sm font-semibold text-slate-900">Mock content</p>
                      <p className="mt-2 text-sm text-slate-600">
                        Click the left nav to switch views.
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            Interactive walkthrough. Click left nav, tiles, and &quot;View/Explain&quot; to see the
            intended drill paths.
          </p>
        </div>
      </section>

      {/* ──────────────── 5. HOW IT WORKS ──────────────── */}
      <section id="how" className="py-16 md:py-20">
        <SectionHeading
          eyebrow="How it works"
          title="Ingest. Normalize. Reconcile. Explain."
          desc="A four-step pipeline that keeps trust high and operational action fast."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-4">
          <StepCard step="1" title="Ingest">
            Charging sessions from CPOs via OCPI-compatible feeds. SOC and freshness from
            telematics providers. Replay-safe: re-ingesting the same data produces the same
            ledger state.
          </StepCard>

          <StepCard step="2" title="Normalize">
            Sessions become structured ledger rows with vehicle identity, driver attribution,
            energy, cost, AC/DC classification, and explicit reconciliation state.
          </StepCard>

          <StepCard step="3" title="Reconcile">
            Each session is matched against pricing rules, assignment records, and telematics
            signals. Gaps are represented explicitly &mdash; not filled with heuristics.
          </StepCard>

          <StepCard step="4" title="Explain">
            Every number traces to the fields that produced it. The &quot;Why?&quot; panel
            surfaces attribution logic, applied pricing rules, and reconciliation status for any
            session.
          </StepCard>
        </div>
      </section>

      {/* ──────────────── 6. QUESTIONS FLEETCHARGE HELPS ANSWER ──────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <SectionHeading
          eyebrow="Use cases"
          title="Questions FleetCharge helps answer"
          desc="Operational, financial, and technical outcomes from a single source of truth."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
              Operations
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Which vehicles are below SOC threshold right now?</li>
              <li>Which vehicles missed their expected charging window?</li>
              <li>Where is telematics data stale or missing?</li>
              <li>Which sessions have no vehicle attribution?</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
              Finance
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>What is the total charging cost by vehicle, network, or time period?</li>
              <li>Which pricing rule was applied to each session and why?</li>
              <li>Where do CPO invoices diverge from session-level records?</li>
              <li>What is our AC vs. DC cost exposure?</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
              Infrastructure / Charging teams
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>What is depot charger utilization over the last 7 days?</li>
              <li>How many sessions are DC vs. AC across locations?</li>
              <li>Where are unassigned sessions concentrated?</li>
              <li>Which vehicles are consistently charging at external networks?</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
              Integration reviewers
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>What data sources does the system consume?</li>
              <li>How does the system handle replayed or duplicate sessions?</li>
              <li>What happens when telematics data is delayed or missing?</li>
              <li>How is attribution determined &mdash; and when does it fail?</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ──────────────── 7. INTEGRATION CREDIBILITY ──────────────── */}
      <section id="integration" className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Integration"
          title="Built for real charging infrastructure"
          desc="FleetCharge HQ consumes industry-standard data formats and handles the edge cases that production environments produce."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          <Card title="OCPI session ingestion">
            Sessions and CDRs ingested from charge point operators using OCPI-compatible data
            structures. Session boundaries, energy, location, and charging type are preserved
            as-is.
          </Card>

          <Card title="Telematics SOC ingestion">
            Vehicle SOC and freshness timestamps from telematics providers or OEM APIs. Multiple
            SOC sources can be configured per vehicle with explicit authority designation.
          </Card>

          <Card title="Replay-safe handling">
            Re-ingesting the same session data produces the same ledger state. Idempotent
            ingestion prevents duplicate records and ensures consistency across re-syncs.
          </Card>

          <Card title="Explicit reconciliation states">
            Every session carries a visible reconciliation status: complete, partial, or
            unreconciled. The system does not silently mark incomplete data as resolved.
          </Card>

          <Card title="No hidden attribution heuristics">
            Vehicle and driver attribution uses explicit signals only &mdash; assignment records,
            vehicle-bound tokens, or CPO-provided identity fields. No probabilistic matching.
          </Card>

          <Card title="Audit-visible source boundaries">
            Every ledger row carries metadata about its source: external session IDs, ingestion
            timestamps, and applied pricing rule IDs. Source provenance is always visible.
          </Card>
        </div>
      </section>

      {/* ──────────────── 7b. PARTNER ECOSYSTEM ──────────────── */}
      <section id="ecosystem" className="bg-slate-50 py-16 md:py-20">
        <SectionHeading
          eyebrow="Partner ecosystem"
          title="An integration layer across the EV ecosystem"
          desc="FleetCharge HQ connects charging networks, vehicle data providers, fleet systems, and energy stakeholders into a single charging ledger. Built for interoperability &mdash; not replacement."
        />

        {/* Ecosystem diagram */}
        <div className="mx-auto mt-12 max-w-4xl px-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
              <p className="text-sm font-semibold text-slate-900">Integration architecture</p>
              <p className="mt-1 text-xs text-slate-600">
                FleetCharge HQ sits between existing systems. Data flows in, a unified ledger flows out.
              </p>
            </div>

            <div className="px-6 py-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
                {/* Left sources */}
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Charging Networks</p>
                    <p className="mt-1 text-xs font-semibold text-slate-700">CPO Sessions</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Vehicle Data</p>
                    <p className="mt-1 text-xs font-semibold text-slate-700">OEM / Telematics</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Energy</p>
                    <p className="mt-1 text-xs font-semibold text-slate-700">Settlement Systems</p>
                  </div>
                </div>

                {/* Arrow in */}
                <div className="hidden items-center justify-center md:flex">
                  <span className="text-lg text-slate-300">&#8594;</span>
                </div>

                {/* Center: FleetCharge Ledger */}
                <div className="flex items-center justify-center">
                  <div className="w-full rounded-2xl border-2 border-slate-900 bg-slate-900 p-5 text-center shadow-lg">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">FleetCharge HQ</p>
                    <p className="mt-1 text-base font-bold text-white">Charging Event Ledger</p>
                    <p className="mt-2 text-xs text-slate-300">
                      Deterministic &bull; Traceable &bull; Audit-ready
                    </p>
                  </div>
                </div>

                {/* Arrow out */}
                <div className="hidden items-center justify-center md:flex">
                  <span className="text-lg text-slate-300">&#8594;</span>
                </div>

                {/* Right consumers */}
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Operations</p>
                    <p className="mt-1 text-xs font-semibold text-slate-700">Fleet Platforms</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Finance</p>
                    <p className="mt-1 text-xs font-semibold text-slate-700">Cost Reporting</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Infrastructure</p>
                    <p className="mt-1 text-xs font-semibold text-slate-700">Depot Planning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ecosystem category cards */}
        <div className="mx-auto mt-12 max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Charging Networks */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                Charging Networks (CPOs)
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Session ingestion via OCPI and related protocols from public and depot charging
                networks.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['ChargePoint', 'Electrify America', 'EVgo', 'FLO', 'Shell Recharge'].map(
                  (name) => (
                    <span
                      key={name}
                      className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      {name}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Vehicle Data Providers */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                Vehicle Data Providers
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Vehicle SOC, telemetry, and identity data from telematics platforms and OEM APIs.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Geotab', 'Samsara', 'Verizon Connect', 'Fleet Complete', 'OEM APIs'].map(
                  (name) => (
                    <span
                      key={name}
                      className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      {name}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Fleet Systems */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                Fleet Systems
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Fleet operations, dispatch, and routing platforms that consume charging visibility
                data.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'Fleet management software',
                  'Routing systems',
                  'Operations platforms',
                ].map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Charging Infrastructure */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                Charging Infrastructure
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Depot charging hardware vendors and charging management platforms providing session
                data.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Charging hardware vendors', 'Charging management platforms'].map(
                  (name) => (
                    <span
                      key={name}
                      className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      {name}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Energy & Settlement */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                Energy &amp; Settlement Ecosystem
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Energy systems, roaming hubs, and financial settlement visibility across charging
                networks.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'Utilities',
                  'Roaming hubs',
                  'Hubject',
                  'Gireve',
                  'Fleet fuel card providers',
                ].map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Logos and names shown as representative ecosystem participants. They do not imply formal partnership agreements.
          </p>
        </div>

        {/* Integration CTA */}
        <div className="mx-auto mt-12 max-w-4xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
              <div>
                <p className="text-base font-semibold text-slate-900">
                  Interested in integrating with FleetCharge?
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  We work with charging networks, telematics providers, and fleet platforms. If your system produces or consumes charging data, let&apos;s talk.
                </p>
              </div>
              <a
                href="#early-access"
                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Partner With FleetCharge
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 8. WHAT FLEETCHARGE DOES NOT DO ──────────────── */}
      <section id="boundaries" className="bg-slate-900 py-16 md:py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            light
            eyebrow="Trust through boundaries"
            title="What FleetCharge does not do"
            desc="A credible system of record requires clear scope. FleetCharge HQ is deliberate about what it excludes."
          />

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl bg-white/7 p-7 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white">What you get</p>
              <ul className="mt-5 space-y-3">
                <CheckItem>
                  Deterministic charging ledger with structured, traceable records
                </CheckItem>
                <CheckItem>
                  8:00 AM operational check &mdash; vehicles needing attention today
                </CheckItem>
                <CheckItem>
                  Exception-first investigation flow with drill-through to evidence
                </CheckItem>
                <CheckItem>
                  Explicit pricing rules with applied-rule metadata on every session
                </CheckItem>
                <CheckItem>
                  AC/DC visibility grounded in CPO-reported session data
                </CheckItem>
                <CheckItem>
                  Invoice variance analysis against session-level records
                </CheckItem>
                <CheckItem>Exportable records for audits and reporting (CSV/PDF)</CheckItem>
              </ul>
            </div>

            <div className="rounded-2xl bg-white/7 p-7 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white">What it is not</p>
              <ul className="mt-5 space-y-3">
                <CheckItem>Does not control chargers or manage CPMS functionality</CheckItem>
                <CheckItem>Does not control vehicles or send dispatch commands</CheckItem>
                <CheckItem>Does not replace telematics providers</CheckItem>
                <CheckItem>
                  Does not optimize charging schedules or predict demand
                </CheckItem>
                <CheckItem>Does not replace CPO settlement or invoice systems</CheckItem>
                <CheckItem>
                  Does not invent missing identity or cost data &mdash; gaps are shown as gaps
                </CheckItem>
              </ul>
              <p className="mt-5 text-sm text-slate-300">
                When data is missing or delayed, the system surfaces the gap. It does not fill it
                with heuristics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 9. TECHNICAL ARCHITECTURE / DATA LINEAGE ──────────────── */}
      <section className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Architecture"
          title="Built like infrastructure"
          desc="Ledger-backed architecture designed for traceability, not just display."
        />

        <div className="mx-auto mt-12 max-w-6xl px-6">
          {/* Architecture diagram block */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
            <div className="border-b border-slate-200 bg-white px-6 py-4">
              <p className="text-sm font-semibold text-slate-900">System overview</p>
              <p className="mt-1 text-xs text-slate-600">
                Data flows left to right. Every output traces back to source records.
              </p>
            </div>

            <div className="px-6 py-8">
              <div className="grid gap-4 md:grid-cols-4">
                {/* Sources */}
                <div className="rounded-xl border border-slate-300 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Sources
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      CPO sessions (OCPI)
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      Telematics SOC
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      Assignment records
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      Pricing rules
                    </div>
                  </div>
                </div>

                {/* Ingestion */}
                <div className="rounded-xl border border-slate-300 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Ingestion layer
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      Replay-safe ingestion
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      Session normalization
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      Deterministic cost engine
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      Attribution resolver
                    </div>
                  </div>
                </div>

                {/* Storage */}
                <div className="rounded-xl border border-slate-300 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Storage
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      PostgreSQL
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      Charging event ledger
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      Session mutation history
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      Audit log
                    </div>
                  </div>
                </div>

                {/* Presentation */}
                <div className="rounded-xl border border-slate-300 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Presentation
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      React frontend
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      Evidence-linked drill-through
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      Exportable records
                    </div>
                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
                      &quot;Why?&quot; explanations
                    </div>
                  </div>
                </div>
              </div>

              {/* Flow arrows */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="text-xs font-medium text-slate-500">
                  Sources &#8594; Ingestion &#8594; Ledger &#8594; Evidence-linked UI
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Node.js backend</p>
              <p className="mt-2 text-sm text-slate-600">
                Modular services for ingestion, cost computation, reconciliation, and exception
                detection. Each service operates on explicit inputs with deterministic outputs.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">PostgreSQL storage</p>
              <p className="mt-2 text-sm text-slate-600">
                Append-only ledger with session mutation history. Historical immutability enforced
                at the storage layer. No silent retroactive rewriting.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Data lineage transparency</p>
              <p className="mt-2 text-sm text-slate-600">
                Every aggregate and summary drills through to the ledger rows that produced it.
                External session IDs, pricing rule IDs, and source timestamps are always visible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 10. FAQ ──────────────── */}
      <section id="faq" className="bg-slate-50 py-16 md:py-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          desc="Short answers for operations, finance, and integration teams."
        />

        <div className="mx-auto mt-12 max-w-4xl space-y-4 px-6">
          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              Do you control chargers or vehicles?
              <span className="float-right text-slate-400 transition group-open:rotate-180">
                &#8964;
              </span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              No. FleetCharge HQ is read-only. It ingests charging and telematics data and produces
              a defensible system of record. It does not send commands to chargers, vehicles, or CPO
              networks.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              Is this an optimization platform?
              <span className="float-right text-slate-400 transition group-open:rotate-180">
                &#8964;
              </span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              No. FleetCharge HQ does not predict, optimize, or schedule. It replaces manual
              reconciliation with traceable, session-level evidence and a deterministic cost engine.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              What is the &quot;system of record&quot; in practice?
              <span className="float-right text-slate-400 transition group-open:rotate-180">
                &#8964;
              </span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              It means every summary, aggregate, and total can be traced back to the ledger sessions
              that created it &mdash; with explicit pricing logic, attribution evidence, and visible
              gaps when data is missing or delayed.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              What happens when data is incomplete or delayed?
              <span className="float-right text-slate-400 transition group-open:rotate-180">
                &#8964;
              </span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              The system surfaces the gap explicitly. Stale telematics data is flagged with the last
              known timestamp. Missing attribution produces an &quot;unassigned&quot; status. Partial
              reconciliation is marked as partial. FleetCharge HQ does not fill gaps with heuristics
              or estimates.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              Will this always match my CPO invoices?
              <span className="float-right text-slate-400 transition group-open:rotate-180">
                &#8964;
              </span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              FleetCharge HQ does not replace invoices. It provides a session-level record with
              explicit pricing logic so you can identify where invoice totals diverge from
              session-level evidence &mdash; and investigate the variance.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              How does attribution work?
              <span className="float-right text-slate-400 transition group-open:rotate-180">
                &#8964;
              </span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              Attribution uses explicit signals only: driver-to-vehicle assignments at session time,
              vehicle-bound charging tokens, or CPO-provided vehicle identity fields. If no explicit
              signal exists, the session remains unassigned. No probabilistic matching or inference.
            </p>
          </details>
        </div>
      </section>

      {/* ──────────────── 11. FINAL CTA ──────────────── */}
      <section className="border-t border-slate-200 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl bg-slate-900 p-8 shadow-lg md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  Replace manual charging reconciliation with a defensible system of record.
                </h2>
                <p className="mt-3 text-base text-slate-300">
                  FleetCharge HQ is onboarding EV fleets, charging networks, and integration
                  partners who need traceable charging data they can defend.
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  Currently accepting early access requests.
                </p>
              </div>

              <div className="flex flex-col gap-3 md:items-end">
                <a
                  href="#early-access"
                  className="inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 md:w-auto"
                >
                  Request Early Access
                </a>
                <a
                  href="#walkthrough"
                  className="inline-flex w-full items-center justify-center rounded-md border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 md:w-auto"
                >
                  See Product Walkthrough
                </a>
              </div>
            </div>
          </div>

          <footer className="mt-10 flex flex-col items-center justify-between gap-3 text-center text-xs text-slate-500 md:flex-row md:text-left">
            <p>&copy; {new Date().getFullYear()} FleetCharge HQ. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a className="hover:text-slate-700" href="#ledger-section">
                Ledger
              </a>
              <a className="hover:text-slate-700" href="#walkthrough">
                Product
              </a>
              <a className="hover:text-slate-700" href="#how">
                How it works
              </a>
              <a className="hover:text-slate-700" href="#integration">
                Integration
              </a>
              <a className="hover:text-slate-700" href="#ecosystem">
                Ecosystem
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
