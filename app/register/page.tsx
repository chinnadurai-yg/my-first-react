import Link from "next/link";
import AuthLayout from "../components/auth/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join millions of learners on EduSpark for free."
      footerText="Already have an account?"
      footerLinkText="Sign In"
      footerLinkHref="/login"
      maxWidthClass="max-w-xl"
    >
      <form className="flex flex-col gap-5">
        
        {/* Split Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="firstName">
              First Name
            </label>
            <input 
              id="firstName" 
              type="text" 
              placeholder="John" 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-slate-800 dark:text-slate-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="lastName">
              Last Name
            </label>
            <input 
              id="lastName" 
              type="text" 
              placeholder="Doe" 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-slate-800 dark:text-slate-200"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="email">
            Email Address
          </label>
          <input 
            id="email" 
            type="email" 
            placeholder="you@example.com" 
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-slate-800 dark:text-slate-200"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="password">
            Password
          </label>
          <input 
            id="password" 
            type="password" 
            placeholder="Create a strong password" 
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-slate-800 dark:text-slate-200"
            required
          />
        </div>

        {/* T&C Checkbox */}
        <div className="flex items-start gap-3 mt-1">
          <input 
            id="terms" 
            type="checkbox" 
            className="mt-1 w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500 dark:border-slate-600 dark:bg-slate-800"
            required
          />
          <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            I agree to EduSpark's{" "}
            <Link href="/terms" className="text-orange-600 dark:text-orange-400 font-bold hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-orange-600 dark:text-orange-400 font-bold hover:underline">Privacy Policy</Link>.
          </label>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="mt-4 w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-300"
        >
          Create Account
        </button>
      </form>
    </AuthLayout>
  );
}
