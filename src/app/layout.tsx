import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Estética — Turnos",
  description: "Reservá turnos en barberías, peluquerías, masajes y más.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/*
          THESIS: Reject the generic pastel-wellness booking template; the app
          is a dim room lit by a ring light, not a printed page — one warm
          halo marks what's alive on screen, everything else stays low.
          OWN-WORLD: near-black warm ground #171412, elevated surface #211D19,
          warm ring-light gold #F0A93F (reserved for state/selection/glow),
          warm off-white ink #F5EFE6. Plus Jakarta Sans (warm, rounded
          geometric) for display/labels, Geist Sans for body copy. Circular
          forms throughout — avatar-framed photos with a glowing ring border,
          full-round pill chips; selected = the ring lights up (glow +
          accent), unselected = dim/unlit outline.
          STORY: a client scrolls a dim list of negocios, taps a rubro and its
          ring lights up gold, taps a business and its photo glows like it's
          on camera.
          FIRST VIEWPORT: horizontal rubro pill row (lit gold = selected, dim
          outline = unselected), a scrollable list of business cards below
          with circular glow-ringed photos, map view as a toggle.
          FORM: Ring Light, chosen alternate over grounded direction #7 (Chat
          Commerce Catalog), seed key 41c4733a.
          FINISH: unreviewed and undocumented is unfinished; this build ends
          with the finish review, the verdict, and DESIGN.md.
        */}
        {children}
      </body>
    </html>
  );
}
