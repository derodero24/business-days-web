import Link from 'next/link';

import LangButton from '../elements/LangButton';
import ThemeButton from '../elements/ThemeButton';

const navigations = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/' },
];

export default function Header() {
  return (
    <header className="bg-gray-800 px-6 py-2">
      <nav className="container mx-auto flex justify-between text-white">
        <Link href="/">
          <a className="text-xl">Next.js</a>
        </Link>
        <div className="flex grow items-center justify-center space-x-10">
          {navigations.map(nav => (
            <Link key={nav.label} href={nav.path}>
              <a className="hover:opacity-75">{nav.label}</a>
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-6">
          <ThemeButton className="text-xl hover:opacity-75" />
          <LangButton className="text-xl hover:opacity-75" />
        </div>
      </nav>
    </header>
  );
}
