-- Supabase SQL Schema for IT Board Recruitment Portal

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create applications table
create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  roll_number text not null,
  college_email text not null,
  personal_email text,
  phone text not null,
  year text not null check (year in ('Second Year', 'Third Year')),
  branch text not null check (branch in ('CSE', 'CSM', 'CSD', 'ECE', 'EEE/MECH/CIVIL')),
  cgpa text not null,
  backlogs boolean not null default false,
  backlog_subjects text,
  attendance text not null,
  club text not null check (club in ('League of Coders', 'Web Development Club', 'AI Minds', 'Central Board')),
  role text not null,
  github text,
  linkedin text,
  portfolio text,
  resume_url text not null,
  answers jsonb not null default '{}'::jsonb,
  status text not null default 'Pending' check (status in ('Pending', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected')),
  notes text
);

-- Enable Row Level Security (RLS)
alter table applications enable row level security;

-- Create policy to allow anonymous inserts (for the public application form)
create policy "Allow anonymous inserts" on applications
  for insert
  to anon
  with check (true);

-- Create policy to allow authenticated users (admins) to read all records
create policy "Allow authenticated reads" on applications
  for select
  to authenticated
  using (true);

-- Create policy to allow authenticated users (admins) to update records
create policy "Allow authenticated updates" on applications
  for update
  to authenticated
  using (true);

-- Create policy to allow authenticated users (admins) to delete records
create policy "Allow authenticated deletes" on applications
  for delete
  to authenticated
  using (true);

-- Create resumes storage bucket
insert into storage.buckets (id, name, public) 
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

-- Set up storage policies
-- Allow anonymous uploads to the resumes bucket
create policy "Allow anonymous resume uploads" on storage.objects
  for insert
  to anon
  with check (bucket_id = 'resumes');

-- Allow authenticated users to view resumes
create policy "Allow authenticated resume views" on storage.objects
  for select
  to authenticated
  using (bucket_id = 'resumes');

-- Allow authenticated users to delete resumes
create policy "Allow authenticated resume deletes" on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'resumes');
