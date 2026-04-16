import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'applications.json');

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

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = parseInt(url.pathname.split('/').pop() || "");
    
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    
    const body = await req.json();
    const apps = getApplications();
    const index = apps.findIndex((a: any) => a.id === id);
    
    if (index === -1) return NextResponse.json({ error: "Application not found" }, { status: 404 });
    
    apps[index] = { ...apps[index], ...body };
    saveApplications(apps);
    
    return NextResponse.json(apps[index], { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = parseInt(url.pathname.split('/').pop() || "");
    
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    
    const apps = getApplications();
    const filtered = apps.filter((a: any) => a.id !== id);
    
    if (apps.length === filtered.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    saveApplications(filtered);
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
