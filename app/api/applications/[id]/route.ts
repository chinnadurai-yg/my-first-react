import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

const APPS_FILE = 'applications.json';

type Props = {
  params: Promise<{ id: string }>
}

export async function PUT(req: Request, { params }: Props) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    
    const body = await req.json();
    const apps = storage.read<any[]>(APPS_FILE, []);
    const index = apps.findIndex((a: any) => a.id === id);
    
    if (index === -1) return NextResponse.json({ error: "Application not found" }, { status: 404 });
    
    apps[index] = { ...apps[index], ...body };
    storage.write(APPS_FILE, apps);
    
    return NextResponse.json(apps[index], { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    
    const apps = storage.read<any[]>(APPS_FILE, []);
    const filtered = apps.filter((a: any) => a.id !== id);
    
    if (apps.length === filtered.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    storage.write(APPS_FILE, filtered);
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
