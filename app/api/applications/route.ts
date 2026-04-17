import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

const APPS_FILE = 'applications.json';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const apps = storage.read<any[]>(APPS_FILE, []);
    
    const newApp = {
      ...data,
      id: Date.now(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    
    apps.push(newApp);
    storage.write(APPS_FILE, apps);
    
    return NextResponse.json(newApp, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const apps = storage.read<any[]>(APPS_FILE, []);
    const sorted = [...apps].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json(sorted, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
