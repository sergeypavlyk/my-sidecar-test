import { PathEnum } from '@/enums';
import Link from 'next/link';

const navLinks = [
  { href: PathEnum.Dashboard, label: 'Dashboard' },
  { href: PathEnum.Login, label: 'Login' },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Home Page</h1>
      <nav className="flex gap-4">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            className="hover:text-green-500 transition-colors duration-300"
            href={href}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
