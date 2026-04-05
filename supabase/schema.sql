-- FleetCharge HQ — early access leads table
-- Run this in the Supabase SQL editor.

create table if not exists public.early_access_leads (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  company     text,
  role        text,
  fleet_size  text,
  ev_share    text,
  message     text
);

-- Index for querying by most recent
create index if not exists early_access_leads_created_at_idx
  on public.early_access_leads (created_at desc);

-- Enable Row Level Security.
-- The API route uses the service-role key, which bypasses RLS.
-- With RLS on and no permissive policies, the anon/public key cannot
-- read or write this table from the browser.
alter table public.early_access_leads enable row level security;
