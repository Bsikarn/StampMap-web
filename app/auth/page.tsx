"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AuthPage() {
  const [tab, setTab]               = useState<"login"|"signup">("login");
  const [showPwd, setShowPwd]       = useState(false);
  const [form, setForm]             = useState({ name: "", email: "", password: "" });

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-slate-50 px-5 py-12">

      {/* Subtle background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/8 blur-3xl"/>
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl"/>
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-violet-100/50 blur-3xl"/>
      </div>

      {/* Back button */}
      <Link
        href="/"
        className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-card ring-1 ring-black/[0.04] transition-shadow hover:shadow-card-md"
      >
        <ArrowLeft className="h-4 w-4 text-slate-700"/>
      </Link>

      {/* Logo */}
      <div className="relative mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand shadow-card-md">
          <span className="text-2xl font-black text-white">S</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">StampMap</h1>
        <p className="mt-0.5 text-sm text-slate-500">Your passport to the world</p>
      </div>

      {/* Card */}
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-card-lg ring-1 ring-black/[0.04]">

        {/* Tabs */}
        <div className="flex rounded-xl bg-slate-100 p-1">
          {(["login","signup"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 rounded-[10px] py-2 text-sm font-semibold transition-all ${
                tab === t
                  ? "bg-white text-slate-900 shadow-card"
                  : "text-slate-500 hover:text-slate-700"
              }`}>
              {t === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form className="mt-5 space-y-3.5" onSubmit={(e) => e.preventDefault()}>
          {tab === "signup" && (
            <div className="animate-stamp-fade-in">
              <label className="mb-1 block text-xs font-semibold text-slate-600">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/>
                <Input type="text" placeholder="Your name" value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="rounded-xl border-slate-200 bg-slate-50 pl-9 text-sm focus-visible:ring-brand"/>
              </div>
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/>
              <Input type="email" placeholder="you@example.com" value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="rounded-xl border-slate-200 bg-slate-50 pl-9 text-sm focus-visible:ring-brand"/>
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-600">Password</label>
              {tab === "login" && (
                <button type="button" className="text-[11px] font-medium text-brand hover:underline">
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/>
              <Input type={showPwd ? "text" : "password"} placeholder="••••••••" value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                className="rounded-xl border-slate-200 bg-slate-50 pl-9 pr-10 text-sm focus-visible:ring-brand"/>
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPwd ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
              </button>
            </div>
          </div>

          <Button type="submit"
            className="mt-1 w-full rounded-xl bg-brand py-5 text-sm font-semibold text-white hover:bg-blue-700">
            {tab === "login" ? "Log in" : "Create account"}
            <ArrowRight className="ml-2 h-4 w-4"/>
          </Button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-100"/>
          <span className="text-xs text-slate-400">or continue with</span>
          <div className="h-px flex-1 bg-slate-100"/>
        </div>

        {/* Social buttons */}
        <div className="flex justify-center gap-3">
          {/* Google */}
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-card transition-shadow hover:shadow-card-md">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>
          {/* Facebook */}
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-card transition-shadow hover:shadow-card-md">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          {/* Apple */}
          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-card transition-shadow hover:shadow-card-md">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
          </button>
        </div>
      </div>

      <p className="relative mt-6 text-center text-xs text-slate-400">
        By continuing, you agree to our{" "}
        <button className="text-brand hover:underline">Terms</button> and{" "}
        <button className="text-brand hover:underline">Privacy Policy</button>.
      </p>
    </div>
  );
}
