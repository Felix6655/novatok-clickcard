create table public.cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  slug text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  created_at timestamp default now()
);

alter table public.cards enable row level security;

create policy "Users can manage their own cards"
on public.cards
for all
using (auth.uid() = user_id);
