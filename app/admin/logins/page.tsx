"use client";

import { useEffect, useState } from "react";

interface LoginEntry {
  id: number;
  email: string;
  password?: string;
  timestamp: string;
  userAgent: string;
  ip: string;
}

export default function LoginHistoryPage() {
  const [logins, setLogins] = useState<LoginEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/admin/logins");
        if (res.ok) {
          const data = await res.json();
          setLogins(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Login History</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Monitor administrative access logs and credentials used.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">User Email</th>
                <th className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">Password</th>
                <th className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">Timestamp</th>
                <th className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">IP Address</th>
                <th className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">Device / Browser</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                       <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                       Loading history...
                    </div>
                  </td>
                </tr>
              ) : logins.length > 0 ? (
                logins.map((login) => (
                  <tr key={login.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xs shrink-0">
                          {login.email.slice(0, 1).toUpperCase()}
                        </div>
                        <span className="font-semibold text-slate-900 dark:text-white">{login.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-pink-600 dark:text-pink-400 font-mono text-xs">
                        {login.password || "••••••••"}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {new Date(login.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {login.ip}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[250px] block" title={login.userAgent}>
                        {login.userAgent}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-400 italic">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">📂</span>
                      <p>No login records available yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex items-center gap-2 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20 rounded-xl text-amber-700 dark:text-amber-400 text-xs">
        <span className="text-sm">⚠️</span>
        <p><strong>Security Note:</strong> Passwords are logged in plaintext for administrative review as requested. Ensure this environment is secured.</p>
      </div>
    </div>
  );
}
