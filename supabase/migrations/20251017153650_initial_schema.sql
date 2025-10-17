-- ====
-- Mindful Art - Initial Schema Migration
-- TAD Reference: Section 6.2 (Supabase schema outline)
-- ====

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ====
-- PROFILES TABLE
-- TAD Reference: Section 6.1 (Logical model), 7.4 (User profile management)
-- ====

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  country text,
  preferred_languages text[],
  start_date timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- RLS Policy: Users can only access their own profile
create policy "Profiles are self-access only"
  on profiles
  for select
  using (auth.uid() = id);

-- Index for auth linkage (TAD 6.7)
create index idx_profiles_id on profiles(id);

comment on table profiles is 'User metadata linked to Supabase Auth users';
comment on column profiles.username is 'Display name from OAuth provider';
comment on column profiles.country is 'User-selected country during registration';
comment on column profiles.preferred_languages is 'Array of up to 8 European languages (informational only in R01)';
comment on column profiles.start_date is 'Timestamp of first successful authentication';

-- ====
-- VAULT_ITEMS TABLE
-- TAD Reference: Section 6.1, 6.3 (Ordering semantics - last-saved-first)
-- ====

create table vault_items (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  artwork_key text not null,
  artwork_json jsonb not null,
  created_at timestamptz default now(),
  constraint unique_user_artwork unique(user_id, artwork_key)
);

-- Enable RLS
alter table vault_items enable row level security;

-- RLS Policy: Users manage only their own vault items
create policy "Users manage their own vault items"
  on vault_items
  for all
  using (auth.uid() = user_id);

-- Index for reverse chronological ordering (TAD 6.7)
create index idx_vault_items_user_created on vault_items(user_id, created_at desc);

comment on table vault_items is 'Artworks saved by users in their private Vault';
comment on column vault_items.artwork_key is 'Stable key: provider:providerObjectId';
comment on column vault_items.artwork_json is 'Normalised Artwork object preserved at save time';
comment on column vault_items.created_at is 'Used for last-saved-first ordering';

-- ====
-- GALLERIES TABLE
-- TAD Reference: Section 6.1, 6.4 (Data access patterns - alphabetical order)
-- ====

create table galleries (
  id bigint generated always as identity primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create unique index for case-insensitive gallery names per user
create unique index unique_user_gallery_name on galleries(user_id, lower(name));

-- Enable RLS
alter table galleries enable row level security;

-- RLS Policy: Users manage only their own galleries
create policy "Users manage their own galleries"
  on galleries
  for all
  using (auth.uid() = user_id);

-- Index for alphabetical sorting (TAD 6.7)
create index idx_galleries_user_name on galleries(user_id, lower(name));

comment on table galleries is 'Named galleries curated by users';
comment on column galleries.name is 'Gallery title (max 40 chars, enforced client-side)';
comment on column galleries.description is 'Gallery description (max 350 chars, enforced client-side)';

-- ====
-- GALLERY_ITEMS TABLE
-- TAD Reference: Section 6.1, 6.3 (Ordering - last-saved-first for R01)
-- ====

create table gallery_items (
  id bigint generated always as identity primary key,
  gallery_id bigint not null references galleries(id) on delete cascade,
  artwork_key text not null,
  artwork_json jsonb not null,
  position integer,
  created_at timestamptz default now(),
  constraint unique_gallery_artwork unique(gallery_id, artwork_key)
);

-- Enable RLS
alter table gallery_items enable row level security;

-- RLS Policy: Users manage items in their own galleries
create policy "Users manage their own gallery items"
  on gallery_items
  for all
  using (
    auth.uid() = (
      select user_id from galleries where id = gallery_items.gallery_id
    )
  );

-- Index for order stability (TAD 6.7)
create index idx_gallery_items_order on gallery_items(gallery_id, position nulls last, created_at desc);

comment on table gallery_items is 'Join table linking artworks to galleries';
comment on column gallery_items.artwork_key is 'Stable key: provider:providerObjectId';
comment on column gallery_items.artwork_json is 'Normalised Artwork object preserved at save time';
comment on column gallery_items.position is 'Manual ordering (post-MVP); NULL for R01 last-saved-first';
comment on column gallery_items.created_at is 'Used for last-saved-first ordering in R01';

-- ====
-- AUDIT_LOG TABLE (Optional)
-- TAD Reference: Section 6.1 (Optional lightweight log for analytics)
-- ====

create table audit_log (
  id bigint generated always as identity primary key,
  user_id uuid references profiles(id) on delete cascade,
  action text not null,
  target_id text,
  metadata jsonb,
  timestamp timestamptz default now()
);

-- Enable RLS
alter table audit_log enable row level security;

-- RLS Policy: Users can only view their own audit logs
create policy "Users view their own audit logs"
  on audit_log
  for select
  using (auth.uid() = user_id);

-- Index for timestamp queries
create index idx_audit_log_user_timestamp on audit_log(user_id, timestamp desc);

comment on table audit_log is 'Optional lightweight log for analytics and debugging (non-PII)';
comment on column audit_log.action is 'Action type (e.g., vault_add, gallery_create)';
comment on column audit_log.target_id is 'Reference to affected entity (e.g., gallery_id, artwork_key)';
comment on column audit_log.metadata is 'Additional non-PII context';

-- ====
-- FUNCTIONS AND TRIGGERS
-- ====

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for profiles
create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at_column();

-- Trigger for galleries
create trigger update_galleries_updated_at
  before update on galleries
  for each row
  execute function update_updated_at_column();

-- ====
-- INITIAL SETUP COMPLETE
-- ====