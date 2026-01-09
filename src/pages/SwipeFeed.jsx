import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import SwipeCard from '../components/SwipeCard';
import FilterPanel from '../components/FilterPanel';
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
    <div className="min-h-screen pt-20 pb-32 md:pt-24 md:pb-8 px-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Discover Events</h1>
            <p className="text-gray-600 mt-1">
              {filteredEvents.length - currentEventIndex} events remaining
            </p>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8">
            <FilterPanel onClose={() => setShowFilters(false)} />
          </div>
        )}

        {/* Swipe Cards Area */}
        <div className="flex justify-center items-center min-h-[600px]">
          {currentEvents.length > 0 ? (
            <div className="relative w-full max-w-sm h-[600px]">
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No more events!
              </h2>
              <p className="text-gray-600 mb-6">
                You've seen all the events. Check back later or adjust your filters.
              </p>
              <button
                onClick={resetSwipes}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Start Over</span>
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {currentEvents.length > 0 && (
          <div className="flex justify-center items-center space-x-6 mt-8">
            <button
              onClick={() => handleButtonSwipe('left')}
              className="w-16 h-16 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center border-2 border-red-500 text-red-500 hover:bg-red-50"
              aria-label="Skip event"
            >
              <X className="w-8 h-8" strokeWidth={3} />
            </button>

            <button
              onClick={() => openEventModal(currentEvents[0])}
              className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center text-blue-500 hover:bg-blue-50"
              aria-label="View details"
            >
              <SlidersHorizontal className="w-6 h-6" />
            </button>

            <button
              onClick={() => handleButtonSwipe('right')}
              className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center text-white"
              aria-label="Save event"
            >
              <Heart className="w-8 h-8" fill="currentColor" />
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>💡 Swipe right or tap ❤️ to save • Swipe left or tap ✕ to skip</p>
        </div>
      </div>
    </div>
  );
};

export default SwipeFeed;
