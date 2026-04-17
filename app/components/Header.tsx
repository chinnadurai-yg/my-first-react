"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { coursesData } from "../data/courses";
import { useSiteContent } from "../context/SiteContentContext";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function Header() {
  const { navLinks, loading } = useSiteContent();
  const { isAdminLoggedIn, adminEmail, logout } = useAdminAuth();

  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const filteredCourses = searchQuery
    ? coursesData.filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : coursesData;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition duration-300
        ${scrolled
          ? "bg-white/85 dark:bg-slate-950/90 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-lg shadow-black/10"
          : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-orange-500/40 group-hover:shadow-orange-500/60 transition-shadow duration-300">
            🎓
          </div>
          <span className="text-xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
            EduSpark
          </span>
        </Link>

        {/* ── Desktop Nav — driven by SiteContentContext ── */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Right Controls ── */}
        <div className="flex items-center gap-3">

          {/* Search Bar */}
          <div className="relative hidden lg:block" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onFocus={() => setShowSearch(true)}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
                className="w-48 xl:w-64 pl-10 pr-4 py-2 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all dark:text-white"
              />
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            {showSearch && (
              <div className="absolute top-full right-0 mt-3 w-80 max-h-96 overflow-y-auto bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl shadow-black/10 flex flex-col z-50">
                {filteredCourses.length > 0 ? (
                  <div className="p-2 flex flex-col gap-1">
                    <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Available Courses</div>
                    {filteredCourses.map((course) => (
                      <Link
                        key={course.slug}
                        href={`/courses/${course.slug}`}
                        onClick={() => setShowSearch(false)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group no-underline"
                      >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${course.color}`}>
                          <span className="text-xl group-hover:scale-110 transition-transform">{course.icon}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800 dark:text-gray-200 truncate group-hover:text-orange-500 transition-colors">{course.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{course.instructor} • {course.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl mb-2">🔍</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No courses found for &quot;{searchQuery}&quot;</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-200 cursor-pointer"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {isAdminLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 p-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:border-orange-300 dark:hover:border-orange-700 transition-all cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {adminEmail?.split("@")[0].slice(0, 2).toUpperCase()}
                </div>
                <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute top-full right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl shadow-black/10 flex flex-col z-50 overflow-hidden animate-fade-in-up">
                  <div className="p-4 border-b border-black/5 dark:border-white/5 bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{adminEmail}</p>
                  </div>
                  <div className="p-1.5">
                    <Link
                      href="/admin"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-all no-underline"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg>
                      Admin Panel
                    </Link>
                    <Link
                      href="/apply"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-all no-underline"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>
                      Application Form
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Login */}
              <Link
                href="/login"
                id="login-btn"
                className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 no-underline"
              >
                Login
              </Link>

              {/* Register CTA */}
              <Link
                href="/register"
                id="register-btn"
                className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-200 no-underline"
              >
                Register Free
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </>
          )}

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-200 cursor-pointer p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-800 dark:bg-white rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-800 dark:bg-white rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-800 dark:bg-white rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 bg-white/95 dark:bg-slate-950/97 border-t border-black/10 dark:border-white/8 ${menuOpen ? "max-h-[36rem]" : "max-h-0"}`}>
        {/* Mobile Search */}
        <div className="px-6 pt-4 pb-2 border-b border-black/5 dark:border-white/5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-xl text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all dark:text-white"
            />
            <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          {searchQuery && (
            <div className="mt-3 flex flex-col gap-1 max-h-48 overflow-y-auto rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 p-2">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    onClick={() => { setMenuOpen(false); setSearchQuery(""); }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors no-underline"
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${course.color}`}>
                      <span className="text-sm">{course.icon}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-gray-200 truncate">{course.title}</p>
                  </Link>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-gray-500">No courses match &quot;{searchQuery}&quot;</div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Nav Links — driven by SiteContentContext */}
        <nav className="flex flex-col px-6 py-2 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 border-b border-black/5 dark:border-white/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Account */}
          <div className="py-2 flex flex-col gap-1 border-b border-black/5 dark:border-white/5">
            <span className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Account</span>
            <Link href="/apply" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 transition-all">Apply for Position</Link>
          </div>

          {/* Mobile Login / Register */}
          <div className="flex gap-2 mt-3">
            {isAdminLoggedIn ? (
              <>
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 px-5 py-3 rounded-full text-sm font-bold text-white text-center bg-gradient-to-r from-orange-500 to-pink-500 shadow-md shadow-orange-500/30 no-underline"
                >
                  Admin Panel
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="flex-1 px-5 py-3 rounded-full text-sm font-semibold text-red-600 border border-red-200 text-center bg-red-50 dark:bg-red-950/20 dark:border-red-900/40"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 px-5 py-3 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 text-center no-underline hover:border-orange-400 hover:text-orange-600 transition-all duration-200">Login</Link>
                <Link href="/register" onClick={() => setMenuOpen(false)} className="flex-1 px-5 py-3 rounded-full text-sm font-semibold text-white text-center bg-gradient-to-r from-orange-500 to-pink-500 shadow-md shadow-orange-500/30 no-underline">Register Free</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
