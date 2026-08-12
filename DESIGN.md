---
name: Estetica
description: Reservá turnos en barberías, peluquerías, masajes y más, cerca tuyo.
colors:
  glass-white: "#f7f8f6"
  charcoal-ink: "#1e1e1c"
  pane-surface: "#ffffff"
  counter-neutral: "#ececea"
  muted-ink: "#6b6b66"
  vinyl-red: "#c4362e"
  brick-error: "#b8452f"
  hairline: "#dedbd8"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui"
    fontWeight: 900
    letterSpacing: "0.02em"
  body:
    fontFamily: "Geist Sans, ui-sans-serif, system-ui"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "0.21rem"
  md: "0.28rem"
  lg: "0.35rem"
spacing:
  sm: "8px"
  md: "16px"
components:
  button-primary:
    backgroundColor: "{colors.charcoal-ink}"
    textColor: "{colors.glass-white}"
    rounded: "{rounded.lg}"
  chip-selected:
    backgroundColor: "{colors.vinyl-red}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
  chip-unselected:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.sm}"
---

# Design System: Estetica

## Overview

**Creative North Star: "Vidriera con Vinilo" (Storefront Cut-Vinyl)**

The app reads like the glass door of a small salon or barbería: every label is cut-vinyl lettering applied on glass, not printed on paper — bold, rectangular, high-contrast, one color of "ink" at a time. This replaces an earlier "salon vanity counter" direction (cream/amber, rounded pill chips) that the user tried in the browser and didn't like; this is a full redesign, not a refinement, chosen from a second round of concept exploration where the user picked this direction over three other grounded proposals (corkboard directory, receipt-booklet confirmation, strip-curtain navigation) and the generic wellness-SaaS category standard.

Operate mode stays in force: this is a booking task, not a brand showcase. The vinyl-lettering voice is concentrated in labels, headings, and category tags (the "signage" moments); body copy (descriptions, addresses) stays in a plain readable sans so paragraphs never fight the display voice.

Rejected: the previous cream/amber "counter" world (too soft/decorative for what the user wanted), and — still, as before — the generic pastel-wellness-app look.

**Key Characteristics:**
- Near-white "glass" ground, matte charcoal "vinyl" ink, one vinyl-red accent reserved for state/selection
- Archivo Black (uppercase, tracked) as the signage voice for labels, chip text, and headings; Geist Sans for everything read at length
- Small, rectangular corners everywhere (0.21–0.35rem) — die-cut labels, not pills or soft cards
- Selected = solid vinyl-red fill; unselected = outline only, like an unpeeled decal outline

## Colors

Restrained palette: the vinyl-red accent is the one color note against neutrals.

### Primary
- **Charcoal Ink** (`#1e1e1c`): body text, primary button fill — the matte-black-vinyl neutral.

### Secondary
- **Vinyl Red** (`#c4362e`): the one accent. Selected category label, active list/map toggle segment, focus rings. Applied solid, like ink — never a tint or gradient.

### Neutral
- **Glass White** (`#f7f8f6`): page background — the "pane."
- **Pane Surface** (`#ffffff`): cards, popovers — brighter than the ground so objects read as sitting in front of the glass.
- **Counter Neutral** (`#ececea`): secondary surfaces, hover fills.
- **Muted Ink** (`#6b6b66`): secondary/placeholder text.
- **Hairline** (`#dedbd8`): borders, dividers — thin, like the edge of a cut decal.
- **Brick Error** (`#b8452f`): destructive actions only.

### Named Rules
**The Applied-Ink Rule.** Vinyl Red is always a solid fill or solid text color, never a tint, gradient, or glow. Vinyl doesn't have opacity variants — it's either applied or it isn't.

## Typography

**Display/Label Font:** Archivo (weight 900, "Black") — the vinyl-lettering voice
**Body Font:** Geist Sans — descriptions, addresses, paragraph copy

**Character:** Two-voice system: Archivo Black in uppercase with wide tracking for anything that reads as a physical label (category tags, chip text, business names, section headings); Geist Sans at normal case for anything meant to be read at length. The split is functional, not decorative — it marks "sign" vs. "page."

### Hierarchy
- **Display label** (Archivo 900, uppercase, tracking-wide, text-xs–2xl depending on context): category chips, business names, section headings ("Servicios").
- **Body** (Geist 400, text-base/sm): descriptions, addresses, service durations.
- **Price** (Geist 500): service prices — numeric, not part of the signage voice.

## Layout

Same structure as before: mobile-first single column, `max-w-2xl` for reading content. No change to the underlying grid — this redesign is a materials/typography/shape change, not a structural one.

## Elevation & Depth

Flat by default, same discipline as before: depth only on hover/selection state, never resting.

### Shadow Vocabulary
- **Selection glow** (`box-shadow: 0 2px 10px -2px rgba(196,54,46,0.5)`): selected category label and active toggle segment.
- **Card hover** (`box-shadow: 0 4px 16px -4px rgba(30,30,28,0.15)`): business card hover, signals it's a link.

## Shapes

One corner language now, not two: everything is a small rectangle (`0.21–0.35rem` radius) — chips, badges, cards, buttons, photo thumbnails. Nothing is a pill and nothing is sharp-cornered; the radius is just enough to read as "cut," not "printed."

### Named Rules
**The Die-Cut Rule.** No element earns a radius larger than `0.35rem`. A rounder corner would read as a sticker/badge from a different world (the old "bulb" language); vinyl is cut with a blade, not stamped.

## Components

### Buttons
- **Shape:** `rounded-lg` (now `0.35rem`, matching the die-cut scale)
- **Primary:** Charcoal Ink fill, Glass White text
- **Outline:** Hairline stroke, Counter Neutral fill on hover
- **Disabled:** reduced opacity (used for "próximamente" actions)

### Chips / Category Labels
- **Unselected:** transparent fill, `border-foreground/25` outline — like an unpeeled decal, not yet applied
- **Selected:** solid Vinyl Red fill, white text, selection-glow shadow, no border
- **Voice:** Archivo Black, uppercase, tracked — always

### Badges (category tags on cards/profile)
- **Style:** `rounded-sm`, outline variant, Archivo Black uppercase — a small vinyl tag, not a soft pill

### Cards (business list, profile sections)
- **Corner Style:** `rounded-sm`
- **Background:** Pane Surface with Hairline stroke
- **Shadow Strategy:** flat at rest, card-hover shadow on interaction

### Empty / Placeholder States
- **Style:** dashed Hairline border, Pane Surface at 50% opacity
- **Voice:** heading in Archivo Black, body text in Geist — same warm, specific copy as before ("Estamos arrancando por Calchaquí…")

## Do's and Don'ts

### Do:
- **Do** keep Archivo Black to uppercase, short strings (labels, names, headings) — never full sentences or paragraphs.
- **Do** use outline-only as the unselected/inactive state; a filled-but-muted chip reads as a different world.
- **Do** keep every corner at or under `0.35rem` (the Die-Cut Rule).

### Don't:
- **Don't** reintroduce rounded-full/pill shapes — that was the previous, rejected world.
- **Don't** tint or gradient Vinyl Red — solid fill or solid text only (the Applied-Ink Rule).
- **Don't** set Archivo Black at body-copy sizes or in sentence case; it's a label voice, not a paragraph voice.
