# Nova Mart

A modern multi-vendor e-commerce marketplace for Nigeria.

Nova Mart is being built as a responsive marketplace where customers can discover products from independent sellers, while vendors manage their own stores and orders.

## Current foundation

- Next.js App Router, React and TypeScript
- Tailwind CSS 4
- Supabase SSR clients for browser and server rendering
- Generated Supabase database types in `types/database.ts`
- Homepage category list reads active categories from the Supabase database
- Responsive customer-facing storefront
- Initial brand direction: deep navy, warm orange and white
- Product discovery sections for the six launch categories:
  - Fashion & Clothing
  - Electronics & Gadgets
  - Phones & Accessories
  - Computers & Laptops
  - Home & Furniture
  - Beauty & Personal Care

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Planned marketplace capabilities

- Customer accounts, guest checkout, wishlists and verified reviews
- Vendor onboarding, store dashboards, product and order management
- Admin dashboard, moderation, commissions and payout oversight
- NGN pricing and Nigerian payment methods (bank transfer, cards and supported cash-on-delivery locations)
- In-house and third-party delivery integrations
- Coupons, flash sales, order tracking and email/SMS notifications
- Customer support and live chat

## Supabase backend

The Supabase project is provisioned and healthy in London (`eu-west-2`).

- Project URL: `https://ppkiltnkgegbldrlaqfy.supabase.co`
- Project ref: `ppkiltnkgegbldrlaqfy`
- Tables: profiles, vendors, categories, products, product_images, orders, vendor_orders, order_items, payments, shipments, reviews and wishlists
- Row-level security is enabled on all marketplace tables
- The six launch categories are seeded in the database
- Supabase Auth profile creation trigger and session-refresh middleware are configured
- Role and product moderation fields are protected from self-service escalation

Copy `.env.example` to `.env.local` for local development. The publishable key is safe to expose in the browser; never use a Supabase secret/service-role key in client code or commit it to Git.

## Architecture direction

The planned production architecture uses Next.js with Supabase (PostgreSQL, Auth, Storage and Realtime). Payment and payout integrations will be selected after confirming provider support for the required marketplace settlement flows. No live payment processing or order persistence is implemented in this initial storefront.

## Development

The storefront foundation is being developed on the `feat/storefront-foundation` branch. Features will be added incrementally with server-side validation, role-based access controls and vendor/customer data isolation before launch.
