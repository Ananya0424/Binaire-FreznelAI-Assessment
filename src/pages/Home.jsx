import React from 'react';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="text-white">
        <h1 className="text-2xl mb-4 font-light tracking-wide uppercase">Featured & Recommended</h1>
        <div className="bg-steam-panel w-full h-96 rounded flex items-center justify-center border border-steam-lightBlue/20">
          <p className="text-steam-muted">Hero Carousel will go here...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
