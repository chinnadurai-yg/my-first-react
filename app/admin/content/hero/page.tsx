"use client";

import { useState } from "react";
import { useSiteContent, HeroContent, defaultHeroContent } from "../../../context/SiteContentContext";

export default function HeroBannerEditor() {
  const { heroContent, updateHeroContent } = useSiteContent();
  const [form, setForm] = useState<HeroContent>(heroContent);
  const [saved, setSaved] = useState(false);

  const update = (field: keyof HeroContent, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const save = async () => {
    await updateHeroContent(form);
    setSaved(true);
  };

  const reset = () => {
    setForm(defaultHeroContent);
    setSaved(false);
  };

  const fields: { key: keyof HeroContent; label: string; hint: string; multiline?: boolean }[] = [
    { key: "badge", label: "Badge Text", hint: "The small pill label at the top of the hero (e.g. 🚀 announcement text)" },
    { key: "title", label: "Headline — Part 1", hint: 'Text before the highlighted word, e.g. "Unlock Your"' },
    { key: "titleHighlight", label: "Headline — Highlighted Word", hint: "This word is rendered with the gradient shimmer effect" },
    { key: "titleEnd", label: "Headline — Part 3", hint: 'Text after the highlighted word, e.g. "Potential"' },
    { key: "subtitle", label: "Subtitle / Description", hint: "The paragraph below the headline", multiline: true },
    { key: "ctaPrimary", label: "Primary CTA Button", hint: 'Label for the main orange button, e.g. "Start Learning Now"' },
    { key: "ctaSecondary", label: "Secondary CTA Button", hint: 'Label for the outline button, e.g. "Sign Up Free"' },
  ];

  return (
    <div className="max-w-2xl space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">Hero Banner</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Edit the content shown in the home page hero section. Save to publish changes to the live site.
        </p>
      </div>

      {/* Fields */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        {fields.map((f) => (
          <div key={f.key} className="px-5 py-5">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1" htmlFor={`hero-${f.key}`}>
              {f.label}
            </label>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">{f.hint}</p>
            {f.multiline ? (
              <textarea
                id={`hero-${f.key}`}
                rows={3}
                value={form[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 outline-none text-slate-800 dark:text-slate-200 transition-all resize-none leading-relaxed"
              />
            ) : (
              <input
                id={`hero-${f.key}`}
                type="text"
                value={form[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 outline-none text-slate-800 dark:text-slate-200 transition-all"
              />
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={save}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          Save & Publish
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
            Saved! Changes are live on the home page.
          </span>
        )}
      </div>

      {/* Live Preview Card */}
      <div>
        <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Live Preview</h2>
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-7 overflow-hidden relative">
          {/* blob */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange-400/10 dark:bg-orange-600/10 blur-2xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            {form.badge || "Badge text…"}
          </div>

          {/* Headline */}
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-3">
            {form.title}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#f97316,#ec4899,#f59e0b)" }}
            >
              {form.titleHighlight}
            </span>{" "}
            {form.titleEnd}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5 max-w-md">
            {form.subtitle || "Subtitle text…"}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-md shadow-orange-500/30">
              {form.ctaPrimary || "Primary CTA"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
            <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-white/5">
              {form.ctaSecondary || "Secondary CTA"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
