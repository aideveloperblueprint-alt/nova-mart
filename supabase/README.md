# Supabase setup

The Nova Mart Supabase project is provisioned in the London region.

1. Copy `.env.example` to `.env.local`.
2. Add the project's publishable key from Supabase Dashboard → Project Settings → API Keys.
3. Run `npm install` and `npm run dev`.

The initial database migration is applied remotely through the Supabase integration. It creates the core marketplace tables, initial NGN categories, profile bootstrap trigger and row-level security policies.

Never put a Supabase secret/service-role key in browser code or commit it to Git.
