-- Run this in Supabase SQL editor to create the table used by the app
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age integer,
  phone text not null,
  email text,
  service text not null,
  message text,
  created_at timestamptz default now()
);
