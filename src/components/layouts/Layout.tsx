import Footer from '../sections/Footer';
import Header from '../sections/Header';

import type { ReactNode } from 'react';

export default function Layout(props: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
