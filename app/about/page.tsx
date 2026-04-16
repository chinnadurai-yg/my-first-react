export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-6">
      <div className="max-w-2xl text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 mb-6">
          Who We Are
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Welcome{" "}
          <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
            About
          </span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
          We are a passionate team of designers and developers building beautiful digital experiences. Our mission is to bring your ideas to life with modern design and cutting-edge technology.
        </p>
      </div>
    </div>
  );
}
