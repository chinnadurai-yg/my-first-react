"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { coursesData } from "../data/courses";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [showProfile, setShowProfile] = useState(false);
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
        setShowProfile(false);
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

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

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

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Right Side Controls ── */}
        <div className="flex items-center gap-3">

          {/* Search Bar */}
          <div className="relative hidden lg:block" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onFocus={() => setShowSearch(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearch(true);
                }}
                className="w-48 xl:w-64 pl-10 pr-4 py-2 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all dark:text-white"
              />
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            {/* Search Dropdown */}
            {showSearch && (
              <div className="absolute top-full right-0 mt-3 w-80 max-h-96 overflow-y-auto bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl shadow-black/10 flex flex-col z-50">
                {filteredCourses.length > 0 ? (
                  <div className="p-2 flex flex-col gap-1">
                    <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Available Courses
                    </div>
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
                          <p className="text-sm font-semibold text-slate-800 dark:text-gray-200 truncate group-hover:text-orange-500 transition-colors">
                            {course.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {course.instructor} • {course.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl mb-2">🔍</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      No courses found for &quot;{searchQuery}&quot;
                    </p>
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

          {/* Login Link */}
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

          {/* Profile Dropdown */}
          <div className="relative hidden md:block" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              aria-label="Profile Menu"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md hover:shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <span className="font-bold text-sm tracking-wide">US</span>
            </button>
            {showProfile && (
              <div className="absolute top-full right-0 mt-3 w-52 bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl shadow-black/10 flex flex-col z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-black/5 dark:border-white/5">
                  <p className="text-sm font-bold text-slate-800 dark:text-gray-200">User Profile</p>
                  <p className="text-xs text-slate-500 mt-0.5">student@eduspark.com</p>
                </div>
                <div className="py-1">
                  <Link href="/apply" onClick={() => setShowProfile(false)} className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600 transition-colors font-medium no-underline">
                    Apply for Position
                  </Link>
                  <Link href="/applications" onClick={() => setShowProfile(false)} className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-orange-600 transition-colors font-medium no-underline">
                    My Applications
                  </Link>
                  <div className="border-t border-black/5 dark:border-white/5 my-1"></div>
                  <Link href="#" onClick={() => setShowProfile(false)} className="block px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-medium no-underline">
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>

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
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 bg-white/95 dark:bg-slate-950/97 border-t border-black/10 dark:border-white/8 ${menuOpen ? "max-h-[36rem]" : "max-h-0"}`}
      >
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
          {/* Mobile Search Results */}
          {searchQuery && (
            <div className="mt-3 flex flex-col gap-1 max-h-48 overflow-y-auto rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 p-2">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    onClick={() => {
                      setMenuOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors no-underline"
                  >
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${course.color}`}>
                      <span className="text-sm">{course.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 dark:text-gray-200 truncate">
                        {course.title}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-gray-500">No courses match &quot;{searchQuery}&quot;</div>
              )}
            </div>
          )}
        </div>

        <nav className="flex flex-col px-6 py-2 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 border-b border-black/5 dark:border-white/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Profile Actions */}
          <div className="py-2 flex flex-col gap-1 border-b border-black/5 dark:border-white/5">
            <span className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Account</span>
            <Link
              href="/apply"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 transition-all font-semibold"
            >
              Apply for Position
            </Link>
            <Link
              href="/applications"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 transition-all font-semibold"
            >
              My Applications
            </Link>
          </div>

          {/* Mobile Login / Register */}
          <div className="flex gap-2 mt-3">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex-1 px-5 py-3 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 text-center no-underline hover:border-orange-400 hover:text-orange-600 transition-all duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="flex-1 px-5 py-3 rounded-full text-sm font-semibold text-white text-center bg-gradient-to-r from-orange-500 to-pink-500 shadow-md shadow-orange-500/30 no-underline"
            >
              Register Free
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
