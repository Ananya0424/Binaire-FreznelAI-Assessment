import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { tmdb } from '../services/TMDBService';
import MovieCard from '../components/MovieCard';
import { useNavigate, useSearchParams } from 'react-router-dom';

const NewReleases = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const title = searchParams.get('title') || 'New Releases';
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      tmdb.searchMovie(query).then(data => {
        if (data?.results) setMovies(data.results.filter(m => m.poster_path || m.backdrop_path));
      });
    } else {
      tmdb.getTrending().then(data => {
        if (data?.results) setMovies(data.results.filter(m => m.poster_path || m.backdrop_path));
      });
    }
  }, [query]);

  const handleMovieSelect = (movie) => {
    navigate(`/?search=${encodeURIComponent(movie.title)}`);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto pt-4 animate-fade-in">
        
        <div className="text-[#8f98a0] text-xs mb-2 flex items-center gap-1">
          <span className="hover:text-white cursor-pointer transition-colors">All Products</span>
          <span>{'>'}</span>
          <span className="text-white">{title}</span>
        </div>
        
        
        <h1 className="text-3xl text-white font-bold mb-6 tracking-wide">{title}</h1>
        
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
          {movies.map((movie, index) => (
            <MovieCard key={`${movie.id}-${index}`} movie={movie} onSelect={handleMovieSelect} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default NewReleases;
