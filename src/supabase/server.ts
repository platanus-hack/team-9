import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/env";

export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        async getAll() {
          const store = await cookieStore;
          return store.getAll();
        },
        async setAll(cookiesToSet) {
          const store = await cookieStore;

          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              store.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
