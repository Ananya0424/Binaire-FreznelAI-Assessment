import React from 'react';
import { tmdb } from '../services/TMDBService';

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  return (
    <div 
      id={`movie-${movie.id}`}
      tabIndex="0" 
      className="group relative bg-steam-panel border border-transparent rounded overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-steam-lightBlue hover:shadow-lg active:scale-[0.98] active:border-steam-blue focus:outline-none focus:border-steam-blue focus-visible:ring-2 focus-visible:ring-steam-blue focus-visible:ring-offset-2 focus-visible:ring-offset-steam-bg focus-within:border-steam-lightBlue target:ring-2 target:ring-steam-green"
      onClick={() => console.log('Clicked movie:', movie.title)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={tmdb.getImageUrl(movie.poster_path)} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-steam-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-3">
        <h3 className="text-white text-sm font-medium truncate group-hover:text-steam-blue transition-colors">
          {movie.title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-steam-muted">
            {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
          </span>
          <span className="bg-steam-dark px-2 py-0.5 rounded text-xs text-steam-green border border-steam-lightBlue/30 group-hover:border-steam-green/50 transition-colors">
            ★ {movie.vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
