import '../styles/global.css';

import { ThemeProvider } from 'next-themes';

import type { AppPropsWithLayout } from 'next/app';

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  return (
    <ThemeProvider attribute="class">
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}
