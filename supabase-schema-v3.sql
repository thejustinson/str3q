-- Phase 3 Database Updates: Frequency & Global Streaks

-- 1. Add frequency column to activities
alter table activities 
add column frequency text default 'daily' check (frequency in ('daily', 'today'));

-- 2. Add global streak mechanics to profiles
alter table profiles 
add column global_streak integer default 0,
add column last_active_date date;

-- 3. Explicitly allow users to read/insert completions (if not set properly before)
drop policy if exists "Users can manage their own completions." on completions;
create policy "Users can manage their own completions."
  on completions for all
  using ( auth.uid() = user_id );