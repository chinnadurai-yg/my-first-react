import Link from "next/link";

import { coursesData as courses } from "../../data/courses";

export default function PopularCourses() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Popular Courses
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              Join our most enrolled classes and start learning today with top-rated instructors.
            </p>
          </div>
          <Link href="/courses" className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold hover:text-orange-700 dark:hover:text-orange-300 transition-colors">
            View All Courses
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <Link 
              href={`/courses/${course.slug}`} 
              key={i} 
              className="flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group no-underline"
            >
              <div className={`h-48 ${course.color} relative p-6 flex flex-col items-center justify-center`}>
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-bold rounded-full text-slate-800 dark:text-slate-200">
                  {course.tag}
                </span>
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {course.icon}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-1 text-yellow-500 mb-3 text-sm font-semibold">
                  ⭐ {course.rating} <span className="text-slate-400 dark:text-slate-500 font-normal">({course.students})</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  By {course.instructor}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {course.price}
                  </span>
                  {/* Replaced <button> with a styled <div> to avoid invalid nesting (a inside a) or button inside a Link */}
                  <div className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold rounded-xl group-hover:bg-orange-500 group-hover:text-white dark:group-hover:bg-orange-500 dark:group-hover:text-white transition-colors">
                    Enroll Now
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
