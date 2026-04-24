-- Phase 2 Database Updates

-- 1. Create Completions table
create table completions (
  id uuid default gen_random_uuid() primary key,
  activity_id uuid not null references activities(id) on delete cascade,
  user_id uuid references auth.users not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  note text
);

alter table completions enable row level security;

create policy "Users can manage their own completions."
  on completions for all
  using ( auth.uid() = user_id );

-- 2. Create Friendships table
create table friendships (
  id uuid default gen_random_uuid() primary key,
  user_a_id uuid references auth.users not null,
  user_b_id uuid references auth.users not null,
  status text check (status in ('pending', 'active')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_a_id, user_b_id)
);

alter table friendships enable row level security;

-- A friendship is visible if the user is either user A or user B
create policy "Users can view friendships they are part of."
  on friendships for select
  using ( auth.uid() = user_a_id OR auth.uid() = user_b_id );

create policy "Users can insert friendships they initiate."
  on friendships for insert
  with check ( auth.uid() = user_a_id );

create policy "Users can update friendships they are part of."
  on friendships for update
  using ( auth.uid() = user_a_id OR auth.uid() = user_b_id );
