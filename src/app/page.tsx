import { PathEnum } from '@/enums';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Home Page</h1>
      <nav className="flex gap-4">
        <Link href={PathEnum.Dashboard}>Dashboard</Link>
        <Link href={PathEnum.Login}>Login</Link>
      </nav>
    </div>
  );
}
