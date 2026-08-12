import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "Estética — Turnos",
  description: "Reservá turnos en barberías, peluquerías, masajes y más.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/*
          THESIS: Reject the generic pastel-wellness booking template; the app
          is a storefront window, not a dashboard — every label reads like
          cut-vinyl lettering stuck on glass, not printed on paper.
          OWN-WORLD: glass-white ground #F7F8F6, vinyl-red accent #C4362E
          (reserved for state/selection only, applied solid like ink), matte
          charcoal ink #1E1E1C, hairline gray #DEDED8 for structure. Archivo
          Black for display/labels (the vinyl-lettering voice, uppercase,
          tight tracking), Geist Sans for body copy. Rectangular die-cut label
          shapes (small radius, not pills) for chips/tags; selected = solid
          vinyl-red fill, unselected = outline only, like an unpeeled decal.
          STORY: a client reads the rubro labels like reading a shop's front
          door, picks one, and the list behind the glass updates.
          FIRST VIEWPORT: horizontal rubro label row (outlined = unselected,
          solid vinyl-red = selected), a scrollable list of business cards
          below, map view as a toggle.
          FORM: Vidriera con Vinilo (Storefront Cut-Vinyl), chosen alternate
          over grounded direction #6, seed key 4015b024.
          FINISH: unreviewed and undocumented is unfinished; this build ends
          with the finish review, the verdict, and DESIGN.md.
        */}
        {children}
      </body>
    </html>
  );
}
