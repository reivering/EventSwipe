import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Calendar, Users, Sparkles } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 animate-fade-in">
          <Flame className="w-16 h-16 text-primary-500 mr-3" />
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 bg-clip-text text-transparent">
            EventSwipe
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-medium animate-slide-up">
          Swipe your city's hottest events
        </p>
        
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Discover concerts, festivals, parties, and experiences near you. 
          Swipe right to save, left to skip. It's that simple.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Link to="/swipe" className="btn-primary text-lg px-8 py-4">
            Start Swiping 🔥
          </Link>
          <button className="btn-secondary text-lg px-8 py-4">
            How It Works
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="glass rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Calendar className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Discover Events</h3>
            <p className="text-gray-600">
              Find concerts, parties, festivals, and more happening near you
            </p>
          </div>

          <div className="glass rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Sparkles className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Swipe to Save</h3>
            <p className="text-gray-600">
              Simple and fun - swipe right on events you love, left to skip
            </p>
          </div>

          <div className="glass rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Users className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Never Miss Out</h3>
            <p className="text-gray-600">
              See what's popular and save events to your personal calendar
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 mt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div>
            <div className="text-4xl font-bold text-primary-600">10K+</div>
            <div className="text-gray-600">Events</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600">50K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600">100+</div>
            <div className="text-gray-600">Cities</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Landing;
