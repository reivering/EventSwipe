import React from 'react';
import useStore from '../store/useStore';
import StarryBackground from './StarryBackground';
import { X, Calendar, MapPin, DollarSign, Users, Share2, Navigation } from 'lucide-react';
import { format } from 'date-fns';

const EventModal = () => {
  const { showEventModal, selectedEvent, closeEventModal, savedEvents, swipeRight, unsaveEvent } = useStore();

  if (!showEventModal || !selectedEvent) return null;

  const isSaved = savedEvents.find(e => e.id === selectedEvent.id);
  const isDark = document.body.classList.contains('dark');

  const handleSave = () => {
    if (isSaved) {
      unsaveEvent(selectedEvent.id);
    } else {
      swipeRight(selectedEvent.id);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedEvent.title,
        text: `Check out this event: ${selectedEvent.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 p-0 md:p-4">
      {/* Starry Background for dark mode */}
      {isDark && <StarryBackground />}

      <div
        className={`w-full md:max-w-3xl border-5 overflow-hidden max-h-[95vh] md:max-h-[90vh] overflow-y-auto transition-colors duration-300 relative z-10 ${isDark ? 'bg-black border-white' : 'bg-white border-black'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className={`relative h-64 sm:h-80 border-b-5 ${isDark ? 'border-white' : 'border-black'}`}>
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />

          <button
            onClick={closeEventModal}
            className={`absolute top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 border-3 flex items-center justify-center transition-all duration-200 ${isDark
              ? 'bg-white text-black border-black hover:bg-black hover:text-white hover:border-white'
              : 'bg-white text-black border-black hover:bg-black hover:text-white hover:border-white'
              }`}
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3} />
          </button>

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
            <div className="flex flex-wrap gap-2">
              {selectedEvent.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white text-black px-2 sm:px-3 py-1 text-xs font-bold uppercase tracking-wide border-2 border-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
            {selectedEvent.title}
          </h2>

          {/* Event Details */}
          <div className={`space-y-4 sm:space-y-5 mb-6 sm:mb-8 border-5 p-4 sm:p-6 transition-colors duration-300 ${isDark ? 'border-white bg-black' : 'border-black bg-white'
            }`}>
            <div className={`flex items-start pb-3 sm:pb-4 border-b-3 ${isDark ? 'border-white' : 'border-black'}`}>
              <Calendar className={`w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 mt-1 flex-shrink-0 ${isDark ? 'text-white' : 'text-black'}`} strokeWidth={3} />
              <div>
                <p className={`font-bold text-base sm:text-lg uppercase ${isDark ? 'text-white' : 'text-black'}`}>
                  {format(new Date(selectedEvent.date), 'EEEE, MMMM d, yyyy')}
                </p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                  {format(new Date(selectedEvent.date), 'h:mm a')}
                </p>
              </div>
            </div>

            <div className={`flex items-start pb-3 sm:pb-4 border-b-3 ${isDark ? 'border-white' : 'border-black'}`}>
              <MapPin className={`w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 mt-1 flex-shrink-0 ${isDark ? 'text-white' : 'text-black'}`} strokeWidth={3} />
              <div>
                <p className={`font-bold text-base sm:text-lg ${isDark ? 'text-white' : 'text-black'}`}>{selectedEvent.location}</p>
                <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-black'}`}>{selectedEvent.address}</p>
              </div>
            </div>

            <div className={`flex items-center pb-3 sm:pb-4 border-b-3 ${isDark ? 'border-white' : 'border-black'}`}>
              <DollarSign className={`w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 ${isDark ? 'text-white' : 'text-black'}`} strokeWidth={3} />
              <span className={`font-bold text-lg sm:text-xl uppercase ${isDark ? 'text-white' : 'text-black'}`}>{selectedEvent.price}</span>
            </div>

            <div className="flex items-center">
              <Users className={`w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 ${isDark ? 'text-white' : 'text-black'}`} strokeWidth={3} />
              <span className={`font-bold uppercase ${isDark ? 'text-white' : 'text-black'}`}>{selectedEvent.attendees} Interested</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 sm:mb-8">
            <h3 className={`font-bold mb-2 sm:mb-3 text-lg sm:text-xl uppercase tracking-wide ${isDark ? 'text-white' : 'text-black'}`}>
              About
            </h3>
            <p className={`leading-relaxed font-medium ${isDark ? 'text-white' : 'text-black'}`}>{selectedEvent.description}</p>
          </div>

          {/* Organizer */}
          <div className={`mb-6 sm:mb-8 p-4 sm:p-5 border-5 transition-colors duration-300 ${isDark ? 'border-white bg-black' : 'border-black bg-white'
            }`}>
            <p className={`text-xs sm:text-sm font-bold uppercase tracking-wide mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
              Organized By
            </p>
            <p className={`font-bold text-lg sm:text-xl ${isDark ? 'text-white' : 'text-black'}`}>{selectedEvent.organizer}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={handleSave}
              className={`w-full py-4 sm:py-5 font-bold text-lg sm:text-xl uppercase tracking-wider border-5 transition-all duration-200 ${isSaved
                ? isDark
                  ? 'bg-black text-white border-white hover:bg-white hover:text-black'
                  : 'bg-white text-black border-black hover:bg-black hover:text-white'
                : isDark
                  ? 'bg-white text-black border-white hover:bg-black hover:text-white'
                  : 'bg-black text-white border-black hover:bg-white hover:text-black'
                }`}
            >
              {isSaved ? '✓ SAVED' : '❤ SAVE EVENT'}
            </button>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={handleShare}
                className={`flex items-center justify-center space-x-2 py-3 sm:py-4 border-5 transition-all duration-200 font-bold uppercase ${isDark
                  ? 'border-white text-white bg-black hover:bg-white hover:text-black'
                  : 'border-black text-black bg-white hover:bg-black hover:text-white'
                  }`}
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                <span className="text-sm sm:text-base">Share</span>
              </button>

              <button
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(selectedEvent.address)}`, '_blank')}
                className={`flex items-center justify-center space-x-2 py-3 sm:py-4 border-5 transition-all duration-200 font-bold uppercase ${isDark
                  ? 'border-white text-white bg-black hover:bg-white hover:text-black'
                  : 'border-black text-black bg-white hover:bg-black hover:text-white'
                  }`}
              >
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                <span className="text-sm sm:text-base">Directions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
