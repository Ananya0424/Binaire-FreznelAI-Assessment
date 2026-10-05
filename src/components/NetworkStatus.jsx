import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div 
      className="bg-red-500/90 text-white text-center py-2 text-sm font-medium animate-pulse sticky top-0 z-50" 
      role="alert" 
      aria-live="assertive"
    >
      ⚠️ You are currently offline. Showing cached movies from your last session.
    </div>
  );
};

export default NetworkStatus;
