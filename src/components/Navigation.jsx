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

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-5 border-black z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b-5">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-around md:justify-between h-16">
          {/* Logo - Desktop only */}
          <Link to="/" className="hidden md:flex items-center space-x-3">
            <div className="border-3 border-black p-1">
              <Ticket className="w-8 h-8 text-black" strokeWidth={3} />
            </div>
            <span className="text-2xl font-bold text-black uppercase tracking-tight">
              EVENTSWIPE
            </span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center justify-around w-full md:w-auto md:space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 px-4 py-2 border-3 transition-colors duration-100 ${isActive
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-transparent hover:border-black'
                    }`}
                >
                  <Icon className="w-6 h-6" strokeWidth={3} />
                  <span className={`text-xs md:text-base font-bold uppercase tracking-wide`}>
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
