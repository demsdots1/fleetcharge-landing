// app/page.tsx
'use client'

import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

const PILOT_ENDPOINT = '/api/pilot'

function Button({
  href,
  children,
  variant = 'primary',
}: {
  href: string
  children: ReactNode
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
  children: ReactNode
  icon?: ReactNode
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

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700">
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

function SparkBar({ h }: { h: number }) {
  const height = Math.max(6, Math.min(56, h))
  return (
    <div className="flex h-16 items-end">
      <div className="w-2.5 rounded-sm bg-slate-300" style={{ height: `${height}px` }} />
    </div>
  )
}

function PilotForm() {
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
          <h3 className="text-lg font-bold text-slate-900">Request Pilot Access</h3>
          <p className="mt-2 text-sm text-slate-600">
            We start with explicit inputs. If something can’t be proven, it stays explicitly unassigned.
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
          {status === 'submitting' ? 'Submitting…' : 'Request Pilot Access'}
        </button>

        {status === 'done' ? (
          <div className="mt-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 ring-1 ring-emerald-200">
            Request received. We’ll reply shortly.
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="mt-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-800 ring-1 ring-rose-200">
            Something went wrong. Please try again.
          </div>
        ) : null}

        <p className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-500">
          <span aria-hidden="true">🔒</span>
          Secure form • No spam • Pilot access only
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
  // Mock-app state (only affects the “8:00 AM View” demo screen)
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
      {/* TOP NAV */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          {/* LEFT: Logo */}
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="FleetCharge HQ" className="h-16 w-16" />
            <div className="leading-tight">
              <p className="text-lg font-semibold text-slate-900">FleetCharge HQ</p>
              <p className="text-sm text-slate-500">Fleet Charging System of Record</p>
            </div>
          </div>

          {/* CENTER NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#morning" className="text-base font-medium text-slate-600 hover:text-slate-900">
              8:00 AM View
            </a>
            <a href="#why" className="text-base font-medium text-slate-600 hover:text-slate-900">
              Why
            </a>
            <a href="#how" className="text-base font-medium text-slate-600 hover:text-slate-900">
              How it Works
            </a>
            <a href="#different" className="text-base font-medium text-slate-600 hover:text-slate-900">
              Different
            </a>
            <a href="#faq" className="text-base font-medium text-slate-600 hover:text-slate-900">
              FAQ
            </a>
          </nav>

          {/* RIGHT: CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#pilot"
              className="hidden rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 md:inline-flex"
            >
              Request Pilot Access
            </a>

            <a
              href="#morning"
              className="inline-flex rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              See 8:00 AM View
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
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            {/* LEFT COPY */}
            <div className="max-w-xl">
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200 ring-1 ring-white/15">
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

              <h1 className="mt-7 text-4xl font-bold tracking-tight text-white md:text-5xl">
                A charging system of record you can defend at 8:00 AM.
              </h1>

              <p className="mt-6 text-lg leading-7 text-slate-200 md:text-xl">
                FleetCharge HQ turns CPO sessions, vehicle SOC/freshness, and assignment records into one
                auditable charging ledger with explicit pricing rules and no silent fixes. Every tile and
                chart drills into the exact sessions behind it, so ops can resolve exceptions and finance can
                trust the totals.
              </p>

              <p className="mt-4 text-sm text-slate-300">
                <span className="font-semibold text-white">Trust boundary:</span> If attribution or cost can’t be
                proven from explicit inputs, the session stays explicitly unassigned.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white">
                    ✓
                  </span>
                  <span>Operational check in minutes — low SOC, missed charging, stale telematics, unassigned sessions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white">
                    ✓
                  </span>
                  <span>Costs tied to explicit pricing rules and traceable sessions — not spreadsheet reconciliation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white">
                    ✓
                  </span>
                  <span>Click from summaries to ledger evidence — so ops and finance align on the same record.</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <GhostLink href="#morning">See the 8:00 AM view</GhostLink>
                <span className="text-sm text-slate-300">
                  Built for the daily question:{' '}
                  <span className="text-white font-semibold">“Are we good today?”</span>
                </span>
              </div>
            </div>

            {/* RIGHT FORM CARD */}
            <div id="pilot" className="lg:justify-self-end">
              <PilotForm />
            </div>
          </div>

          {/* Inputs we consume strip */}
          <div className="mt-12 rounded-2xl bg-white/7 p-6 ring-1 ring-white/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              What we consume (read-only)
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-white">CPO charging sessions</p>
                <p className="mt-1 text-sm text-slate-200">OCPI-like Sessions/CDRs</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-white">Vehicle SOC + freshness</p>
                <p className="mt-1 text-sm text-slate-200">Telematics or OEM API</p>
              </div>
              <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-white">Driver↔vehicle assignments</p>
                <p className="mt-1 text-sm text-slate-200">Explicit, time-bound</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-200">
              We don’t control vehicles or chargers. We record, reconcile, and prove.
            </p>
          </div>
        </div>
      </section>

      {/* 8:00 AM SCREEN MOCK */}
      <section id="morning" className="bg-slate-50 py-16 md:py-20">
        <SectionHeading
          eyebrow="Proof"
          title="What you see at 8:00 AM"
          desc="A fast operational check then one click into the ledger evidence."
        />

        <div className="mx-auto mt-12 max-w-6xl px-6">
          {/* Click-path callout (credibility + flow) */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-700">
              In-product: click a tile → filtered Operations → pre-filtered Ledger view →{' '}
              <span className="font-semibold">“Why?”</span> explains attribution + reconciliation from the underlying fields.
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
              <div className="text-xs font-semibold text-slate-500">Demo</div>
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
                          active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white',
                        ].join(' ')}
                      >
                        <span className="font-semibold">{item.label}</span>
                        {active ? <span className="text-xs text-slate-300">Active</span> : null}
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Dashboard</p>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">Are we good today?</h3>
                        <p className="mt-1 text-sm text-slate-600">
                          Immediate operational status. <span className="font-semibold">No inference.</span>
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

                    {/* Status tiles (click → filtered Operations) */}
                    <div className="grid gap-4 px-5 py-5 md:grid-cols-4">
                      <button
                        type="button"
                        onClick={() => openOperations('low_soc', 'Low SOC')}
                        className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Low SOC</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">4</p>
                        <p className="mt-2 text-xs text-slate-600">Vehicles below threshold</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => openOperations('missed', 'Missed charging')}
                        className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Missed charging</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">3</p>
                        <p className="mt-2 text-xs text-slate-600">No charge in window</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => openOperations('stale', 'Stale telematics')}
                        className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Stale telematics</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">2</p>
                        <p className="mt-2 text-xs text-slate-600">SOC freshness risk</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => openOperations('unassigned', 'Unassigned')}
                        className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Unassigned</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">1</p>
                        <p className="mt-2 text-xs text-slate-600">Explicitly unassigned</p>
                      </button>
                    </div>

                    {/* 24h snapshot */}
                    <div className="px-5">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <p className="text-sm font-semibold text-slate-900">24h snapshot</p>
                          <p className="text-xs text-slate-600">All aggregates traceable to sessions.</p>
                        </div>

                        <div className="mt-4 grid gap-4 md:grid-cols-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sessions</p>
                            <p className="mt-1 text-lg font-bold text-slate-900">22</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">kWh</p>
                            <p className="mt-1 text-lg font-bold text-slate-900">312.4</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cost</p>
                            <p className="mt-1 text-lg font-bold text-slate-900">$148.90</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">DC %</p>
                            <p className="mt-1 text-lg font-bold text-slate-900">41%</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Vehicles needing attention */}
                    <div className="px-5 py-5">
                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Vehicles needing attention</p>
                            <p className="mt-1 text-xs text-slate-600">Row → Ledger filtered to vehicle.</p>
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
                                <th className="px-5 py-3 font-semibold text-slate-700">Last charge</th>
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
                                <td className="px-5 py-4 text-slate-600">—</td>
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
                                <td className="px-5 py-4 text-slate-600">—</td>
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
                            Trust cues: <span className="font-semibold">All metrics derived from ledger rows.</span> No inference.
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Operations</p>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">What needs attention right now?</h3>
                        <p className="mt-1 text-sm text-slate-600">Exception console. Deterministic. No scoring.</p>
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

                    {/* Filter bar */}
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

                    {/* Tabs */}
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

                    {/* Combined issues / Vehicles needing attention */}
                    {opsTab !== 'unassigned' ? (
                      <div className="px-5 py-5">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">Vehicles needing attention</p>
                              <p className="mt-1 text-xs text-slate-600">Row → Ledger filtered. Explain → session narrative.</p>
                            </div>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                              Tab: {opsFilter}
                            </span>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                              <thead className="bg-white">
                                <tr className="border-b border-slate-200">
                                  <th className="px-5 py-3 font-semibold text-slate-700">Vehicle</th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">Driver</th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">Issue</th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">Last charge</th>
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
                                            'Low SOC derived from SOC authority + freshness. “No recent charge” derived from session timestamps. All evidence links to ledger rows. No inference.'
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
                                  <td className="px-5 py-4 font-medium text-slate-900">Truck 3</td>
                                  <td className="px-5 py-4 text-slate-600">Lee</td>
                                  <td className="px-5 py-4">
                                    <Pill tone="warn">Missed charging</Pill>
                                  </td>
                                  <td className="px-5 py-4 text-slate-600">30h ago (DC)</td>
                                  <td className="px-5 py-4 text-slate-600">—</td>
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
                                  <td className="px-5 py-4 text-slate-600">—</td>
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
                              Trust cue: <span className="font-semibold">Assignment changes do not retroactively modify sessions.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Unassigned Sessions tab
                      <div className="px-5 py-5">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">Unassigned sessions</p>
                              <p className="mt-1 text-xs text-slate-600">Explicitly unassigned until proven.</p>
                            </div>
                            <Pill tone="neutral">Fail-closed</Pill>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                              <thead className="bg-white">
                                <tr className="border-b border-slate-200">
                                  <th className="px-5 py-3 font-semibold text-slate-700">Start</th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">Network</th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">kWh</th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">Cost</th>
                                  <th className="px-5 py-3 font-semibold text-slate-700">Reconciliation</th>
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
                              Trust cue: historical sessions are immutable. Attribution is evidence-driven (not retroactive guessing).
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Ledger</p>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">Show me the exact session rows</h3>
                        <p className="mt-1 text-sm text-slate-600">Forensic evidence. Expand rows. Explain shows “Why?”.</p>
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

                    {/* Filter bar */}
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

                    {/* Session table */}
                    <div className="px-5 py-5">
                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Sessions</p>
                            <p className="mt-1 text-xs text-slate-600">Expand row → pricing metadata. Explain → “Why?” panel.</p>
                          </div>
                          <Pill tone="neutral">Audit-grade</Pill>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-white">
                              <tr className="border-b border-slate-200">
                                <th className="px-5 py-3 font-semibold text-slate-700">Start</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Vehicle</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Driver</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Type</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">AC/DC</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Duration</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">kWh</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Cost</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Reconciliation</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Attribution</th>
                                <th className="px-5 py-3 font-semibold text-slate-700">Why?</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="border-b border-slate-200 align-top">
                                <td className="px-5 py-4 text-slate-600">2026-02-18 21:12</td>
                                <td className="px-5 py-4 text-slate-900 font-medium">Van 12</td>
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
                                <td className="px-5 py-4 text-slate-900 font-medium">—</td>
                                <td className="px-5 py-4 text-slate-600">—</td>
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

                        {/* Expandable row detail mock */}
                        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Expandable row detail (mock)</p>
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Analytics</p>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">What changed this week?</h3>
                        <p className="mt-1 text-sm text-slate-600">Weekly review + finance defensibility.</p>
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

                    {/* KPI strip */}
                    <div className="grid gap-4 px-5 py-5 md:grid-cols-4">
                      {[
                        { label: 'Cost', value: '$1,482' },
                        { label: 'kWh', value: '3,214' },
                        { label: 'Sessions', value: '198' },
                        { label: 'DC %', value: '37%' },
                      ].map((k) => (
                        <div key={k.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{k.label}</p>
                          <p className="mt-2 text-2xl font-bold text-slate-900">{k.value}</p>
                          <p className="mt-2 text-xs text-slate-600">Click-through to ledger (mock).</p>
                        </div>
                      ))}
                    </div>

                    {/* Cost by charging type + tables */}
                    <div className="grid gap-4 px-5 pb-6 lg:grid-cols-[1fr_1fr]">
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Cost by charging type</p>
                            <p className="mt-1 text-xs text-slate-600">Mock. Any slice drills to ledger.</p>
                          </div>
                          <Pill tone="neutral">kWh + cost</Pill>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => openLedger('Slice: DC sessions')}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left hover:bg-slate-100"
                          >
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">DC</p>
                            <p className="mt-1 text-sm font-semibold text-slate-900">$820</p>
                            <p className="mt-1 text-xs text-slate-600">1,120 kWh</p>
                          </button>
                          <button
                            type="button"
                            onClick={() => openLedger('Slice: AC sessions')}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left hover:bg-slate-100"
                          >
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">AC</p>
                            <p className="mt-1 text-sm font-semibold text-slate-900">$662</p>
                            <p className="mt-1 text-xs text-slate-600">2,094 kWh</p>
                          </button>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-slate-900">Cost by vehicle (Top 10)</p>
                        <p className="mt-1 text-xs text-slate-600">Row → Ledger filtered to vehicle.</p>
                        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-slate-50">
                              <tr className="border-b border-slate-200">
                                <th className="px-4 py-2 font-semibold text-slate-700">Vehicle</th>
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
                                <tr key={r.v} className="border-b border-slate-200 last:border-0">
                                  <td className="px-4 py-3 font-medium text-slate-900">{r.v}</td>
                                  <td className="px-4 py-3 text-slate-600">{r.c}</td>
                                  <td className="px-4 py-3 text-slate-600">{r.k}</td>
                                  <td className="px-4 py-3">
                                    <button
                                      type="button"
                                      onClick={() => openLedger(`Vehicle: ${r.v} (weekly slice)`)}
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
                        <p className="mt-2 text-sm text-slate-600">All aggregates are traceable to sessions. No hidden adjustments.</p>
                      </div>
                    </div>
                  </>
                ) : null}

                {/* FLEET SETUP */}
                {mockPage === 'setup' ? (
                  <>
                    <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fleet setup</p>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">Administrative configuration</h3>
                        <p className="mt-1 text-sm text-slate-600">Vehicles, drivers, assignments, pricing rules.</p>
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
                        <p className="mt-1 text-xs text-slate-600">Vehicle → recent sessions → Ledger.</p>
                        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-slate-50">
                              <tr className="border-b border-slate-200">
                                <th className="px-4 py-2 font-semibold text-slate-700">Name</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">Telematics key</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">Last SOC</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">View</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {[
                                { n: 'Van 12', k: 'geo_001', soc: '18%' },
                                { n: 'Truck 3', k: 'geo_014', soc: '—' },
                                { n: 'Van 7', k: 'oem_223', soc: 'Unknown' },
                              ].map((r) => (
                                <tr key={r.n} className="border-b border-slate-200 last:border-0">
                                  <td className="px-4 py-3 font-medium text-slate-900">{r.n}</td>
                                  <td className="px-4 py-3 text-slate-600">{r.k}</td>
                                  <td className="px-4 py-3 text-slate-600">{r.soc}</td>
                                  <td className="px-4 py-3">
                                    <button
                                      type="button"
                                      onClick={() => openLedger(`Vehicle: ${r.n} (recent sessions)`)}
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
                        <p className="mt-1 text-xs text-slate-600">Explicit, time-bound. Changes don’t rewrite history.</p>
                        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-slate-50">
                              <tr className="border-b border-slate-200">
                                <th className="px-4 py-2 font-semibold text-slate-700">Driver</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">Vehicle</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">Start</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">End</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="border-b border-slate-200">
                                <td className="px-4 py-3 font-medium text-slate-900">Smith</td>
                                <td className="px-4 py-3 text-slate-600">Van 12</td>
                                <td className="px-4 py-3 text-slate-600">2026-02-01</td>
                                <td className="px-4 py-3 text-slate-600">—</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 font-medium text-slate-900">Lee</td>
                                <td className="px-4 py-3 text-slate-600">Truck 3</td>
                                <td className="px-4 py-3 text-slate-600">2026-02-10</td>
                                <td className="px-4 py-3 text-slate-600">—</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Trust cue</p>
                          <p className="mt-2 text-sm text-slate-600">
                            Historical sessions are immutable. Attribution is derived from explicit signals at session time.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pb-6">
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-slate-900">Pricing rules</p>
                        <p className="mt-1 text-xs text-slate-600">Rule → sessions using rule → Ledger.</p>
                        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-slate-50">
                              <tr className="border-b border-slate-200">
                                <th className="px-4 py-2 font-semibold text-slate-700">Rule name</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">Type</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">Rate</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">Window</th>
                                <th className="px-4 py-2 font-semibold text-slate-700">View</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              <tr className="border-b border-slate-200">
                                <td className="px-4 py-3 font-medium text-slate-900">PR-DC-001</td>
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
                                <td className="px-4 py-3 font-medium text-slate-900">PR-AC-002</td>
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

                {/* WHY PANEL (right side overlay inside main area) */}
                {showWhy ? (
                  <div className="border-t border-slate-200 bg-white px-5 py-5">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why?</p>
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

                {/* If no page selected (shouldn't happen), fallback */}
                {!mockPage ? (
                  <div className="px-5 py-8">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                      <p className="text-sm font-semibold text-slate-900">Mock content</p>
                      <p className="mt-2 text-sm text-slate-600">Click the left nav to switch views.</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            This is an interactive mock. Click left nav, tiles, and “View/Explain” to see the intended drill paths.
          </p>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Why this exists"
          title="Fleet charging data is fragmented."
          desc="Operations teams end up reconciling CPO sessions, telematics feeds, assignments, and pricing logic by hand. FleetCharge HQ replaces that workflow with a defensible system of record."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          <Card title="Spreadsheets & defensive reconciliation">
            Manual work just to understand what happened and to explain it confidently.
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
                  AC/DC mix, cost by vehicle/network, exposure breakdown not daily, but essential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILOT READINESS: What you need to start */}
      <section className="bg-white py-16 md:py-20">
        <SectionHeading
          eyebrow="Pilot readiness"
          title="What we need to onboard a fleet"
          desc="We start with explicit inputs. If a field isn’t available, we show the gap. We don’t guess."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          <Card title="Vehicle list + SOC source">
            Provide vehicles (name + VIN or telematics key) and choose SOC authority: OEM API or telematics. We use SOC +
            freshness for readiness only.
          </Card>

          <Card title="One charging session feed">
            Provide an OCPI-like Sessions/CDRs feed (or export/API). We ingest session boundaries, kWh, charging type
            (AC/DC), network/location.
          </Card>

          <Card title="Attribution signals (optional, explicit)">
            If your CPO data doesn’t carry vehicle identity, sessions remain unassigned unless you provide an explicit
            mapping policy (e.g., vehicle-bound token or strict driver↔vehicle assignments).
          </Card>
        </div>

        <div className="mx-auto mt-6 max-w-6xl px-6">
          <p className="text-sm text-slate-600">
            If you can’t provide a mapping signal, that’s normal. Unassigned is a valid outcome.
          </p>
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section className="bg-slate-50 py-16 md:py-20">
        <SectionHeading
          eyebrow="What it does"
          title="A charging ledger you can defend"
          desc="FleetCharge HQ creates one structured record for every charging event with explicit cost logic and audit-ready metadata."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          <Card title="A ledger row you can defend">
            Each session is stored as a structured record with vehicle identity, driver attribution (when available),
            energy, cost, charging type (AC/DC), and reconciliation status.
          </Card>

          <Card title="No silent fixes. Every number is traceable.">
            Ambiguity is represented, not hidden. If telematics is stale or attribution fails closed, you see it
            immediately.
          </Card>

          <Card title="Pricing rules are explicit">
            Costs are calculated using explicit pricing rules and the applied rule metadata is attached to the session
            for traceability.
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
              Built for operators.
            </h2>
            <p className="mt-3 text-base text-slate-200">
              Operators don’t need more charts. They need fewer surprises and proof behind every number.
            </p>
            <p className="mt-3 text-base text-slate-200">
              FleetCharge HQ focuses on a defensible charging record. No inference. No optimization. No control.
            </p>
            <p className="mt-3 text-base text-slate-200">
              When data is missing or delayed, we show it. We don’t fill gaps with heuristics.
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
                No silent fixes. Every number is traceable, even when data is missing or delayed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-20">
        <SectionHeading eyebrow="FAQ" title="Common questions" desc="Short answers, operator-first." />

        <div className="mx-auto mt-12 max-w-4xl space-y-4 px-6">
          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              Do you control chargers or vehicles?
              <span className="float-right text-slate-400 transition group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              No. FleetCharge HQ is read-only. It ingests charging and telematics data and produces a defensible system
              of record.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              Is this an optimization platform?
              <span className="float-right text-slate-400 transition group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              No. We don’t predict or optimize. We replace manual reconciliation with traceable, session-level evidence.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              What is the “system of record” in practice?
              <span className="float-right text-slate-400 transition group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              It means summaries and totals can be traced back to the ledger sessions that created them with explicit
              pricing logic and visible gaps when data is missing or delayed.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">
              Will this always match my invoices?
              <span className="float-right text-slate-400 transition group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">
              FleetCharge HQ doesn’t replace invoices. It replaces manual reconciliation by showing a defensible,
              session-level record with explicit pricing logic and visible gaps when data is missing or delayed.
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
                  If you manage an EV fleet and want operational confidence in charging cost, usage, and readiness —
                  let’s talk.
                </p>
                <p className="mt-3 text-sm text-slate-500">Currently onboarding pilot fleets.</p>
              </div>

              <div className="flex flex-col gap-3 md:items-end">
                <a
                  href="#pilot"
                  className="inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 md:w-auto"
                >
                  Request Pilot Access
                </a>
                <a
                  href="#morning"
                  className="inline-flex w-full items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 md:w-auto"
                >
                  See 8:00 AM View
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