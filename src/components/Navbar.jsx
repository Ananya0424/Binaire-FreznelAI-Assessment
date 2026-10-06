import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Download, ChevronDown } from 'lucide-react';
import { auth } from '../services/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { tmdb } from '../services/TMDBService';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const timer = setTimeout(async () => {
        const data = await tmdb.searchMovie(searchQuery);
        if (data?.results) {
          setSuggestions(data.results.filter(m => m.poster_path).slice(0, 5));
          setShowSuggestions(true);
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
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
            <div className="group relative z-50">
              <span className="flex items-center gap-1 cursor-pointer hover:text-steam-blue transition-colors">
                Categories <ChevronDown className="w-3 h-3" />
              </span>
              <div className="absolute top-full left-0 mt-2 w-32 bg-[#3d4450] text-[#b8b6b4] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all rounded py-1">
                <Link to="/explore/new?title=Action&q=action" className="block px-4 py-1.5 hover:bg-[#1b2838] hover:text-white transition-colors cursor-pointer text-sm">Action</Link>
                <Link to="/explore/new?title=Horror&q=horror" className="block px-4 py-1.5 hover:bg-[#1b2838] hover:text-white transition-colors cursor-pointer text-sm">Horror</Link>
                <Link to="/explore/new?title=Comedy&q=comedy" className="block px-4 py-1.5 hover:bg-[#1b2838] hover:text-white transition-colors cursor-pointer text-sm">Comedy</Link>
                <Link to="/explore/new?title=Sci-Fi&q=sci-fi" className="block px-4 py-1.5 hover:bg-[#1b2838] hover:text-white transition-colors cursor-pointer text-sm">Sci-Fi</Link>
              </div>
            </div>
            <Link to="/explore/new?title=Ways%20to%20Play&q=game" className="group relative flex items-center gap-1 cursor-pointer hover:text-steam-blue transition-colors">Ways to Play <ChevronDown className="w-3 h-3" /></Link>
            <Link to="/explore/new?title=Special%20Sections&q=collection" className="group relative flex items-center gap-1 cursor-pointer hover:text-steam-blue transition-colors">Special Sections <ChevronDown className="w-3 h-3" /></Link>
          </nav>


          <div className="relative">
            <form onSubmit={handleSearch} className="flex items-center h-[32px]">
              <div className="bg-[#316282] border border-black/30 rounded-l px-3 h-full flex items-center focus-within:ring-1 focus-within:ring-[#66c0f4] transition-shadow">
                <input 
                  type="text" 
                  placeholder="Search the store" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="bg-transparent border-none text-white text-sm outline-none w-56 md:w-[280px] placeholder:italic placeholder-white/50"
                />
              </div>
              <button type="submit" className="bg-[#66c0f4] hover:bg-[#417a9b] h-full px-3 rounded-r flex items-center justify-center transition-colors">
                <Search className="w-5 h-5 text-[#171a21]" />
              </button>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full right-0 w-full mt-1 bg-[#3d4450] shadow-2xl rounded overflow-hidden z-[9999] border border-black/50">
                {suggestions.map((movie) => (
                  <div 
                    key={movie.id}
                    onClick={() => {
                      setSearchQuery(movie.title);
                      setShowSuggestions(false);
                      navigate(`/?search=${encodeURIComponent(movie.title)}`);
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-[#1b2838] cursor-pointer border-b border-black/20 last:border-0 transition-colors"
                  >
                    <img 
                      src={tmdb.getImageUrl(movie.poster_path)} 
                      alt="" 
                      className="w-8 h-10 object-cover rounded shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate font-medium">{movie.title}</p>
                      <p className="text-steam-muted text-xs">{movie.release_date?.split('-')[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
