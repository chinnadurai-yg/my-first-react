"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { coursesData } from "../data/courses";

interface Application {
  id: number;
  fullName: string;
  createdAt: string;
  position: string;
  status: string;
}

interface LoginEntry {
  id: number;
  email: string;
  timestamp: string;
  userAgent: string;
  ip: string;
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/applications");
        if (res.ok) {
          const data = await res.json();
          setApplications(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const stats = [
    { label: "Total Students", value: "124,800", delta: "+12.4%", trend: "up", icon: "👥", color: "from-blue-500 to-cyan-500", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20", active: "4", inactive: "0", activeLabel: "New this month", inactiveLabel: "Dropped" },
    { label: "Active Courses", value: String(coursesData.length), delta: "+3 new", trend: "up", icon: "📚", color: "from-orange-500 to-amber-500", bg: "bg-orange-50 dark:bg-orange-500/10", border: "border-orange-100 dark:border-orange-500/20", active: String(coursesData.length), inactive: "0", activeLabel: "Published", inactiveLabel: "Draft" },
    { label: "Revenue (MTD)", value: "₹8,24,500", delta: "+19.2%", trend: "up", icon: "💰", color: "from-emerald-500 to-teal-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-500/20", active: "₹6,31,200", inactive: "₹1,93,300", activeLabel: "Completed", inactiveLabel: "Pending" },
    { 
      label: "Applications", 
      value: loading ? "..." : String(applications.length), 
      delta: applications.length > 0 ? "+New" : "0", 
      trend: "up", 
      icon: "📋", 
      color: "from-purple-500 to-indigo-500", 
      bg: "bg-purple-50 dark:bg-purple-500/10", 
      border: "border-purple-100 dark:border-purple-500/20", 
      active: String(applications.filter(a => a.status !== 'Pending').length), 
      inactive: String(applications.filter(a => a.status === 'Pending').length), 
      activeLabel: "Reviewed", 
      inactiveLabel: "Pending" 
    },
  ];

  const recentActivity = applications.slice(0, 5).map(app => ({
    user: app.fullName,
    action: "submitted application for",
    target: app.position,
    time: new Date(app.createdAt).toLocaleDateString(),
    avatar: "from-blue-400 to-indigo-500",
    initials: app.fullName.slice(0, 2).toUpperCase()
  }));

  const contentCards = [
    { label: "Header Menu", desc: "Edit navigation links shown on the public site", href: "/admin/content/header", icon: "🔗", color: "from-indigo-500 to-blue-500" },
    { label: "Hero Banner", desc: "Edit the headline, subtitle and CTA on the home page", href: "/admin/content/hero", icon: "🖼️", color: "from-orange-500 to-pink-500" },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Welcome Banner */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-800 dark:to-slate-950 p-8 shadow-xl shadow-slate-900/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>
        <div className="relative z-10">
          <h1 className="text-2xl font-extrabold text-white mb-1 tracking-tight">Welcome Back, Admin 👋</h1>
          <p className="text-slate-400 text-sm font-medium">Manage EduSpark&apos;s data and content from here.</p>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className={`rounded-2xl border ${stat.border} ${stat.bg} p-5 hover:shadow-lg transition-all duration-300 group`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white leading-none tracking-tight">{stat.value}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{stat.label}</p>
              </div>
            </div>
            <div className="border-t border-black/5 dark:border-white/5 pt-3 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-300">{stat.activeLabel}:</span> {stat.active}
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-300">{stat.inactiveLabel}:</span> {stat.inactive}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Content Management */}
      <section>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Content Management</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {contentCards.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-xl hover:shadow-orange-500/5 transition-all no-underline"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl shadow-sm shrink-0 group-hover:rotate-6 transition-transform`}>
                {card.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{card.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{card.desc}</p>
              </div>
              <svg className="w-5 h-5 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all shrink-0" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Grid: Courses + Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Courses table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-slate-800 dark:text-white">Active Courses</h2>
            <Link href="/courses" target="_blank" className="text-xs text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-bold no-underline transition-colors bg-orange-50 dark:bg-orange-500/10 px-3 py-1 rounded-full">
              View Site →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {coursesData.slice(0, 4).map((course, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg ${course.color} flex items-center justify-center text-lg shrink-0 shadow-sm transition-transform group-hover:scale-105`}>
                          {course.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 dark:text-slate-200 truncate text-[13px] group-hover:text-orange-500 transition-colors">{course.title}</p>
                          <p className="text-[11px] text-slate-400 font-medium">{course.instructor}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{course.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity (Dynamic from Applications) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-slate-800 dark:text-white">Recent Activity</h2>
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Feed
            </span>
          </div>
          <div className="space-y-1">
            {recentActivity.length > 0 ? recentActivity.map((act, i) => (
              <div key={i} className="flex items-center gap-3 py-3.5 border-b border-slate-50 dark:border-slate-800 last:border-0 group">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${act.avatar} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm border-2 border-white dark:border-slate-800 group-hover:scale-110 transition-transform`}>
                  {act.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-snug">
                    <span className="font-bold text-slate-900 dark:text-white">{act.user}</span>{" "}
                    {act.action}{" "}
                    <span className="font-semibold text-orange-500">{act.target}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 font-medium">{act.time}</p>
                </div>
              </div>
            )) : (
              <div className="py-10 text-center text-slate-400 text-sm italic">
                No recent activity to show
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
