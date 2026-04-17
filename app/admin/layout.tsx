"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuth } from "../context/AdminAuthContext";

/* ── Inline SVG icons ──────────────────────────────────────── */
const IconDashboard = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
  </svg>
);
const IconMenu = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const IconImage = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);
const IconBook = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);
const IconClipboard = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
  </svg>
);
const IconSignOut = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
  </svg>
);
const IconExternalLink = () => (
  <svg className="w-3 h-3 ml-auto opacity-40 group-hover:opacity-80 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

const IconLock = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

/* ── Sidebar link groups ─────────────────────────────────────── */
const sidebarGroups = [
  {
    group: "Main",
    items: [
      { label: "Dashboard", href: "/admin", icon: <IconDashboard />, exact: true },
      { label: "Login History", href: "/admin/logins", icon: <IconLock /> },
    ],
  },
  {
    group: "Content",
    items: [
      { label: "Header Menu", href: "/admin/content/header", icon: <IconMenu /> },
      { label: "Hero Banner", href: "/admin/content/hero", icon: <IconImage /> },
    ],
  },
  {
    group: "Site",
    items: [
      { label: "Courses", href: "/courses", icon: <IconBook />, external: true },
      { label: "Applications", href: "/admin/applications", icon: <IconClipboard /> },
    ],
  },
];

/* ── Page title from pathname ────────────────────────────────── */
function getPageTitle(pathname: string): string {
  if (pathname === "/admin") return "Dashboard";
  if (pathname === "/admin/logins") return "Login History";
  if (pathname === "/admin/content/header") return "Header Menu";
  if (pathname === "/admin/content/hero") return "Hero Banner";
  return "Admin";
}

/* ────────────────────────────────────────────────────────────── */
export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdminLoggedIn, adminEmail, loading, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Login page: render as-is (no sidebar wrapper) ─────────
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // ── While checking localStorage, show a minimal loader ─────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-xl animate-pulse">🎓</div>
          <p className="text-sm text-slate-400 font-medium">Loading admin panel…</p>
        </div>
      </div>
    );
  }

  // ── Not authenticated → redirect to admin login ─────────────
  if (!isAdminLoggedIn) {
    router.replace("/admin/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const initials = adminEmail ? adminEmail.split("@")[0].slice(0, 2).toUpperCase() : "AD";
  const pageTitle = getPageTitle(pathname);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex">

      {/* ── Mobile Overlay ─────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══════════════════════════════════════════════════════════
          SIDEBAR
      ═══════════════════════════════════════════════════════════ */}
      <aside
        className={`fixed top-0 left-0 h-full w-[260px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 flex flex-col shadow-xl shadow-black/5
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-[64px] border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-lg shadow-md shadow-orange-500/30 shrink-0">
            🎓
          </div>
          <div>
            <p className="text-[15px] font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent tracking-tight leading-none">
              EduSpark
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-6">
          {sidebarGroups.map((group) => (
            <div key={group.group}>
              <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                {group.group}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href, (item as { exact?: boolean }).exact);
                  const isExternal = (item as { external?: boolean }).external;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 no-underline
                        ${active
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md shadow-orange-500/25"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                        }`}
                    >
                      <span className={`shrink-0 ${active ? "text-white" : "text-slate-400 dark:text-slate-500 group-hover:text-orange-500 transition-colors"}`}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                      {isExternal && <IconExternalLink />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-slate-800 dark:text-white leading-tight">Admin</p>
              <p className="text-[11px] text-slate-400 truncate">{adminEmail}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all cursor-pointer shrink-0"
            >
              <IconSignOut />
            </button>
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════════════════════════════════
          MAIN CONTENT AREA
      ═══════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-[260px]">

        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-5 h-[64px] flex items-center justify-between gap-4 shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <IconMenu />
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
              <Link href="/admin" className="text-slate-400 dark:text-slate-500 hover:text-orange-500 transition-colors font-medium no-underline">
                Dashboard
              </Link>
              {pageTitle !== "Dashboard" && (
                <>
                  <span className="text-slate-300 dark:text-slate-600 select-none">/</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">{pageTitle}</span>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-orange-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all no-underline"
            >
              <IconExternalLink />
              View Site
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {initials}
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 hidden sm:block">
                {adminEmail?.split("@")[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
