import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Moon, Sun, ChevronDown, Sparkles, Heart, X } from 'lucide-react';
import StarryBackground from '../components/StarryBackground';

const Landing = () => {
  const [darkMode, setDarkMode] = useState(true);
  const howItWorksRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Starry Background - Only visible in dark mode */}
      {darkMode && <StarryBackground />}

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-6 right-6 z-50 p-4 border-5 transition-all duration-200 ${darkMode
            ? 'bg-white text-black border-white hover:bg-black hover:text-white'
            : 'bg-black text-white border-black hover:bg-white hover:text-black'
          }`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="w-6 h-6" strokeWidth={3} /> : <Moon className="w-6 h-6" strokeWidth={3} />}
      </button>

      {/* Geometric background elements - Light mode only */}
      {!darkMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 sm:right-20 w-24 sm:w-32 h-24 sm:h-32 border-5 border-black"></div>
          <div className="absolute bottom-40 left-5 sm:left-10 w-16 sm:w-24 h-16 sm:h-24 bg-black"></div>
          <div className="absolute top-1/3 left-1/4 w-12 sm:w-16 h-12 sm:h-16 border-3 border-black rotate-45"></div>
        </div>
      )}

      {/* Hero Section - Centered in viewport */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="relative z-10 max-w-2xl mx-auto text-center w-full">
          {/* Logo */}
          <div className="mb-8 sm:mb-12">
            <div className={`inline-block border-5 p-3 sm:p-4 mb-4 sm:mb-6 transition-all duration-200 ${darkMode ? 'border-white' : 'border-black'}`}>
              <Ticket className={`w-16 h-16 sm:w-20 sm:h-20 ${darkMode ? 'text-white' : 'text-black'}`} strokeWidth={3} />
            </div>
            <h1 className={`text-6xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tight leading-none transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>
              FOMO
            </h1>
          </div>

          {/* Tagline */}
          <div className={`border-5 p-4 sm:p-6 mb-6 sm:mb-8 max-w-2xl mx-auto transition-all duration-200 ${darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'
            }`}>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide">
              SWIPE YOUR CITY'S HOTTEST EVENTS
            </p>
          </div>

          <p className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-xl mx-auto font-medium px-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            Discover concerts, festivals, parties, and experiences near you.
            Swipe right to save, left to skip.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 mb-12">
            <Link to="/swipe" className="btn-primary text-lg sm:text-xl">
              START SWIPING →
            </Link>
            <button onClick={scrollToHowItWorks} className="btn-secondary text-lg sm:text-xl">
              HOW IT WORKS
            </button>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToHowItWorks}
            className={`animate-bounce ${darkMode ? 'text-white' : 'text-black'}`}
            aria-label="Scroll down"
          >
            <ChevronDown className="w-8 h-8 mx-auto" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      <div ref={howItWorksRef} className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Section Title */}
          <div className={`text-center mb-16 border-5 p-6 sm:p-8 ${darkMode ? 'border-white' : 'border-black'}`}>
            <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight ${darkMode ? 'text-white' : 'text-black'}`}>
              HOW IT WORKS
            </h2>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className={`border-5 p-6 sm:p-8 transition-all duration-200 hover:scale-105 ${darkMode
                ? 'border-white bg-black hover:bg-white hover:text-black'
                : 'border-black bg-white hover:bg-black hover:text-white'
              }`}>
              <div className={`mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
                <Sparkles className="w-16 h-16 mx-auto" strokeWidth={3} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase mb-4 text-center">
                01. DISCOVER
              </h3>
              <p className="font-medium text-center text-sm sm:text-base">
                Browse through curated events happening in your city. From concerts to parties, we've got it all.
              </p>
            </div>

            {/* Step 2 */}
            <div className={`border-5 p-6 sm:p-8 transition-all duration-200 hover:scale-105 ${darkMode
                ? 'border-white bg-black hover:bg-white hover:text-black'
                : 'border-black bg-white hover:bg-black hover:text-white'
              }`}>
              <div className={`mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
                <Heart className="w-16 h-16 mx-auto" strokeWidth={3} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase mb-4 text-center">
                02. SWIPE
              </h3>
              <p className="font-medium text-center text-sm sm:text-base">
                Swipe right on events you love, left on ones you'll skip. It's that simple and addictive.
              </p>
            </div>

            {/* Step 3 */}
            <div className={`border-5 p-6 sm:p-8 transition-all duration-200 hover:scale-105 ${darkMode
                ? 'border-white bg-black hover:bg-white hover:text-black'
                : 'border-black bg-white hover:bg-black hover:text-white'
              }`}>
              <div className={`mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
                <Ticket className="w-16 h-16 mx-auto" strokeWidth={3} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase mb-4 text-center">
                03. ATTEND
              </h3>
              <p className="font-medium text-center text-sm sm:text-base">
                Save your favorites and never miss out. Get directions, share with friends, and go!
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <Link to="/swipe" className="btn-primary text-lg sm:text-xl inline-block">
              GET STARTED NOW →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
