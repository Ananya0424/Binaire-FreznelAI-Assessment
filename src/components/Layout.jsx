import React, { useState } from 'react';
import Navbar from './Navbar';
import NetworkStatus from './NetworkStatus';

const Layout = ({ children }) => {
  const [showCookies, setShowCookies] = useState(true);

  return (
    <div className="min-h-screen bg-[#1b2838] flex flex-col font-sans">
      <NetworkStatus />
      <Navbar />
      
      <main className="flex-1 w-full animate-fade-in" role="main">
        {children}
      </main>
      
      <footer className="bg-[#171a21] mt-auto py-8 text-center text-sm text-steam-muted" role="contentinfo">
        <p>© 2026 FreznelAI Assessment. Built for Binaire.</p>
        <p className="mt-2 text-xs">All movies and images provided by TMDB.</p>
      </footer>

      {/* Steam Style Cookie Banner */}
      {showCookies && (
        <div className="fixed bottom-0 left-0 w-full bg-[#1b2838] border-t border-black/50 p-4 z-[9999] flex flex-col md:flex-row items-center justify-center gap-6 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
          <div className="text-[#acb2b8] max-w-3xl text-xs leading-relaxed">
            Do you mind if we use optional cookies to provide you personalized content and to analyze site traffic?<br/>
            We don't use a lot of cookies; you can see and manage them at any time on our <a href="#" className="text-white underline">Cookie Settings page</a>. If you click 'Accept All,' you consent to the use of cookies on Steam websites. Learn more about cookies in our <a href="#" className="text-white underline">Privacy Policy</a>.
          </div>
          <div className="flex flex-col gap-2 min-w-[150px]">
            <button onClick={() => setShowCookies(false)} className="bg-[#0078d7] hover:bg-[#005a9e] text-white px-4 py-1.5 rounded text-sm transition-colors cursor-pointer">Accept All</button>
            <button onClick={() => setShowCookies(false)} className="bg-[#3d4450] hover:bg-[#2c313a] text-white px-4 py-1.5 rounded text-sm transition-colors cursor-pointer">Reject All</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
