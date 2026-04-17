import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { defaultNavLinks, defaultHeroContent } from '@/app/context/SiteContentContext';

const CONTENT_FILE = 'site-content.json';

export async function GET() {
  try {
    const data = storage.read(CONTENT_FILE, {
      navLinks: defaultNavLinks,
      heroContent: defaultHeroContent
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch site content" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const current = storage.read(CONTENT_FILE, {
      navLinks: defaultNavLinks,
      heroContent: defaultHeroContent
    });
    
    const updated = { ...current, ...body };
    storage.write(CONTENT_FILE, updated);
    
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update site content" }, { status: 500 });
  }
}
