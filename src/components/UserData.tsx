'use client';

import { PathEnum } from '@/enums';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserData() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) router.push(PathEnum.Login);
    else setLoading(false);
  }, [router]);

  if (loading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <button
        className="bg-white text-black rounded-xl p-2 hover:bg-green-300 transition-colors duration-300 disabled:opacity-50"
        type="button"
        onClick={logout}
      >
        Log Out
      </button>
    </div>
  );
}
