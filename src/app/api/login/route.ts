import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === 'john@example.com' && password === '12345678') {
    return NextResponse.json({ id: '1', name: 'John Doe', email });
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
