"use client";

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2 w-full sm:w-auto"
    >
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 sm:w-64 px-4 py-2.5 rounded-full bg-white/8 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
      />
      <button
        type="submit"
        className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-500 hover:shadow-lg hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap cursor-pointer"
      >
        Subscribe
      </button>
    </form>
  );
}
