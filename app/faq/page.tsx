export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-6">
      <div className="max-w-2xl text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-yellow-100 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400 mb-6">
          Questions & Answers
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Welcome{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            FAQ
          </span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
          Got questions? We&apos;ve got answers. Browse through our frequently asked questions to find the information you&apos;re looking for.
        </p>
      </div>
    </div>
  );
}
