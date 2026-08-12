---
version: 1
slug: "src-app-app-page-tsx"
primary_target: "src/app/app/page.tsx"
related_targets: []
---

## Scope and visitor mode

`/app` — the authenticated client's home. Operate mode: the visitor completes a task (find + book a turno), not a marketing surface.

## Audience, job, action, proof, constraints

A client in/around Calchaquí opens the app to see which barberías/peluquerías/masajes/etc. are nearby, filter by rubro, and book. Primary action: pick a business from the list, go to its profile, book (booking itself lands in a later phase). Proof is the business's own real data (name, category, address, distance, services/prices) — no fabricated content. Hard constraint: most likely real-world state at launch is an empty or near-empty list (small town, brand-new marketplace) — the empty state carries as much weight as the populated one.

## Chosen direction and memorable moment

**Redesigned** (round 2): the user rejected the first direction (Mostrador de Peluquería — cream/amber, rounded pill chips) after seeing it live. Re-ran concept exploration; the user picked **Vidriera con Vinilo (Storefront Cut-Vinyl)** over three other grounded alternates (corkboard directory, receipt-booklet, strip-curtain) and the category-standard canon. Every label reads like cut-vinyl lettering on a shop's glass door: Archivo Black uppercase, small rectangular corners, vinyl-red solid fill for selection only, outline-only for unselected. Memorable moment: a category label going from an outlined "unpeeled decal" to a solid red "applied" tag on selection.

## Unresolved decisions

- Map view is wired (list/map toggle, `nearby_businesses` RPC returns coordinates-aware distance) but shows a "not configured yet" placeholder until `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set — user is setting up Google Cloud billing for this now.
- "Open now" status was intentionally left out of the business card: no business has populated `business_hours` yet, and faking an open/closed dot would be inventing a claim. Add it once the business dashboard (Phase 3) lets owners set hours.
- Whether discovery should be visible pre-login (public, like PedidosYa) instead of gated behind `/app` is an open product question, not decided here.
