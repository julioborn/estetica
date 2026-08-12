import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ROLE_HOME: Record<string, string> = {
  client: "/app",
  business_admin: "/business",
  employee: "/business",
  superadmin: "/admin",
};

const ROLE_PREFIXES: Record<string, string[]> = {
  client: ["/app"],
  business_admin: ["/business"],
  employee: ["/business"],
  superadmin: ["/app", "/business", "/admin"],
};

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected =
    pathname.startsWith("/app") ||
    pathname.startsWith("/business") ||
    pathname.startsWith("/admin");

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && isProtected) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role ?? "client";
    const allowedPrefixes = ROLE_PREFIXES[role] ?? ROLE_PREFIXES.client;
    const allowed = allowedPrefixes.some((prefix) =>
      pathname.startsWith(prefix),
    );

    if (!allowed) {
      const url = request.nextUrl.clone();
      url.pathname = ROLE_HOME[role] ?? "/app";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
