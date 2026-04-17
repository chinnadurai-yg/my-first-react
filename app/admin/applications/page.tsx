"use client";

import { useEffect, useState } from "react";

interface Application {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  createdAt: string;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editModalApp, setEditModalApp] = useState<Application | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/applications");
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setApplications(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setApplications(applications.filter((app) => app.id !== id));
    } catch (err) {
      alert("Error deleting application. Please try again.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalApp) return;
    setEditLoading(true);

    try {
      const res = await fetch(`/api/applications/${editModalApp.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editModalApp),
      });

      if (!res.ok) throw new Error("Failed to update");
      const updatedApp = await res.json();

      setApplications(applications.map(app => app.id === updatedApp.id ? updatedApp : app));
      setEditModalApp(null);
    } catch (err) {
      alert("Error updating application. Please check your connection.");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Applications Management
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
            Review and manage student and instructor applications.
          </p>
        </div>

        <div className="flex shrink-0">
          <span className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {applications.length} Total Entries
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-900/50 text-sm font-semibold flex items-center gap-2">
          ⚠️ {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 px-6 font-bold text-[11px] uppercase tracking-wider">Candidate</th>
                <th className="py-4 px-6 font-bold text-[11px] uppercase tracking-wider">Contact</th>
                <th className="py-4 px-6 font-bold text-[11px] uppercase tracking-wider">Position</th>
                <th className="py-4 px-6 font-bold text-[11px] uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 font-bold text-[11px] uppercase tracking-wider">Applied On</th>
                <th className="py-4 px-6 font-bold text-[11px] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-6"><div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-2/3"></div></td>
                    <td className="py-4 px-6"><div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-full w-20"></div></td>
                    <td className="py-4 px-6"><div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/3"></div></td>
                    <td className="py-4 px-6 text-right"><div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-16 ml-auto"></div></td>
                  </tr>
                ))
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 px-6 text-center text-slate-500 dark:text-slate-400 text-sm">
                    No applications found
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-[13px] text-slate-800 dark:text-white">
                        {app.fullName}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-[12px] text-slate-600 dark:text-slate-300">{app.email}</div>
                      <div className="text-[10px] text-slate-400">{app.phone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 text-[11px] font-bold border border-orange-100 dark:border-orange-900/50">
                        {app.position}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${app.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                        : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                        }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditModalApp(app)}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all cursor-pointer"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all cursor-pointer"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editModalApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
              <h2 className="font-bold text-slate-800 dark:text-white">Edit Status</h2>
              <button
                onClick={() => setEditModalApp(null)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={editModalApp.fullName}
                  onChange={(e) => setEditModalApp({ ...editModalApp, fullName: e.target.value })}
                  className="w-full px-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
                <select
                  value={editModalApp.status}
                  onChange={(e) => setEditModalApp({ ...editModalApp, status: e.target.value })}
                  className="w-full px-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-md shadow-orange-500/20 transition-all hover:-translate-y-0.5"
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
