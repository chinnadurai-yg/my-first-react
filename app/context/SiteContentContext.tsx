"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  titleEnd: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

interface SiteContentContextType {
  navLinks: NavLinkItem[];
  heroContent: HeroContent;
  updateNavLinks: (links: NavLinkItem[]) => Promise<void>;
  updateHeroContent: (content: HeroContent) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const defaultNavLinks: NavLinkItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "courses", label: "Courses", href: "/courses" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const defaultHeroContent: HeroContent = {
  badge: "Discover a New Way of Learning 🚀",
  title: "Unlock Your",
  titleHighlight: "Creative",
  titleEnd: "Potential",
  subtitle:
    "Dive into an immersive learning experience. From coding to design, master new skills with interactive courses taught by global experts.",
  ctaPrimary: "Start Learning Now",
  ctaSecondary: "Sign Up Free",
};

const SiteContentContext = createContext<SiteContentContextType>({
  navLinks: defaultNavLinks,
  heroContent: defaultHeroContent,
  updateNavLinks: async () => {},
  updateHeroContent: async () => {},
  loading: true,
  error: null,
});

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [navLinks, setNavLinks] = useState<NavLinkItem[]>(defaultNavLinks);
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch from Server API on mount
  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch("/api/site-content");
        if (res.ok) {
          const data = await res.json();
          if (data.navLinks) setNavLinks(data.navLinks);
          if (data.heroContent) setHeroContent(data.heroContent);
        }
      } catch (error) {
        console.error("Failed to rehydrate site content:", error);
        setError("Failed to load site content. Using default settings.");
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  const updateNavLinks = async (links: NavLinkItem[]) => {
    setNavLinks(links);
    try {
      await fetch("/api/site-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ navLinks: links }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const updateHeroContent = async (content: HeroContent) => {
    setHeroContent(content);
    try {
      await fetch("/api/site-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroContent: content }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SiteContentContext.Provider
      value={{ navLinks, heroContent, updateNavLinks, updateHeroContent, loading, error }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
