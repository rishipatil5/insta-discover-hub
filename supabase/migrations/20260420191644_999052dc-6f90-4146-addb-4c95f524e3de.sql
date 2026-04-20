-- Roles enum and user_roles table for admin checks
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  )
$$;

create policy "Users see their own roles"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Admins see all roles"
  on public.user_roles for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Seller submissions
create type public.submission_status as enum ('pending', 'approved', 'rejected');

create table public.seller_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  handle text not null,
  category text not null,
  description text not null,
  image_url text,
  location text,
  submitter_email text,
  status submission_status not null default 'pending',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewer_id uuid references auth.users(id) on delete set null
);

create index seller_submissions_status_idx on public.seller_submissions(status);
create index seller_submissions_handle_idx on public.seller_submissions(handle);

alter table public.seller_submissions enable row level security;

-- Anyone (even anon) may submit a shop
create policy "Anyone can submit"
  on public.seller_submissions for insert
  to anon, authenticated
  with check (status = 'pending');

-- Anyone can read APPROVED submissions (these are the public directory)
create policy "Public can view approved"
  on public.seller_submissions for select
  to anon, authenticated
  using (status = 'approved');

-- Admins can read all submissions
create policy "Admins view all submissions"
  on public.seller_submissions for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Admins can update (approve/reject)
create policy "Admins update submissions"
  on public.seller_submissions for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Admins can delete
create policy "Admins delete submissions"
  on public.seller_submissions for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));