import Head from 'next/head';
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <div>
      <Head>
        <title>MyBook - find your favorite book!</title>
        <meta name="description" content="Find your favorite book!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;