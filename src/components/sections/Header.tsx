import ThemeButton from '../elements/ThemeButton';

export default function Header() {
  return (
    <header className="px-6 py-4">
      <nav className="container mx-auto">
        <ThemeButton className="float-right cursor-pointer text-xl hover:opacity-75" />
      </nav>
    </header>
  );
}
