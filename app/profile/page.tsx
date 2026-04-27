"use client";

import { useStampStore } from "@/store/use-stamp-store";
import { User, Map, Stamp, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { userId, collectedStamps, totalStamps, availableMaps, setUserId } = useStampStore();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserId(null);
    router.push("/auth");
  };

  if (!userId) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center bg-slate-50 p-6 text-center animate-in fade-in duration-300">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 shadow-inner">
          <User className="h-10 w-10 text-slate-300" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Not Logged In</h1>
        <p className="mb-8 text-sm text-slate-500">
          Sign in or create an account to start collecting stamps and earn rewards.
        </p>
        <Link
          href="/auth"
          className="flex w-full max-w-xs items-center justify-center rounded-2xl gradient-jeju py-4 text-sm font-bold text-white shadow-soft transition-transform active:scale-95"
        >
          Sign In / Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-slate-50 pb-28 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* ── Header ── */}
      <div className="glass-heavy sticky top-0 z-40 border-b border-brand/8 px-5 py-4">
        <h1 className="text-xl font-black text-ink">My Profile</h1>
      </div>

      <div className="mx-auto w-full max-w-lg px-5 pt-6 space-y-6">
        {/* ── User Card ── */}
        <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-jeju text-white shadow-soft">
            <User className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-brand mb-1">Explorer</p>
            <h2 className="text-lg font-bold text-slate-900 truncate">
              {userId.substring(0, 8)}...
            </h2>
            <p className="text-xs font-medium text-slate-500">ID: {userId}</p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <Stamp className="h-6 w-6 text-brand mb-2" />
            <span className="text-2xl font-black text-slate-900">{collectedStamps.length}</span>
            <span className="text-xs font-semibold text-slate-500">Stamps Collected</span>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <Map className="h-6 w-6 text-brand mb-2" />
            <span className="text-2xl font-black text-slate-900">{availableMaps.length}</span>
            <span className="text-xs font-semibold text-slate-500">Maps Available</span>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="rounded-3xl bg-white p-2 shadow-sm border border-slate-100 space-y-1">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-2xl p-3 hover:bg-slate-50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Settings className="h-5 w-5" />
            </div>
            <div className="flex-1 font-semibold text-slate-700">Settings</div>
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl p-3 hover:bg-red-50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <LogOut className="h-5 w-5" />
            </div>
            <div className="flex-1 text-left font-semibold text-red-600">Log Out</div>
          </button>
        </div>
      </div>
    </div>
  );
}
