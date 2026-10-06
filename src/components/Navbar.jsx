import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Download, ChevronDown } from 'lucide-react';
import { auth } from '../services/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check active state
  const isActive = (path) => location.pathname === path;
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

      <div className="bg-[#171a21] w-full">
        <div className="w-full px-4 md:px-8 flex items-center justify-between h-[104px]">
          

          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-widest uppercase">
              <span className="text-white text-4xl">🎥</span>
              FREZNEL
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 mt-1 font-semibold text-[15px] uppercase">
              <Link to="/" className={`pb-1 border-b-2 transition-colors ${isActive('/') ? 'text-white border-[#1a9fff]' : 'text-[#b8b6b4] hover:text-white border-transparent'}`}>Store</Link>
              <Link to="/community" className={`pb-1 border-b-2 transition-colors ${isActive('/community') ? 'text-white border-[#1a9fff]' : 'text-[#b8b6b4] hover:text-white border-transparent'}`}>Community</Link>
              <Link to="/about" className={`pb-1 border-b-2 transition-colors ${isActive('/about') ? 'text-white border-[#1a9fff]' : 'text-[#b8b6b4] hover:text-white border-transparent'}`}>About</Link>
              <Link to="/support" className={`pb-1 border-b-2 transition-colors ${isActive('/support') ? 'text-white border-[#1a9fff]' : 'text-[#b8b6b4] hover:text-white border-transparent'}`}>Support</Link>
            </nav>
          </div>


          <div className="flex flex-col items-end gap-1 h-full pt-2">
            <div className="flex items-center text-[11px] text-[#b8b6b4] gap-3">
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
              <div className="group relative">
                <span className="hover:text-white cursor-pointer flex items-center gap-1 lowercase">
                  language <ChevronDown className="w-3 h-3" />
                </span>
                <div className="absolute right-0 top-full mt-2 w-32 bg-[#3d4450] text-[#b8b6b4] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 rounded">
                  <div className="px-4 py-2 hover:bg-[#1b2838] hover:text-white transition-colors cursor-pointer text-xs font-bold text-white bg-[#1b2838]">
                    English
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="w-full shadow-lg" style={{ background: 'linear-gradient(to right, #202d39 0%, #111620 100%)' }}>
        <div className="w-full px-4 md:px-8 h-9 flex items-center justify-between">
          

          <nav className="flex items-center gap-4 md:gap-6 text-[13px] text-white font-medium">
            <Link to="/explore/new" className="group relative flex items-center gap-1 cursor-pointer hover:text-steam-blue transition-colors">Browse <ChevronDown className="w-3 h-3" /></Link>
            <Link to="/explore/new?title=Recommendations&q=best" className="group relative flex items-center gap-1 cursor-pointer hover:text-steam-blue transition-colors">Recommendations <ChevronDown className="w-3 h-3" /></Link>
            <Link to="/explore/new?title=Horror%20%26%20Action&q=horror" className="group relative flex items-center gap-1 cursor-pointer hover:text-steam-blue transition-colors">Categories <ChevronDown className="w-3 h-3" /></Link>
            <Link to="/explore/new?title=Ways%20to%20Play&q=game" className="group relative flex items-center gap-1 cursor-pointer hover:text-steam-blue transition-colors">Ways to Play <ChevronDown className="w-3 h-3" /></Link>
            <Link to="/explore/new?title=Special%20Sections&q=collection" className="group relative flex items-center gap-1 cursor-pointer hover:text-steam-blue transition-colors">Special Sections <ChevronDown className="w-3 h-3" /></Link>
          </nav>


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
