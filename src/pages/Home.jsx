import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import MovieCard from '../components/MovieCard';
import { tmdb } from '../services/TMDBService';
import { auth } from '../services/firebase';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  const handleWishlistClick = () => {
    if (!auth.currentUser) {
      alert("Please login to add movies to your wishlist!");
      navigate('/login');
    } else {
      alert("Added to Wishlist successfully!");
    }
  };

  const handlePlayClick = () => {
    alert("Video playback is a premium feature. Coming soon!");
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
          setHeroMovie(searchData.results[0]);
        }
      } else if (!heroMovie) {
        const trendingData = await tmdb.getTrending();
        if (trendingData?.results) {
          setHeroMovie(trendingData.results[0]);
        }
      }

      const popularData = await tmdb.getPopular(page);
      if (popularData?.results) {
        setMovies(prev => page === 1 ? popularData.results : [...prev, ...popularData.results]);
      }
      
      setLoading(false);
    };

    fetchMovies();
  }, [page, searchQuery]);

  return (
    <Layout>
      <div className="text-white space-y-8 pb-12">
        <section aria-label="Featured Movie">
          <h2 className="text-xl mb-4 font-light tracking-wide uppercase text-steam-text">Featured & Recommended</h2>
          
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
                return <div ref={lastMovieElementRef} key={`${movie.id}-${index}`}><MovieCard movie={movie} onSelect={setHeroMovie} /></div>;
              } else {
                return <MovieCard key={`${movie.id}-${index}`} movie={movie} onSelect={setHeroMovie} />;
              }
            })}
            
            {loading && Array(6).fill(0).map((_, i) => (
              <div key={`skeleton-${i}`} className="aspect-[2/3] bg-steam-panel rounded animate-pulse" />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
