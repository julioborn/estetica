# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router, TypeScript, Tailwind CSS, shadcn/ui) on Vercel, backed by Supabase (Postgres + Auth + Storage, PostGIS for geolocation). Packaged to iOS/Android with Capacitor in remote mode (the native shell loads the live Vercel URL, so every deploy updates the app instantly without a store review for JS/UI changes). Design language stays web/PWA — the Capacitor wrapper does not make this a native-platform design target.

## Users

Two primary audiences, both first-time-app users in this market:

- **Clientes**: people in and around Calchaquí, Santa Fe (CP 3050) looking to book an appointment at a barbershop, hair salon, massage studio, lash/nail tech, or aesthetic-treatment business. They discover businesses by location on a map, browse a business's profile (photos, services, products) like a social profile, and book a turno.
- **Dueños de negocio (business_admin)**: owners of local beauty/grooming businesses who pay a monthly subscription to get a public profile on the platform, showcase their catalog, and manage incoming appointment requests, their staff, and their own stats.
- **Empleados**: staff created by a business_admin, scoped to one business, who manage only the appointments assigned to them.
- **Superadmin**: the platform operator (the founder), with full visibility and override access across every business for support and QA.

## Product Purpose

A local marketplace app for beauty and grooming services (barbería, peluquería, masajes, pestañas, uñas, tratamientos estéticos). It exists to make it easy for people nearby to find and book a turno at a local business, and to give small beauty businesses — who mostly run bookings informally today — a shared, map-based storefront and a lightweight booking/staff/stats system in exchange for a monthly subscription. Success is measured by businesses actively subscribed and receiving turnos through the app, and clients returning to book again.

## Positioning

A location-first discovery app in the style of PedidosYa/Rappi, but for beauty and grooming appointments instead of food delivery: open the app, see every barbería/peluquería/spa near you on a map, compare, and book directly. The mechanism a generic scheduling tool (Calendly-style) or a single business's own booking page can't copy is the map-based cross-business discovery layer — clients aren't booking a business they already chose, they're finding one.

## Operating Context

- Initial launch market: Argentina, starting in and around **Calchaquí, Santa Fe (CP 3050)** — a small town — then expanding without a hard city restriction in the discovery/map logic.
- Spanish (Argentina) is the working language throughout the product; UI copy in this conversation has been Spanish and should stay Spanish.
- Businesses currently manage turnos informally (phone, WhatsApp, in-person); this app is likely most users' first booking app for this use case, so flows should not assume prior familiarity with appointment-booking apps.
- Payment for the turno itself (cash, transfer, in-person POS) happens outside the app; only the business's platform subscription is paid in-app via MercadoPago.

## Capabilities and Constraints

- Four roles with different surfaces: client (`/app`), business_admin and employee (`/business`, shared route with different permissions), superadmin (`/admin`).
- One business = one location = one subscription; a business_admin wanting a second location creates a second business/subscription rather than managing multiple locations under one account.
- Business profile includes an Instagram-style photo gallery and a showcase product catalog — the product catalog is display-only, no in-app checkout/cart.
- Booking flow is request-based: client requests a turno, the business (owner or assigned employee) must accept it, and the client is notified of the outcome. Turno payment/deposit is not handled by the app.
- Geolocation via PostGIS + Google Maps for the nearby-businesses map/list.
- Subscription billing via MercadoPago (recurring/preapproval), business-facing only.
- Undecided: platform/brand name (working name "Estetica" for now).

## Evidence on Hand

None yet — no real business listings, photos, copy, testimonials, or pricing have been supplied. Nothing here should be fabricated; placeholder/sample content used during design must be clearly identifiable as such.

## Product Principles

- Discovery before commitment: the map/list of nearby businesses is the front door, not a login wall or a single business's page.
- Low friction for a first-time audience: this is many users' first appointment-booking app, so flows should read as obviously as a map + a booking button, not assume prior SaaS/app fluency.
- The business owner's dashboard is a utility, not a marketing surface: agenda, catalog, and stats need to be fast and legible for daily, often on-the-go use.
- Trust the map, not the search bar: proximity and visual profile quality (photos) are the primary decision inputs for clients choosing between similar businesses.
