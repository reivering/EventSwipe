import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import SwipeCard from '../components/SwipeCard';
import FilterPanel from '../components/FilterPanel';
import StarryBackground from '../components/StarryBackground';
import { X, Heart, RotateCcw, SlidersHorizontal } from 'lucide-react';

const SwipeFeed = () => {
  const {
    currentEventIndex,
    swipeLeft,
    swipeRight,
    openEventModal,
    getFilteredEvents,
    resetSwipes,
  } = useStore();

  const [showFilters, setShowFilters] = useState(false);
  const filteredEvents = getFilteredEvents();
  const currentEvents = filteredEvents.slice(currentEventIndex, currentEventIndex + 3);
  const isDark = document.body.classList.contains('dark');

  const handleSwipeLeft = (eventId) => {
    swipeLeft(eventId);
  };

  const handleSwipeRight = (eventId) => {
    swipeRight(eventId);
  };

  const handleButtonSwipe = (direction) => {
    if (currentEvents.length > 0) {
      const currentEvent = currentEvents[0];
      if (direction === 'left') {
        handleSwipeLeft(currentEvent.id);
      } else {
        handleSwipeRight(currentEvent.id);
      }
    }
  };

  return (
    <div className={`min-h-screen pt-20 pb-32 md:pt-24 md:pb-8 px-4 transition-colors duration-300 relative ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Starry Background */}
      {isDark && <StarryBackground />}

      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className={`text-3xl sm:text-4xl font-bold uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
              Discover Events
            </h1>
            <p className={`mt-1 sm:mt-2 font-medium ${isDark ? 'text-white' : 'text-black'}`}>
              {filteredEvents.length - currentEventIndex} events remaining
            </p>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-3 border-5 font-bold uppercase tracking-wide transition-all duration-200 ${isDark
                ? 'bg-white text-black border-white hover:bg-black hover:text-white'
                : 'bg-black text-white border-black hover:bg-white hover:text-black'
              }`}
          >
            <SlidersHorizontal className="w-5 h-5" strokeWidth={3} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8">
            <FilterPanel onClose={() => setShowFilters(false)} />
          </div>
        )}

        {/* Swipe Cards Area */}
        <div className="flex justify-center items-center min-h-[500px] sm:min-h-[600px]">
          {currentEvents.length > 0 ? (
            <div className="relative w-full max-w-sm h-[500px] sm:h-[600px]">
              {currentEvents.map((event, index) => (
                <SwipeCard
                  key={event.id}
                  event={event}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  onShowDetails={openEventModal}
                  isTop={index === 0}
                  style={{
                    zIndex: currentEvents.length - index,
                    scale: 1 - index * 0.05,
                    y: index * 10,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className={`text-2xl sm:text-3xl font-bold mb-2 uppercase ${isDark ? 'text-white' : 'text-black'}`}>
                No more events!
              </h2>
              <p className={`mb-6 font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                You've seen all the events. Check back later or adjust your filters.
              </p>
              <button
                onClick={resetSwipes}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" strokeWidth={3} />
                <span>Start Over</span>
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {currentEvents.length > 0 && (
          <div className="flex justify-center items-center space-x-4 sm:space-x-6 mt-8">
            <button
              onClick={() => handleButtonSwipe('left')}
              className={`w-14 h-14 sm:w-16 sm:h-16 border-5 transition-all duration-200 flex items-center justify-center ${isDark
                  ? 'bg-black text-white border-white hover:bg-white hover:text-black'
                  : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
              aria-label="Skip event"
            >
              <X className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={3} />
            </button>

            <button
              onClick={() => openEventModal(currentEvents[0])}
              className={`w-12 h-12 sm:w-14 sm:h-14 border-3 transition-all duration-200 flex items-center justify-center ${isDark
                  ? 'bg-black text-white border-white hover:bg-white hover:text-black'
                  : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
              aria-label="View details"
            >
              <SlidersHorizontal className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
            </button>

            <button
              onClick={() => handleButtonSwipe('right')}
              className={`w-14 h-14 sm:w-16 sm:h-16 border-5 transition-all duration-200 flex items-center justify-center ${isDark
                  ? 'bg-white text-black border-white hover:bg-black hover:text-white'
                  : 'bg-black text-white border-black hover:bg-white hover:text-black'
                }`}
              aria-label="Save event"
            >
              <Heart className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" strokeWidth={3} />
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className={`text-center mt-6 sm:mt-8 text-sm sm:text-base font-bold uppercase tracking-wide ${isDark ? 'text-white' : 'text-black'}`}>
          <p>💡 Swipe right or tap ❤ to save • Swipe left or tap ✕ to skip</p>
        </div>
      </div>
    </div>
  );
};

export default SwipeFeed;
