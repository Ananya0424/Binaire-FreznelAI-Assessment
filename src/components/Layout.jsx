import React from 'react';
import Navbar from './Navbar';
import NetworkStatus from './NetworkStatus';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#1b2838] flex flex-col font-sans">
      <NetworkStatus />
      <Navbar />
      
      <main className="flex-1 w-full" role="main">
        {children}
      </main>
      
      <footer className="bg-[#171a21] mt-auto py-8 text-center text-sm text-steam-muted" role="contentinfo">
        <p>© 2026 FreznelAI Assessment. Built for Binaire.</p>
        <p className="mt-2 text-xs">All movies and images provided by TMDB.</p>
      </footer>
    </div>
  );
};

export default Layout;
