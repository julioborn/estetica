import Link from "next/link";
import { Button } from "@/components/ui/button";

const RUBROS = [
  { name: "Barbería", filled: true },
  { name: "Peluquería", filled: false },
  { name: "Masajes", filled: false },
  { name: "Pestañas", filled: true },
  { name: "Uñas", filled: false },
  { name: "Tratamientos", filled: false },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6 text-center">
      <div
        className="flex max-w-sm flex-wrap items-center justify-center gap-2"
        aria-hidden
      >
        {RUBROS.map((rubro, i) => (
          <span
            key={rubro.name}
            style={{ animationDelay: `${i * 90}ms` }}
            className={`animate-in fade-in slide-in-from-bottom-3 rounded-full border px-3.5 py-1.5 font-heading text-sm font-bold fill-mode-backwards duration-700 motion-reduce:animate-none ${
              rubro.filled
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            {rubro.name}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
          Encontrá tu turno,
          <br />
          cerca tuyo
        </h1>
        <p className="max-w-md text-muted-foreground">
          Barberías, peluquerías, masajes, pestañas, uñas y tratamientos
          estéticos de Calchaquí, todos en un mismo lugar. Elegí, reservá, y
          listo.
        </p>
      </div>

      <div className="flex gap-3">
        <Button render={<Link href="/signup" />} nativeButton={false}>
          Crear cuenta
        </Button>
        <Button
          render={<Link href="/login" />}
          nativeButton={false}
          variant="outline"
        >
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
}
