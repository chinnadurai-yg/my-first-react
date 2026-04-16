export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-6">
      <div className="max-w-2xl text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 mb-6">
          Legal
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Welcome{" "}
          <span className="bg-gradient-to-r from-gray-600 to-violet-600 bg-clip-text text-transparent">
            Privacy Policy
          </span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
          Your privacy matters to us. This page outlines how we collect, use, and protect your personal information when you use our services.
        </p>
      </div>
    </div>
  );
}
