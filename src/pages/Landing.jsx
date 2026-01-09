import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Calendar, Users, Sparkles } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white relative">
      {/* Geometric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 border-5 border-black"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-black"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 border-3 border-black rotate-45"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-12">
          <div className="inline-block border-5 border-black p-4 mb-6">
            <Ticket className="w-20 h-20 text-black" strokeWidth={3} />
          </div>
          <h1 className="text-7xl md:text-8xl font-bold text-black uppercase tracking-tight leading-none">
            EVENT<br />SWIPE
          </h1>
        </div>

        {/* Tagline */}
        <div className="border-5 border-black bg-black text-white p-6 mb-8 max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl font-bold uppercase tracking-wide">
            SWIPE YOUR CITY'S HOTTEST EVENTS
          </p>
        </div>

        <p className="text-lg md:text-xl text-black mb-12 max-w-2xl mx-auto font-medium">
          Discover concerts, festivals, parties, and experiences near you.
          Swipe right to save, left to skip.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
          <Link to="/swipe" className="btn-primary text-xl">
            START SWIPING →
          </Link>
          <button className="btn-secondary text-xl">
            HOW IT WORKS
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="brutalist-box p-8 hover:bg-black hover:text-white transition-colors duration-100">
            <Calendar className="w-16 h-16 mx-auto mb-4" strokeWidth={3} />
            <h3 className="text-2xl font-bold mb-3 uppercase">Discover</h3>
            <p className="font-medium">
              Find concerts, parties, festivals, and more happening near you
            </p>
          </div>

          <div className="brutalist-box p-8 hover:bg-black hover:text-white transition-colors duration-100">
            <Sparkles className="w-16 h-16 mx-auto mb-4" strokeWidth={3} />
            <h3 className="text-2xl font-bold mb-3 uppercase">Swipe</h3>
            <p className="font-medium">
              Simple and fun - swipe right on events you love, left to skip
            </p>
          </div>

          <div className="brutalist-box p-8 hover:bg-black hover:text-white transition-colors duration-100">
            <Users className="w-16 h-16 mx-auto mb-4" strokeWidth={3} />
            <h3 className="text-2xl font-bold mb-3 uppercase">Save</h3>
            <p className="font-medium">
              See what's popular and save events to your personal calendar
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 mt-20 border-5 border-black p-8 bg-white">
          <div>
            <div className="text-6xl font-bold text-black">10K+</div>
            <div className="text-black font-bold uppercase tracking-wider">Events</div>
          </div>
          <div className="border-l-5 border-black"></div>
          <div>
            <div className="text-6xl font-bold text-black">50K+</div>
            <div className="text-black font-bold uppercase tracking-wider">Users</div>
          </div>
          <div className="border-l-5 border-black"></div>
          <div>
            <div className="text-6xl font-bold text-black">100+</div>
            <div className="text-black font-bold uppercase tracking-wider">Cities</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
