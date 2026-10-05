import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-steam-dark w-full shadow-md">
      {/* Top utility bar (similar to Steam) */}
      <div className="container mx-auto px-4 h-8 flex justify-end items-center text-xs text-steam-text gap-4">
        <Link to="/login" className="hover:text-white transition-colors">login</Link>
        <span>|</span>
        <span className="hover:text-white cursor-pointer transition-colors">language</span>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        
        <div className="flex items-center gap-8">
          {/* Logo mockup */}
          <Link to="/" className="text-2xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
            <span className="text-steam-blue text-3xl">🎥</span>
            Freznel
            <span className="font-light">Movies</span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-steam-text font-medium text-sm">
            <Link to="/" className="hover:text-steam-blue transition-colors uppercase">Store</Link>
            <Link to="/explore/new" className="hover:text-steam-blue transition-colors uppercase">New & Trending</Link>
            <a href="#" className="hover:text-steam-blue transition-colors uppercase">Categories</a>
          </nav>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-steam-panel border border-steam-lightBlue/30 rounded px-3 py-1.5 focus-within:border-steam-blue transition-colors">
            <input 
              type="text" 
              placeholder="search movies..." 
              className="bg-transparent border-none text-white outline-none text-sm w-48 placeholder-steam-muted"
            />
            <Search className="w-4 h-4 text-steam-blue cursor-pointer" />
          </div>
          
          <button className="md:hidden text-steam-text hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
