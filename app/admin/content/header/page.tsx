"use client";

import { useState } from "react";
import { useSiteContent, NavLinkItem, defaultNavLinks } from "../../../context/SiteContentContext";

let idCounter = Date.now();
const nextId = () => `nav-${++idCounter}`;

export default function HeaderMenuEditor() {
  const { navLinks, updateNavLinks } = useSiteContent();
  const [links, setLinks] = useState<NavLinkItem[]>(navLinks);
  const [saved, setSaved] = useState(false);

  // ── Helpers ──────────────────────────────────────────────────
  const update = (id: string, field: "label" | "href", value: string) => {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
    setSaved(false);
  };
  const remove = (id: string) => { setLinks((prev) => prev.filter((l) => l.id !== id)); setSaved(false); };
  const addLink = () => { setLinks((prev) => [...prev, { id: nextId(), label: "New Link", href: "/" }]); setSaved(false); };
  const moveUp = (i: number) => {
    if (i === 0) return;
    const next = [...links];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setLinks(next);
    setSaved(false);
  };
  const moveDown = (i: number) => {
    if (i === links.length - 1) return;
    const next = [...links];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    setLinks(next);
    setSaved(false);
  };
  const save = async () => { await updateNavLinks(links); setSaved(true); };
  const reset = () => { setLinks(defaultNavLinks); setSaved(false); };

  return (
    <div className="max-w-2xl space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Header Menu</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Edit the navigation links that appear in the public site header. Changes are reflected immediately after saving.
        </p>
      </div>

      {/* Editor Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">

        {/* Column headers */}
        <div className="grid grid-cols-[1fr_1fr_auto] gap-4 px-5 py-3 bg-slate-50 dark:bg-slate-800/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <span>Label</span>
          <span>URL / Path</span>
          <span className="w-20 text-center">Order</span>
        </div>

        {links.map((link, i) => (
          <div key={link.id} className="grid grid-cols-[1fr_1fr_auto] gap-4 px-5 py-4 items-center group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
            {/* Label */}
            <input
              type="text"
              value={link.label}
              onChange={(e) => update(link.id, "label", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 outline-none text-slate-800 dark:text-slate-200 transition-all"
              placeholder="Label"
            />
            {/* Href */}
            <input
              type="text"
              value={link.href}
              onChange={(e) => update(link.id, "href", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 outline-none text-slate-800 dark:text-slate-200 font-mono transition-all"
              placeholder="/path"
            />
            {/* Controls */}
            <div className="flex items-center gap-1 w-20 justify-end">
              <button onClick={() => moveUp(i)} disabled={i === 0} title="Move Up" className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75 12 8.25l7.5 7.5" /></svg>
              </button>
              <button onClick={() => moveDown(i)} disabled={i === links.length - 1} title="Move Down" className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
              </button>
              <button onClick={() => remove(link.id)} title="Remove" className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all cursor-pointer">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        ))}

        {/* Add Link */}
        <div className="px-5 py-3">
          <button
            onClick={addLink}
            className="flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Navigation Link
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={save}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          Save Changes
        </button>
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
        >
          Reset to Default
        </button>

        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Saved! Changes are live on the site.
          </span>
        )}
      </div>

      {/* Preview */}
      <div>
        <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Live Preview</h2>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 px-5 py-4 flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 mr-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-sm">🎓</div>
            <span className="text-sm font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">EduSpark</span>
          </div>
          {links.map((l) => (
            <span key={l.id} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
