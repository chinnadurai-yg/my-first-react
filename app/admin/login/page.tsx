"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simulate slight network delay for feel
    await new Promise((r) => setTimeout(r, 600));
    const success = login(email, password);
    setLoading(false);
    if (success) {
      router.push("/admin");
    } else {
      setError("Invalid admin credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden py-16">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-indigo-600/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-orange-600/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-2.5 mb-6 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-2xl shadow-xl shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow duration-300">
              🎓
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              EduSpark
            </span>
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Admin Portal
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Admin Sign In
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Authorised personnel only. Access is monitored.
          </p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/5 p-8">
          {error && (
            <div className="mb-5 flex items-center gap-3 px-4 py-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5" htmlFor="admin-email">
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@eduspark.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all text-slate-200 placeholder:text-slate-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5" htmlFor="admin-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-950/60 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all text-slate-200 placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Hint */}
            <p className="text-xs text-slate-500 -mt-1">
              Demo credentials: <span className="text-slate-400 font-mono">admin@eduspark.com</span> / <span className="text-slate-400 font-mono">admin123</span>
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              id="admin-login-btn"
              className="mt-2 w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  Access Dashboard
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to site */}
        <p className="text-center text-sm text-slate-500 mt-6">
          <Link href="/" className="text-slate-400 hover:text-orange-400 transition-colors font-medium">
            ← Back to EduSpark
          </Link>
        </p>
      </div>
    </div>
  );
}
