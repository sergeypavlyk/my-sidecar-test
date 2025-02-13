import { navLinks } from '@/lib/constants';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Home Page</h1>
      <nav className="flex gap-4">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            className="hover:text-green-500 transition-colors duration-300 underline"
            href={href}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
