import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import NetworkStatus from './NetworkStatus';

const Layout = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const handleToast = (e) => {
      setToastMessage(e.detail);
      setTimeout(() => setToastMessage(null), 3000);
    };
    window.addEventListener('showToast', handleToast);
    return () => window.removeEventListener('showToast', handleToast);
  }, []);

  return (
    <div className="min-h-screen bg-[#1b2838] flex flex-col font-sans relative">
      <NetworkStatus />
      <Navbar />
      
      <main className="flex-1 w-full" role="main">
        {children}
      </main>
      
      <footer className="bg-[#171a21] mt-auto py-8 text-center text-sm text-steam-muted" role="contentinfo">
        <p>© 2026 FreznelAI Assessment. Built for Binaire.</p>
        <p className="mt-2 text-xs">All movies and images provided by TMDB.</p>
      </footer>
      
      {toastMessage && (
        <div className="fixed top-24 right-4 bg-steam-panel border-l-4 border-[#66c0f4] text-white p-4 shadow-2xl rounded z-[9999] animate-slide-in-right">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Layout;
