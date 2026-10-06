import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      } else {

        const savedList = JSON.parse(localStorage.getItem(`wishlist_${user.uid}`) || '[]');
        setWishlist(savedList);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleMovieSelect = (movie) => {
    navigate(`/?search=${encodeURIComponent(movie.title)}`);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto pt-4 animate-fade-in">

        <div className="text-[#8f98a0] text-xs mb-2 flex items-center gap-1">
          <span onClick={() => navigate('/')} className="hover:text-white cursor-pointer transition-colors">Home</span>
          <span>{'>'}</span>
          <span className="text-white">Your Wishlist</span>
        </div>
        

        <h1 className="text-3xl text-white font-bold mb-6 tracking-wide">My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div className="bg-steam-panel p-8 text-center rounded border border-steam-lightBlue/20">
            <h2 className="text-steam-muted text-lg">Your wishlist is empty.</h2>
            <button onClick={() => navigate('/')} className="mt-4 bg-steam-blue text-white px-6 py-2 rounded">Browse Store</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
            {wishlist.map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} onSelect={handleMovieSelect} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
