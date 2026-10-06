import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { tmdb } from '../services/TMDBService';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';

const NewReleases = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch trending/new movies
    tmdb.getTrending().then(data => {
      if (data?.results) setMovies(data.results);
    });
  }, []);

  const handleMovieSelect = (movie) => {
    // Navigate back to home with the movie in search/state, or just go home
    navigate(`/?search=${encodeURIComponent(movie.title)}`);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto pt-4">
        {/* Breadcrumb */}
        <div className="text-[#8f98a0] text-xs mb-2 flex items-center gap-1">
          <span className="hover:text-white cursor-pointer transition-colors">All Products</span>
          <span>{'>'}</span>
          <span className="text-white">New Releases</span>
        </div>
        
        {/* Heading */}
        <h1 className="text-3xl text-white font-bold mb-6 tracking-wide">New Releases</h1>
        
        {/* Movie Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onSelect={handleMovieSelect} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default NewReleases;
