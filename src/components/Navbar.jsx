import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Download, ChevronDown } from 'lucide-react';
import { auth } from '../services/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="w-full flex flex-col font-sans relative z-50">
      {/* Top Global Bar */}
      <div className="bg-[#171a21] w-full">
        <div className="w-full px-4 md:px-8 flex items-center justify-between h-[104px]">
          
          {/* Logo & Main Links */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-widest uppercase">
              <span className="text-white text-4xl">🎥</span>
              FREZNEL
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 mt-1 font-semibold text-[15px] uppercase">
              <Link to="/" className="text-white border-b-2 border-[#1a9fff] pb-1">Store</Link>
              <span className="text-[#b8b6b4] hover:text-white cursor-pointer transition-colors pb-1">Community</span>
              <span className="text-[#b8b6b4] hover:text-white cursor-pointer transition-colors pb-1">About</span>
              <span className="text-[#b8b6b4] hover:text-white cursor-pointer transition-colors pb-1">Support</span>
            </nav>
          </div>

          {/* Top Right Actions */}
          <div className="flex flex-col items-end gap-1 h-full pt-2">
            <div className="flex items-center text-[11px] text-[#b8b6b4] gap-3">
              <a href="#" className="bg-[#5c7e10] hover:bg-[#7ca916] text-white px-3 py-1 flex items-center gap-2 transition-colors">
                <Download className="w-3 h-3" />
                Install Steam
              </a>
              {user ? (
                <>
                  <span className="text-[#b8b6b4] lowercase">{user.email}</span>
                  <span>|</span>
                  <Link to="/wishlist" className="hover:text-white cursor-pointer lowercase font-bold text-[#66c0f4]">wishlist</Link>
                  <span>|</span>
                  <button onClick={handleLogout} className="hover:text-white cursor-pointer lowercase">logout</button>
                </>
              ) : (
                <Link to="/login" className="hover:text-white lowercase">login</Link>
              )}
              <span>|</span>
              <span className="hover:text-white cursor-pointer flex items-center gap-1 lowercase">
                language <ChevronDown className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="w-full shadow-lg" style={{ background: 'linear-gradient(to right, #202d39 0%, #111620 100%)' }}>
        <div className="w-full px-4 md:px-8 h-9 flex items-center justify-between">
          
          {/* Sub Links */}
          <nav className="flex items-center gap-4 md:gap-6 text-[13px] text-white font-medium">
            <Link to="/explore/new" className="group relative flex items-center gap-1 cursor-pointer hover:text-steam-blue transition-colors">Browse <ChevronDown className="w-3 h-3" /></Link>
            <Link to="/explore/new?title=Recommendations&q=best" className="group relative flex items-center gap-1 cursor-pointer hover:text-steam-blue transition-colors">Recommendations <ChevronDown className="w-3 h-3" /></Link>
            <Link to="/explore/new?title=Horror%20%26%20Action&q=horror" className="group relative flex items-center gap-1 cursor-pointer hover:text-steam-blue transition-colors">Categories <ChevronDown className="w-3 h-3" /></Link>
            <Link to="/explore/new?title=Ways%20to%20Play&q=game" className="group relative flex items-center gap-1 cursor-pointer hover:text-steam-blue transition-colors">Ways to Play <ChevronDown className="w-3 h-3" /></Link>
            <Link to="/explore/new?title=Special%20Sections&q=collection" className="group relative flex items-center gap-1 cursor-pointer hover:text-steam-blue transition-colors">Special Sections <ChevronDown className="w-3 h-3" /></Link>
          </nav>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex items-center h-[26px]">
            <div className="bg-[#316282] border border-black/30 rounded-l px-3 h-full flex items-center focus-within:ring-1 focus-within:ring-[#66c0f4] transition-shadow">
              <input 
                type="text" 
                placeholder="Search the store" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-white text-sm outline-none w-48 placeholder:italic placeholder-white/50"
              />
            </div>
            <button type="submit" className="bg-[#66c0f4] hover:bg-[#417a9b] h-full px-2 rounded-r flex items-center justify-center transition-colors">
              <Search className="w-4 h-4 text-[#171a21]" />
            </button>
          </form>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
