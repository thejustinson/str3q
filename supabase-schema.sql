-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  display_name text,
  avatar_url text,
  timezone text default 'UTC',
  streak_freezes integer default 3,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS
alter table profiles enable row level security;

-- Setup RLS Policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create activities table
create table activities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  emoji text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table activities enable row level security;

create policy "Users can manage their own activities."
  on activities for all
  using ( auth.uid() = user_id );

-- Function to handle new user signup natively in Supabase (Optional but recommended)
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
