"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";

interface Application {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  createdAt: string;
}

export default function ApplicationsPage() {
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />

      <main className="pt-28 pb-16 px-6 max-w-7xl mx-auto relative">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Applications</span>
              Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Manage and review submitted applications.
            </p>
          </div>

          <div className="flex shrink-0">
            <span className="px-4 py-2 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {applications.length} Total Entries
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 mb-8 font-semibold flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 overflow-hidden relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                  <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider">Candidate</th>
                  <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider">Contact</th>
                  <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider">Position</th>
                  <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider">Applied On</th>
                  <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="py-4 px-6"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div></td>
                      <td className="py-4 px-6"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div></td>
                      <td className="py-4 px-6"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div></td>
                      <td className="py-4 px-6"><div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20"></div></td>
                      <td className="py-4 px-6"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div></td>
                      <td className="py-4 px-6 text-right"><div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16 ml-auto"></div></td>
                    </tr>
                  ))
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 px-6 text-center text-slate-500 dark:text-slate-400">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-4xl mb-4">📭</span>
                        <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">No applications found</p>
                        <p className="text-sm mt-1">When someone applies, it will show up here.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                          {app.fullName}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-slate-600 dark:text-slate-300">{app.email}</div>
                        <div className="text-xs text-slate-400">{app.phone}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-xs font-semibold border border-orange-100 dark:border-orange-500/20">
                          {app.position}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${app.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                          : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                          }`}>
                          {app.status === 'Pending' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {new Date(app.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditModalApp(app)}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
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
      </main>

      {/* Edit Modal Popup */}
      {editModalApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform scale-100 transition-transform">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h2 className="font-extrabold text-2xl text-slate-900 dark:text-white">Edit Application</h2>
              <button
                onClick={() => setEditModalApp(null)}
                className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-5 flex flex-col">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Candidate Name</label>
                <input
                  type="text"
                  value={editModalApp.fullName}
                  onChange={(e) => setEditModalApp({ ...editModalApp, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Position</label>
                  <input
                    type="text"
                    value={editModalApp.position}
                    onChange={(e) => setEditModalApp({ ...editModalApp, position: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Status</label>
                  <select
                    value={editModalApp.status}
                    onChange={(e) => setEditModalApp({ ...editModalApp, status: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white cursor-pointer focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all appearance-none"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 mt-2 border-t border-slate-100 dark:border-slate-800 pt-6">
                <button
                  type="button"
                  onClick={() => setEditModalApp(null)}
                  className="px-6 py-2.5 rounded-xl font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md shadow-blue-500/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
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
