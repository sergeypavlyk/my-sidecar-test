'use client';

import { useAuth } from '@/hooks';
import Link from 'next/link';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Home</h1>
      <nav className="flex gap-4">
        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>
    </div>
  );
}
