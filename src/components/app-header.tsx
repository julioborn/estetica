import { LogoutButton } from "@/components/logout-button";

export function AppHeader({
  greeting,
  name,
  rightSlot,
}: {
  greeting: string;
  name: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-3.5 sm:px-6">
      <div className="flex items-center gap-2.5">
        <span className="flex size-7 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold text-accent-foreground">
          E
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-xs text-muted-foreground">{greeting}</span>
          <span className="font-heading text-sm font-bold text-foreground">
            {name}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {rightSlot}
        <LogoutButton />
      </div>
    </header>
  );
}
