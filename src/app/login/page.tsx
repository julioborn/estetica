import Link from "next/link";
import { login } from "@/lib/supabase/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <div className="flex flex-col items-center gap-2">
        <span className="flex size-10 items-center justify-center rounded-full bg-accent font-heading text-lg font-bold text-accent-foreground">
          E
        </span>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Bienvenido de nuevo
        </h1>
        <p className="text-sm text-muted-foreground">
          Entrá para reservar turnos o gestionar tu negocio.
        </p>
      </div>

      <Card className="w-full max-w-sm">
        <CardContent>
          <form action={login} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {message && <p className="text-sm text-success">{message}</p>}
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" size="xl" className="mt-1 w-full">
              Ingresar
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            ¿No tenés cuenta?{" "}
            <Link
              href="/signup"
              className="font-medium text-accent hover:underline underline-offset-4"
            >
              Creá una
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
