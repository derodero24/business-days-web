import { Head, Html, Main, NextScript } from 'next/document';

export default function MyDocument() {
  return (
    <Html>
      <Head>
        <meta name="author" content="@derodero24" />

        {/* Colors */}
        <meta name="theme-color" content="#1f2937" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#f3f4f6"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#1f2937"
        />

        {/* icons */}
        <link rel="icon" sizes="any" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Google Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
