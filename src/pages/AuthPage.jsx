import React, { useState } from 'react';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-steam-bg flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-widest">
          Freznel<span className="text-steam-blue">Movies</span>
        </h1>
        <p className="text-steam-muted text-sm uppercase">Please Verify Your Details to Continue</p>
      </div>

      <div className="bg-steam-panel w-full max-w-md p-8 rounded shadow-lg border border-steam-lightBlue/20">
        <form onSubmit={handleAuth} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-steam-blue text-xs uppercase tracking-wide">Email Address</label>
            <input 
              type="email" 
              className="bg-steam-dark text-white p-3 rounded focus:outline-none focus:ring-1 focus:ring-steam-blue transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-steam-blue text-xs uppercase tracking-wide">Password</label>
            <input 
              type="password" 
              className="bg-steam-dark text-white p-3 rounded focus:outline-none focus:ring-1 focus:ring-steam-blue transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="mt-4 bg-gradient-to-r from-steam-lightBlue to-steam-blue hover:from-steam-blue hover:to-white text-white font-medium py-3 rounded transition-all duration-300 transform hover:scale-[1.02]"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-6 text-steam-muted text-sm hover:text-white transition-colors"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
