import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

const LOGINS_FILE = 'logins.json';

export async function GET() {
  try {
    const logins = storage.read<any[]>(LOGINS_FILE, []);
    return NextResponse.json(logins);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch logins" }, { status: 500 });
  }
}
