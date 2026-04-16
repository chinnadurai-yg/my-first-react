import Link from "next/link";

const categories = [
  { icon: "🎨", title: "Design", courseCount: "120 courses", color: "from-pink-500 to-rose-400" },
  { icon: "💻", title: "Development", courseCount: "350 courses", color: "from-blue-500 to-cyan-500" },
  { icon: "📈", title: "Marketing", courseCount: "95 courses", color: "from-orange-500 to-yellow-400" },
  { icon: "💼", title: "Business", courseCount: "150 courses", color: "from-emerald-500 to-teal-400" },
];

export default function FeaturedCategories() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Explore Top Categories
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Find the perfect course to advance your skills. Choose from hundreds of topics ranging from programming to art.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <Link href="/courses" key={i} className="group block p-6 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:shadow-slate-200 dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 no-underline">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-2xl mb-6 shadow-md`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">
                {category.title}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {category.courseCount}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
