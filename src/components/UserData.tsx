'use client';

import { PathEnum } from '@/lib/enums';
import { useAuth } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

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
      <Button variant="destructive" onClick={logout}>
        Log Out
      </Button>
    </div>
  );
}
