import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || key === "your-anon-key-here") {
    console.warn("Supabase credentials missing. Please set them in .env");
    // Return a dummy client or handle as needed. 
    // To prevent the fatal error, we provide the values even if invalid, 
    // but the actual auth calls will fail.
  }

  return createBrowserClient(
    url || "https://placeholder.supabase.co",
    key || "placeholder"
  )
}
