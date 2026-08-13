---
name: Estetica
description: Reservá turnos en barberías, peluquerías, masajes y más, cerca tuyo.
colors:
  ring-black: "#171412"
  elevated-surface: "#211d19"
  ring-light-gold: "#f0a93f"
  warm-ink: "#f5efe6"
  muted-warm: "#9c9188"
  hairline-dark: "#332e28"
  alert-red: "#e5484d"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui"
    fontWeight: 700
  body:
    fontFamily: "Geist Sans, ui-sans-serif, system-ui"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  md: "0.8rem"
  lg: "1rem"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.warm-ink}"
    textColor: "{colors.ring-black}"
    rounded: "{rounded.lg}"
  chip-selected:
    backgroundColor: "{colors.ring-light-gold}"
    textColor: "{colors.ring-black}"
    rounded: "{rounded.full}"
  avatar-glow:
    backgroundColor: "{colors.elevated-surface}"
    rounded: "{rounded.full}"
---

# Design System: Estetica

## Overview

**Creative North Star: "Ring Light" (aro de luz)**

The app is a dim room lit by one warm halo — the content-creator ring light and phone-mirror setup, the exact aesthetic of a "getting ready" beauty video. This is the project's third visual world: it replaced "Mostrador de Peluquería" (cream/amber counter, rejected before shipping) and then "Vidriera con Vinilo" (vinyl-red/charcoal signage, shipped but the user judged it "muy simple y antiguo" — too plain and dated — after living with it across several built screens). Ring Light was chosen specifically to read as current: dark ground, a glowing accent, circular avatar-framed photography, because the standing complaint was that the app felt old.

Operate-mode discipline still holds — one accent, rationed to state/selection/glow, never spread across a whole surface. What changed structurally: light mode → dark mode (justified by the source scene: a ring light is dramatic specifically against a dim room, not daylight), rectangular die-cut shapes → circular/full-round shapes, the industrial Archivo Black voice → the warmer, rounder Plus Jakarta Sans.

**Key Characteristics:**
- Near-black warm ground; nothing is pure black or cold gray
- One warm gold "ring light" glow, applied as light/shadow (`box-shadow`, `ring`), never a flat fill outside buttons
- Every business photo sits in a circular frame with a glowing ring border — the signature, repeated motif
- Full-round pills for chips/toggles/badges; soft `1rem`+ radius for cards

## Colors

### Primary
- **Ring Black** (`#171412`): page background. Warm-tinted near-black, not a cold true-black.

### Secondary
- **Ring-Light Gold** (`#f0a93f`): the one accent. Selected chip, active toggle, focus rings, and the glow around business photos. Always paired with a soft blurred shadow (the "halo"), never a flat fill spanning more than a small control.

### Neutral
- **Elevated Surface** (`#211d19`): cards, popovers — one step brighter than the ground.
- **Secondary Surface** (`#2a2521`): hover states, secondary buttons, unselected chip fill.
- **Warm Ink** (`#f5efe6`): primary text, and primary-button fill (inverted: light fill, dark text — the "torch" against the dark room).
- **Muted Warm** (`#9c9188`): secondary/placeholder text.
- **Hairline Dark** (`#332e28`): borders, dividers.
- **Alert Red** (`#e5484d`): destructive actions only.

### Named Rules
**The Halo, Not Fill Rule.** Ring-Light Gold shows up as a glow (`box-shadow` blur, a `ring-2`/`ring-4` outline) far more often than as a solid background. The only solid-gold fills are small controls (a selected chip, the active toggle segment) — never a card, a section, or a hero.

## Typography

**Display/Label Font:** Plus Jakarta Sans (weight 700–800)
**Body Font:** Geist Sans

**Character:** Warm and rounded rather than industrial — normal sentence case, not uppercase-and-tracked like the previous vinyl world. The display face carries warmth through roundness and weight, not through shouting.

### Hierarchy
- **Title** (Jakarta 700, text-2xl): page headings, business names.
- **Label** (Jakarta 700, text-sm): chip text, button text — no forced uppercase.
- **Body** (Geist 400): descriptions, addresses.
- **Price** (Geist 500): service prices.

## Layout

Unchanged from the prior world structurally: mobile-first single column, `max-w-2xl` reading width. The business profile page now overlaps a circular glow-ringed avatar over the bottom edge of the cover banner (`-mt-16` pull-up), a direct expression of the Ring Light motif on the most important page.

## Elevation & Depth

Depth is the glow itself, not a generic drop shadow. Two shadow roles:

### Shadow Vocabulary
- **Ring-light glow** (`0 0 16px -2px rgba(240,169,63,0.5–0.7)`): selected chips, active toggle, avatar photos, hover on cards. Soft, wide blur, no hard offset — light diffusing outward, not a shadow falling down.
- **Card hover** (`0 0 24px -6px rgba(240,169,63,0.35)`): subtler version for list-card hover.

### Named Rules
**The Glow-Not-Shadow Rule.** Where the previous world used a dark offset shadow for depth, this world uses a colored glow with zero or near-zero offset — light source, not gravity, is the depth model.

## Shapes

Circular and full-round everywhere: avatar/business photos are always `rounded-full` with a glow ring; chips, toggles, and badges are `rounded-full`; cards use a soft `1rem`–`1.5rem` radius. No rectangular die-cut shapes remain from the previous world.

## Components

### Buttons
- **Shape:** `rounded-lg` (now scaled to the softer `1rem` base)
- **Primary:** Warm Ink fill, Ring Black text (inverted for dark ground)
- **Outline:** Hairline stroke, Secondary Surface fill on hover

### Chips / Category Pills
- **Unselected:** transparent fill, hairline border, muted text
- **Selected:** solid Ring-Light Gold fill, Ring Black text, halo glow shadow — "the ring lit up"

### Avatars (business photos)
- **Shape:** `rounded-full`, `ring-2` or `ring-4` in Ring-Light Gold, glow shadow
- **Fallback:** Store icon (lucide) on Secondary Surface when no photo exists yet — never a stretched placeholder

### Cards (business list, profile sections)
- **Corner Style:** `rounded-2xl`/`rounded-3xl`
- **Background:** Elevated Surface
- **Shadow Strategy:** flat at rest, halo glow on hover

### Google Maps InfoWindow (exception)
Google renders this chrome white regardless of our theme; its text is hardcoded to dark colors (`#171412`/`#6b6b66`) rather than `text-foreground`, since `text-foreground` is near-white in this dark world and would be invisible on Google's white popup background.

## Do's and Don'ts

### Do:
- **Do** frame every business photo in a circular glow ring — it's the one repeated signature across list cards, map pins, and the profile hero.
- **Do** keep the gold accent as a glow/ring, not a fill, outside of small controls (the Halo Rule).
- **Do** hardcode dark text colors inside any Google Maps InfoWindow content — it never inherits our dark theme.

### Don't:
- **Don't** bring back rectangular/die-cut shapes or uppercase-tracked labels — that was the previous, rejected world.
- **Don't** use `text-foreground` (near-white) on any surface Google Maps renders itself (InfoWindow), since it isn't tinted by our CSS.
- **Don't** fabricate business photos; the icon-on-dark-surface fallback is the honest default when none exists.
