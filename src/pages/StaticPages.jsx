import React, { useState } from 'react';
import Layout from '../components/Layout';

export const About = () => (
  <Layout>
    <div className="max-w-4xl mx-auto py-12 px-4 text-white animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-wider text-steam-text">About This Project</h1>
      <div className="bg-[#1b2838] p-8 rounded shadow-2xl border border-black/50">
        <h2 className="text-2xl text-steam-blue mb-4">Binaire / FreznelAI Assessment</h2>
        <p className="mb-6 text-[#acb2b8] leading-relaxed">
          Welcome! This platform is a specialized technical showcase developed for the Binaire assessment. 
          The objective was to architect a high-performance, fully functional Single Page Application (SPA) 
          that meticulously replicates the iconic Steam Web Store UI.
        </p>
        <p className="mb-8 text-[#acb2b8] leading-relaxed">
          It features dynamic API integrations (TMDB), persistent local storage workflows, Firebase authentication, 
          and offline-capable Progressive Web App (PWA) architecture via Service Workers.
        </p>
        
        <h3 className="text-lg text-white font-bold mb-4 border-b border-steam-lightBlue/30 pb-2">Core Tech Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[#8f98a0]">
          <div className="bg-steam-dark p-3 rounded text-center border border-white/5">React 18</div>
          <div className="bg-steam-dark p-3 rounded text-center border border-white/5">Tailwind CSS</div>
          <div className="bg-steam-dark p-3 rounded text-center border border-white/5">Firebase Auth</div>
          <div className="bg-steam-dark p-3 rounded text-center border border-white/5">Vite + PWA</div>
        </div>
      </div>
    </div>
  </Layout>
);

export const Community = () => (
  <Layout>
    <div className="max-w-5xl mx-auto py-12 px-4 text-white animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-wider text-steam-text">Community Activity</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#1b2838] p-6 rounded shadow-xl border border-black/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-steam-blue rounded-full flex items-center justify-center font-bold">U1</div>
              <div>
                <h3 className="text-white font-bold">GamerX_99</h3>
                <p className="text-xs text-steam-muted">Posted 2 hours ago</p>
              </div>
            </div>
            <p className="text-[#acb2b8] text-sm">Just added 5 new movies to my wishlist! The new UI is so smooth, loving the dark mode aesthetics. Highly recommend checking out the horror section today.</p>
          </div>
          
          <div className="bg-[#1b2838] p-6 rounded shadow-xl border border-black/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-steam-green text-black rounded-full flex items-center justify-center font-bold">Pro</div>
              <div>
                <h3 className="text-white font-bold">Cinephile_Dave</h3>
                <p className="text-xs text-steam-muted">Posted 5 hours ago</p>
              </div>
            </div>
            <p className="text-[#acb2b8] text-sm">The offline mode feature is a lifesaver when my wifi drops. Great update!</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-steam-dark p-6 rounded border border-white/5">
            <h3 className="text-steam-blue font-bold mb-2">Live Stats</h3>
            <p className="text-sm text-[#acb2b8] flex justify-between mb-1"><span>Users Online:</span> <span className="text-white">1,492</span></p>
            <p className="text-sm text-[#acb2b8] flex justify-between mb-1"><span>In-Game:</span> <span className="text-white">834</span></p>
            <p className="text-sm text-[#acb2b8] flex justify-between"><span>New Posts:</span> <span className="text-white">42</span></p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export const Support = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12 px-4 text-white animate-fade-in">
        <h1 className="text-4xl font-bold mb-8 uppercase tracking-wider text-steam-text">Help & Support</h1>
        
        {submitted ? (
          <div className="bg-[#1b2838] p-8 rounded text-center border border-steam-green/30">
            <h2 className="text-2xl text-steam-green mb-4">Ticket Submitted Successfully!</h2>
            <p className="text-[#acb2b8]">Our support team will review your request and get back to you via email within 24 hours.</p>
            <button onClick={() => setSubmitted(false)} className="mt-6 bg-steam-dark text-white px-6 py-2 rounded hover:bg-steam-panel border border-white/10">Submit Another</button>
          </div>
        ) : (
          <div className="bg-[#1b2838] p-8 rounded shadow-2xl border border-black/50">
            <p className="text-[#acb2b8] mb-6">Experiencing an issue? Describe your problem below and our tech team will investigate.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div>
                <label className="block text-xs text-steam-muted uppercase mb-1">Your Email</label>
                <input required type="email" className="w-full bg-steam-dark text-white p-3 rounded border border-transparent focus:border-steam-blue outline-none" placeholder="Enter your email address" />
              </div>
              
              <div>
                <label className="block text-xs text-steam-muted uppercase mb-1">Category</label>
                <select className="w-full bg-steam-dark text-white p-3 rounded border border-transparent focus:border-steam-blue outline-none">
                  <option>Account & Login Issues</option>
                  <option>Wishlist Not Syncing</option>
                  <option>Offline Mode Not Working</option>
                  <option>Other Bug Report</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-steam-muted uppercase mb-1">Description</label>
                <textarea required rows="4" className="w-full bg-steam-dark text-white p-3 rounded border border-transparent focus:border-steam-blue outline-none" placeholder="Describe your issue in detail..."></textarea>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-steam-lightBlue to-steam-blue hover:from-steam-blue hover:to-white text-white font-bold py-3 rounded transition-colors">
                Submit Support Ticket
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};
