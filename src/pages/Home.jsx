import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import MovieCard from '../components/MovieCard';
import { tmdb } from '../services/TMDBService';
import { auth } from '../services/firebase';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [pendingAgeCheck, setPendingAgeCheck] = useState(null);
  const [birthYear, setBirthYear] = useState('2000');
  const [birthMonth, setBirthMonth] = useState('January');
  const [birthDay, setBirthDay] = useState('1');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const showToast = (msg) => {
    window.dispatchEvent(new CustomEvent('showToast', { detail: msg }));
  };

  const handleWishlistClick = () => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }
    const uid = auth.currentUser.uid;
    const key = `wishlist_${uid}`;
    const currentList = JSON.parse(localStorage.getItem(key) || '[]');
    
    if (!currentList.some(m => m.id === heroMovie.id)) {
      localStorage.setItem(key, JSON.stringify([...currentList, heroMovie]));
      showToast("Added to your Wishlist!");
    } else {
      showToast("Already in your Wishlist!");
    }
  };

  const handlePlayClick = () => {
    showToast("Video playback is a premium feature!");
  };
  
  const observer = useRef();
  
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      
      if (searchQuery) {
        const searchData = await tmdb.searchMovie(searchQuery);
        if (searchData?.results?.length > 0) {
          const validHeroes = searchData.results.filter(m => m.backdrop_path);
          if (validHeroes.length > 0) setHeroMovie(validHeroes[0]);
        }
      } else if (!heroMovie) {
        const trendingData = await tmdb.getTrending();
        if (trendingData?.results) {
          const validHeroes = trendingData.results.filter(m => m.backdrop_path);
          if (validHeroes.length > 0) setHeroMovie(validHeroes[0]);
        }
      }

      const popularData = await tmdb.getPopular(page);
      if (popularData?.results) {
        const validMovies = popularData.results.filter(m => m.poster_path || m.backdrop_path);
        setMovies(prev => page === 1 ? validMovies : [...prev, ...validMovies]);
      }
      
      setLoading(false);
    };

    fetchMovies();
  }, [page, searchQuery]);

  const handleMovieClick = (movie) => {
    setPendingAgeCheck(movie);
  };

  const confirmAge = () => {
    const calculatedAge = 2026 - parseInt(birthYear);
    if (calculatedAge >= 18) {
      if (pendingAgeCheck) {
        setHeroMovie(pendingAgeCheck);
        setPendingAgeCheck(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      showToast("You must be 18 or older to view this content.");
    }
  };

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-white space-y-8 pb-12">
        <section aria-label="Featured Movie">
          {!heroMovie ? (
            <div className="bg-steam-panel w-full h-[400px] rounded animate-pulse border border-steam-lightBlue/20" />
          ) : (
            <div 
              key={heroMovie.id}
              className="relative w-full h-[400px] md:h-[500px] rounded overflow-hidden group border border-steam-lightBlue/20 hover:border-steam-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steam-blue animate-fade-in"
              tabIndex="0"
              aria-label={`Featured movie: ${heroMovie.title}`}
            >
              <img 
                src={tmdb.getImageUrl(heroMovie.backdrop_path, true)} 
                alt={heroMovie.title}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-steam-bg via-steam-bg/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-steam-bg via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{heroMovie.title}</h1>
                <p className="text-steam-text text-sm md:text-base line-clamp-3 mb-6 max-w-xl">
                  {heroMovie.overview}
                </p>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handlePlayClick}
                    className="bg-gradient-to-r from-steam-lightBlue to-steam-blue hover:from-steam-blue hover:to-white text-white px-8 py-3 rounded text-sm font-medium transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    Play Now
                  </button>
                  <button 
                    onClick={handleWishlistClick}
                    className="bg-steam-panel border border-steam-muted hover:border-white text-white px-6 py-3 rounded text-sm font-medium transition-all hover:bg-steam-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-steam-blue">
                    + Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <section aria-label="Popular Movies">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-light tracking-wide uppercase text-steam-text">Popular Titles</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie, index) => {
              if (movies.length === index + 1) {
                return <div ref={lastMovieElementRef} key={`${movie.id}-${index}`}><MovieCard movie={movie} onSelect={handleMovieClick} /></div>;
              } else {
                return <MovieCard key={`${movie.id}-${index}`} movie={movie} onSelect={handleMovieClick} />;
              }
            })}
            
            {loading && Array(6).fill(0).map((_, i) => (
              <div key={`skeleton-${i}`} className="aspect-[2/3] bg-steam-panel rounded animate-pulse" />
            ))}
          </div>
        </section>


        {pendingAgeCheck && (
          <div className="fixed inset-0 bg-[#1b2838]/95 z-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full flex flex-col items-center text-center animate-fade-in">
              <div className="mb-8 w-64 h-36 relative shadow-lg">
                <img src={tmdb.getImageUrl(pendingAgeCheck.backdrop_path)} className="w-full h-full object-cover rounded" alt="Age check" />
              </div>
              <h2 className="text-[#acb2b8] text-lg mb-6">
                This game may contain content not appropriate for all ages,<br/>
                or may not be appropriate for viewing at work.
              </h2>
              <div className="bg-[#2a475e]/30 w-full p-8 rounded border border-[#2a475e] mb-6 shadow-xl">
                <p className="text-[#acb2b8] mb-4 text-sm">Please enter your birth date to continue:</p>
                <div className="flex justify-center gap-2 mb-8">
                  
                  {/* Custom Dropdown for Day */}
                  <div className="relative">
                    <div 
                      onClick={() => setPendingAgeCheck({...pendingAgeCheck, openDropdown: pendingAgeCheck.openDropdown === 'day' ? null : 'day'})}
                      className="bg-[#316282] text-white p-1.5 rounded w-16 text-sm cursor-pointer flex justify-between items-center"
                    >
                      <span>{birthDay}</span> <span className="text-[10px]">▼</span>
                    </div>
                    {pendingAgeCheck.openDropdown === 'day' && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setPendingAgeCheck({...pendingAgeCheck, openDropdown: null})}></div>
                        <div className="absolute top-full left-0 mt-1 w-full bg-[#1b2838] border border-[#316282] rounded shadow-xl z-50 max-h-40 overflow-y-auto">
                          {Array.from({length: 31}, (_, i) => i + 1).map(d => (
                            <div key={d} onClick={() => { setBirthDay(d); setPendingAgeCheck({...pendingAgeCheck, openDropdown: null}); }} className="p-1.5 text-sm hover:bg-[#316282] cursor-pointer">{d}</div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Custom Dropdown for Month */}
                  <div className="relative">
                    <div 
                      onClick={() => setPendingAgeCheck({...pendingAgeCheck, openDropdown: pendingAgeCheck.openDropdown === 'month' ? null : 'month'})}
                      className="bg-[#316282] text-white p-1.5 rounded w-32 text-sm cursor-pointer flex justify-between items-center"
                    >
                      <span>{birthMonth}</span> <span className="text-[10px]">▼</span>
                    </div>
                    {pendingAgeCheck.openDropdown === 'month' && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setPendingAgeCheck({...pendingAgeCheck, openDropdown: null})}></div>
                        <div className="absolute top-full left-0 mt-1 w-full bg-[#1b2838] border border-[#316282] rounded shadow-xl z-50 max-h-40 overflow-y-auto">
                          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                            <div key={m} onClick={() => { setBirthMonth(m); setPendingAgeCheck({...pendingAgeCheck, openDropdown: null}); }} className="p-1.5 text-sm hover:bg-[#316282] cursor-pointer">{m}</div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Custom Dropdown for Year */}
                  <div className="relative">
                    <div 
                      onClick={() => setPendingAgeCheck({...pendingAgeCheck, openDropdown: pendingAgeCheck.openDropdown === 'year' ? null : 'year'})}
                      className="bg-[#316282] text-white p-1.5 rounded w-24 text-sm cursor-pointer flex justify-between items-center"
                    >
                      <span>{birthYear}</span> <span className="text-[10px]">▼</span>
                    </div>
                    {pendingAgeCheck.openDropdown === 'year' && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setPendingAgeCheck({...pendingAgeCheck, openDropdown: null})}></div>
                        <div className="absolute top-full left-0 mt-1 w-full bg-[#1b2838] border border-[#316282] rounded shadow-xl z-50 max-h-40 overflow-y-auto">
                          {Array.from({length: 40}, (_, i) => 2026 - i).map(y => (
                            <div key={y} onClick={() => { setBirthYear(y); setPendingAgeCheck({...pendingAgeCheck, openDropdown: null}); }} className="p-1.5 text-sm hover:bg-[#316282] cursor-pointer">{y}</div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                </div>
                <div className="flex justify-center gap-4">
                  <button onClick={confirmAge} className="bg-[#2a475e] hover:bg-[#66c0f4] text-white px-6 py-2 rounded transition-colors text-sm font-medium">View Page</button>
                  <button onClick={() => setPendingAgeCheck(null)} className="text-[#acb2b8] hover:text-white px-6 py-2 text-sm">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Home;
