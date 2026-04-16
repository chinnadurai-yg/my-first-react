export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-6">
      <div className="max-w-2xl text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 mb-6">
          Get In Touch
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Welcome{" "}
          <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            Contact
          </span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
          Have a project in mind or just want to say hello? We&apos;d love to hear from you. Reach out and let&apos;s start a conversation.
        </p>
      </div>
    </div>
  );
}
