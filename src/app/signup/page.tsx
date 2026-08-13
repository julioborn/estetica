import Link from "next/link";
import { signup } from "@/lib/supabase/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <div className="flex flex-col items-center gap-2">
        <span className="flex size-10 items-center justify-center rounded-full bg-accent font-heading text-lg font-bold text-accent-foreground">
          E
        </span>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Creá tu cuenta
        </h1>
        <p className="max-w-xs text-center text-sm text-muted-foreground">
          Reservá turnos en barberías, peluquerías, masajes y más, cerca
          tuyo.
        </p>
      </div>

      <Card className="w-full max-w-sm">
        <CardContent>
          <form action={signup} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" name="firstName" type="text" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" name="lastName" type="text" required />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="dateOfBirth">Fecha de nacimiento</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                minLength={6}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Repetir contraseña</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                minLength={6}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" size="xl" className="mt-1 w-full">
              Crear cuenta
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            ¿Ya tenés cuenta?{" "}
            <Link
              href="/login"
              className="font-medium text-accent hover:underline underline-offset-4"
            >
              Iniciá sesión
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
