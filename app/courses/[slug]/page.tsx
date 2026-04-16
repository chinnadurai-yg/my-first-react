import Link from "next/link";
import { notFound } from "next/navigation";

// For demo purposes, we define a small mock DB here to match the slugs
const mockDatabase = {
  "complete-web-development-bootcamp": {
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    rating: "4.9",
    students: "45,000",
    price: "$89.99",
    description: "Learn HTML, CSS, JavaScript, React, Node, and more! Build 15+ real world projects.",
    color: "bg-blue-100 dark:bg-blue-900/30",
    icon: "🌐",
    modules: ["HTML & CSS Basis", "JavaScript Fundamentals", "React Masterclass", "Node.js Backend", "Deployment & CI/CD"],
  },
  "advanced-ui-ux-design": {
    title: "Advanced UI/UX Design Fundamentals",
    instructor: "Gary Simon",
    rating: "4.8",
    students: "22,500",
    price: "$69.99",
    description: "Master typography, color theory, layout components, and prototyping in Figma.",
    color: "bg-pink-100 dark:bg-pink-900/30",
    icon: "✨",
    modules: ["Design Theory", "Color & Typography", "Wireframing", "High Fidelity Design", "Prototyping & Handoff"],
  },
  "machine-learning-a-z": {
    title: "Machine Learning A-Z: Python & R",
    instructor: "Kirill Eremenko",
    rating: "4.7",
    students: "68,000",
    price: "$94.99",
    description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.",
    color: "bg-emerald-100 dark:bg-emerald-900/30",
    icon: "🤖",
    modules: ["Data Preprocessing", "Regression Techniques", "Classification", "Deep Learning", "Dimensionality Reduction"],
  }
};

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const course = mockDatabase[resolvedParams.slug as keyof typeof mockDatabase];

  if (!course) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* ── Breadcrumb & Header ── */}
      <div className={`w-full py-16 ${course.color} border-b border-black/5 dark:border-white/5`}>
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition flex items-center gap-2 mb-8 inline-flex">
            &larr; Back to Home
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="w-32 h-32 rounded-3xl bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center text-6xl flex-shrink-0">
              {course.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight tracking-tight">
                {course.title}
              </h1>
              <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
                Taught by <span className="font-bold underline decoration-2 underline-offset-4 decoration-orange-400">{course.instructor}</span>
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                <span className="flex items-center gap-1 text-yellow-500 font-bold">
                  ⭐ {course.rating}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  {course.students} total students
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content & Checkout Frame ── */}
      <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-600 dark:text-slate-400">

        {/* Left Column (Description & Modules) */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About this Course</h2>
          <p className="text-lg leading-relaxed mb-10">
            {course.description}
          </p>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Syllabus Overview</h3>
          <ul className="flex flex-col gap-3">
            {course.modules.map((module, i) => (
              <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{module}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column (Checkout Box) */}
        <div className="md:col-span-1">
          <div className="sticky top-24 p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
            <h3 className="text-slate-500 dark:text-slate-400 font-medium tracking-widest uppercase text-xs mb-2">Price</h3>
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
              {course.price}
            </span>
            <button className="w-full py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-300">
              Buy Now
            </button>
            <p className="text-xs text-center text-slate-400 mt-4">
              30-Day Money-Back Guarantee
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
