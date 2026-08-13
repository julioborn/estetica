---
version: 1
slug: "src-app-app-page-tsx"
primary_target: "src/app/app/page.tsx"
related_targets: []
---

## Scope and visitor mode

`/app` — the authenticated client's home. Operate mode: the visitor completes a task (find + book a turno), not a marketing surface.

## Audience, job, action, proof, constraints

A client in/around Calchaquí opens the app to see which barberías/peluquerías/masajes/etc. are nearby, filter by rubro, and book. Primary action: pick a business from the list, go to its profile, book (booking itself lands in a later phase). Proof is the business's own real data (name, category, address, distance, services/prices) — no fabricated content. Google Maps API key and MP Estudio (a real business) are now live, so the discovery/map screen shows real data, not just an empty state.

## Chosen direction and memorable moment

**Redesigned again** (round 3): after living with Vidriera con Vinilo across several built screens, the user judged the whole app "muy simple y antiguo" (too plain/dated) and asked to re-explore the full visual direction, not just polish it. Re-ran concept exploration with fresh candidates skewed toward feeling current (the standing complaint was specifically "looks old"); the user picked **Ring Light** over three alternates (Ahora Atendiendo/queue board, Barbería Moderna/dark-wood-brass revival, and the canon) and the category standard. Dark ground, one warm gold glow accent, full-round circular shapes — every business photo sits in a glowing ring, like a face lit by a ring light. Memorable moment: a category pill's ring "lighting up" gold on selection; the business profile's circular avatar glowing over the cover banner.

## Unresolved decisions

- "Open now" status still intentionally left out of the business card — no business has populated `business_hours` yet.
- Whether discovery should be visible pre-login (public, like PedidosYa) instead of gated behind `/app` is still an open product question.
- Google Maps InfoWindow content must keep hardcoded dark text colors (not `text-foreground`) since Google's popup chrome is always white regardless of app theme — a real constraint any future map work must respect.
