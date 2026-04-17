import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PublicChrome from "./components/PublicChrome";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { SiteContentProvider } from "./context/SiteContentContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduSpark | Top Online Courses",
  description: "Master new skills with our world-class online courses. Welcome to EduSpark.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AdminAuthProvider>
          <SiteContentProvider>
            {/*
              PublicChrome renders Header + <main> + Footer only for public routes.
              On /admin/* routes it renders children directly — the admin layout
              (sidebar) takes over via app/admin/layout.tsx.
            */}
            <PublicChrome>{children}</PublicChrome>
          </SiteContentProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
