"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useStampStore } from "@/store/use-stamp-store";
import { useRouter, usePathname } from "next/navigation";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { setUserId } = useStampStore();
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session && pathname !== "/auth") {
        // Silent Guest Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: "demo@unoldjeju.com",
          password: "demo-password123",
        });
        
        if (error) {
          console.error("Silent login failed:", error);
          if (error.message.includes("Invalid login")) {
            const { data: signUpData } = await supabase.auth.signUp({
              email: "demo@unoldjeju.com",
              password: "demo-password123",
            });
            if (signUpData?.user) {
              setUserId(signUpData.user.id);
            }
          }
        } else if (data?.user) {
          setUserId(data.user.id);
        }
        
        // Always sync user to ensure they exist in Prisma User table
        const userToSync = (session || data)?.user;
        if (userToSync) {
          await fetch('/api/auth/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: userToSync.id, email: userToSync.email })
          });
        }
      } else if (session?.user) {
        setUserId(session.user.id);
        await fetch('/api/auth/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: session.user.id, email: session.user.email })
        });
      }
      
      setLoading(false);
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
      } else {
        setUserId(null);
        if (pathname !== "/auth") {
          router.push("/auth");
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [pathname, router, setUserId, supabase.auth]);

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
          <p className="text-sm font-bold text-ink-muted uppercase tracking-widest animate-pulse">Authenticating...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
