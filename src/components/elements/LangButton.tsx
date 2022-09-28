import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IoLanguage } from 'react-icons/io5';

const langs = [
  { locale: 'ja', label: '🇯🇵 日本語' },
  { locale: 'en', label: '🇺🇸 English' },
];

export default function LangButton(props: { className: string }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide dropdown on click other points
    const onClickWindow = (event: MouseEvent) => {
      if (showDropdown && !ref.current?.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    window.addEventListener('click', onClickWindow);
    return () => window.removeEventListener('click', onClickWindow);
  }, [showDropdown]);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <IoLanguage {...props} onClick={() => setShowDropdown(prev => !prev)} />

      {showDropdown && (
        <div
          className="absolute right-0 mt-2 rounded-md bg-gray-50 py-1 shadow-lg ring-1 ring-black/5"
          onBlur={e => console.log(e)}
        >
          {langs.map(lang => (
            <Link href="" locale={lang.locale} key={lang.locale}>
              <a
                className="block whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                onClick={() => setShowDropdown(false)}
              >
                {lang.label}
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
