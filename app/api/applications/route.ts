import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'applications.json');

// Ensure data folder exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'), { recursive: true });
}

function getApplications() {
  try {
    if (!fs.existsSync(dataFilePath)) return [];
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  } catch (e) {
    return [];
  }
}

function saveApplications(data: any[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const apps = getApplications();
    const newApp = {
      ...data,
      id: Date.now(), // Real numeric timestamp ID
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    
    apps.push(newApp);
    saveApplications(apps);
    
    return NextResponse.json(newApp, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const apps = getApplications();
    // Return sorted by newest
    const sorted = [...apps].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json(sorted, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
