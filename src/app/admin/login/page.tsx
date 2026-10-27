"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get("from") || "/admin/consultations";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim()
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Invalid username or password.");
        setLoading(false);
        return;
      }

      // Success - redirect to intended destination or consultations dashboard
      router.push(fromUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Network error. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Outer Card with Glassmorphism */}
      <div className="relative rounded-2xl bg-zinc-900/70 border border-white/10 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden">
        {/* Subtle Ambient Red Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#B42318]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Branding */}
        <div className="relative z-10 text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B42318] to-red-900 text-white shadow-lg shadow-red-900/40 border border-red-500/30 mb-4">
            <Shield className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-zinc-300 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Admin Gateway Protected</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white">
            TechAxis Global
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Enterprise Console • Encrypted Administrative Access
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="relative z-10 mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-red-300">Access Denied:</span> {error}
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Administrator Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                autoFocus
                autoComplete="username"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/30 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-zinc-300">
                Master Password
              </label>
              <span className="text-[11px] text-zinc-500">Fixed credentials</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
                className="w-full pl-10 pr-11 py-2.5 text-sm bg-black/40 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-white transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#B42318] to-[#991B1B] hover:from-[#991B1B] hover:to-[#7F1D1D] focus:ring-2 focus:ring-red-500/40 shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying Cryptographic Session...</span>
              </>
            ) : (
              <>
                <span>Sign In to Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Disclaimers */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Protected with <span className="text-zinc-200 font-medium">HMAC-SHA256 HttpOnly signed sessions</span>.
            All unauthorized inspection or crawling attempts on administrative paths are blocked at the edge.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">
              ← Return to Main Website
            </Link>
            <span>•</span>
            <Link href="/contact-us" className="hover:text-white transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#07090E] flex items-center justify-center px-4 py-12 relative overflow-hidden select-none">
      {/* Background Decorative Grid and Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#B42318]/10 blur-[130px] rounded-full pointer-events-none" />

      <Suspense fallback={
        <div className="text-center text-zinc-400 text-sm">
          <span className="inline-block w-4 h-4 border-2 border-zinc-600 border-t-white rounded-full animate-spin mr-2" />
          Loading secure gateway...
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
