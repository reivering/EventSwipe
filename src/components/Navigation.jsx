import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Ticket, Bookmark, User } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/swipe', icon: Ticket, label: 'Swipe' },
    { path: '/saved', icon: Bookmark, label: 'Saved' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isDark = document.body.classList.contains('dark');

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto transition-colors duration-300 ${isDark ? 'bg-black border-t-5 md:border-t-0 md:border-b-5 border-white' : 'bg-white border-t-5 md:border-t-0 md:border-b-5 border-black'
      }`}>
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-around md:justify-between h-14 sm:h-16">
          {/* Logo - Desktop only */}
          <Link to="/" className="hidden md:flex items-center space-x-3">
            <div className={`border-3 p-1 ${isDark ? 'border-white' : 'border-black'}`}>
              <Ticket className={`w-6 h-6 sm:w-8 sm:h-8 ${isDark ? 'text-white' : 'text-black'}`} strokeWidth={3} />
            </div>
            <span className={`text-xl sm:text-2xl font-bold uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
              FOMO
            </span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center justify-around w-full md:w-auto md:space-x-4 lg:space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 px-2 sm:px-4 py-2 border-3 transition-all duration-200 ${isActive
                    ? isDark
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-white border-black'
                    : isDark
                      ? 'bg-black text-white border-transparent hover:border-white'
                      : 'bg-white text-black border-transparent hover:border-black'
                    }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                  <span className="text-xs md:text-sm lg:text-base font-bold uppercase tracking-wide">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
