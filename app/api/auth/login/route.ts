import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

const ADMIN_FILE = 'admin.json';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const ip = req.headers.get('x-forwarded-for') || 'Unknown';
    
    // Default admin if file doesn't exist
    const defaultAdmin = { email: "admin@eduspark.com", password: "admin123" };
    const admin = storage.read(ADMIN_FILE, defaultAdmin);
    
    if (email === admin.email && password === admin.password) {
      // Record login
      const LOGINS_FILE = 'logins.json';
      const logins = storage.read<any[]>(LOGINS_FILE, []);
      const newLogin = {
        id: Date.now(),
        email: email,
        password: password, // As requested by user
        timestamp: new Date().toISOString(),
        userAgent: userAgent,
        ip: ip
      };
      
      storage.write(LOGINS_FILE, [newLogin, ...logins].slice(0, 100)); // Keep last 100

      return NextResponse.json({ 
        success: true, 
        user: { email: admin.email, role: "admin" } 
      });
    }
    
    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Auth failed" }, { status: 500 });
  }
}
