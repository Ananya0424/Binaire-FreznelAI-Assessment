import React from 'react';
import { tmdb } from '../services/TMDBService';

const MovieCard = ({ movie, onSelect }) => {
  if (!movie) return null;

  return (
    <div 
      id={`movie-${movie.id}`}
      tabIndex="0" 
      className="group relative aspect-[2/3] bg-steam-dark border border-transparent rounded overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-steam-lightBlue hover:shadow-2xl focus-visible:outline-none focus-within:ring-2 focus-within:ring-steam-blue target:ring-2 target:ring-steam-green"
      onClick={() => {
        if (onSelect) onSelect(movie);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      {/* Main Poster Image */}
      <img 
        src={tmdb.getImageUrl(movie.poster_path)} 
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Steam-style Default Bottom Tag (visible when NOT hovered) */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/90 to-transparent group-hover:opacity-0 transition-opacity duration-300 flex items-end justify-between p-2">
         <span className="text-white text-xs font-semibold truncate max-w-[70%] drop-shadow-md">{movie.title}</span>
         <span className="bg-steam-green text-black px-1.5 py-0.5 text-[10px] font-bold rounded">NEW</span>
      </div>

      {/* Hover Panel that slides up (Like your Steam screenshot) */}
      <div className="absolute bottom-0 left-0 w-full bg-[#1b2838] p-3 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        <h3 className="text-white text-sm font-bold truncate mb-1">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <span className="text-steam-blue text-[10px]">Overwhelmingly Positive</span>
          <span className="text-steam-muted text-[10px]">({movie.vote_count || 26648})</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          <span className="bg-steam-dark px-1.5 py-0.5 rounded text-[10px] text-steam-muted border border-white/5">Action</span>
          <span className="bg-steam-dark px-1.5 py-0.5 rounded text-[10px] text-steam-muted border border-white/5">Cinema</span>
        </div>

        <div className="flex items-center justify-between mt-2 bg-steam-dark p-1 rounded">
          <button 
            className="bg-[#66c0f4] hover:bg-[#417a9b] text-white text-[10px] font-medium px-2 py-1 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // prevent clicking the card itself
              alert("Feature coming soon!");
            }}
          >
            + Wishlist
          </button>
          <div className="flex items-center">
            <span className="bg-steam-green text-black px-1.5 py-0.5 text-[10px] font-bold">-100%</span>
            <span className="px-1.5 text-[10px] text-steam-muted line-through">₹999</span>
            <span className="text-steam-blue text-[10px] font-bold pr-1">Free</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
