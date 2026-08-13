import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
        Turnos para tu estética, cerca tuyo
      </h1>
      <p className="max-w-md text-muted-foreground">
        Barberías, peluquerías, masajes, pestañas, uñas y tratamientos
        estéticos en un solo lugar. Descubrí negocios cerca tuyo y reservá tu
        turno.
      </p>
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
