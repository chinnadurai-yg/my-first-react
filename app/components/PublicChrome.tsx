"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Conditionally renders the public site chrome (Header + Footer).
 * On /admin/* routes, admin pages handle their own layout (sidebar).
 * This keeps the public site and admin panel completely isolated.
 */
export default function PublicChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    // Admin pages render with NO public header/footer.
    // The admin layout handles its own sidebar + topbar.
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="pt-[68px] min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
