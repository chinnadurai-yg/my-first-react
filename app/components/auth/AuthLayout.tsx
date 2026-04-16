import Link from "next/link";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  maxWidthClass?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
  maxWidthClass = "max-w-md",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden py-16">
      
      {/* ── Animated Background Blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-blob absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-orange-400/20 dark:bg-orange-600/10 blur-3xl" />
        <div className="animate-blob-delay absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-pink-400/20 dark:bg-pink-600/10 blur-3xl" />
      </div>

      <div className={`relative z-10 w-full ${maxWidthClass} px-6`}>
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-xl shadow-lg shadow-orange-500/30">
              🎓
            </div>
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            {subtitle}
          </p>
        </div>

        {/* Card Frame */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100 dark:border-white/5 p-8">
          {children}
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-8">
          {footerText}{" "}
          <Link href={footerLinkHref} className="font-bold text-orange-600 dark:text-orange-400 hover:text-orange-500 hover:underline transition-colors">
            {footerLinkText}
          </Link>
        </p>
      </div>

    </div>
  );
}
