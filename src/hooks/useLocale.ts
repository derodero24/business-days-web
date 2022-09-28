import { useRouter } from 'next/router';

import { en, ja } from '../locales';

export const useLocale = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : ja;
  return { locale, t };
};
