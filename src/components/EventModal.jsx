import React from 'react';
import useStore from '../store/useStore';
import { X, Calendar, MapPin, DollarSign, Users, Share2, Navigation } from 'lucide-react';
import { format } from 'date-fns';

const EventModal = () => {
  const { showEventModal, selectedEvent, closeEventModal, savedEvents, swipeRight, unsaveEvent } = useStore();

  if (!showEventModal || !selectedEvent) return null;

  const isSaved = savedEvents.find(e => e.id === selectedEvent.id);

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
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80">
      <div
        className="bg-white w-full md:max-w-3xl border-5 border-black overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-80 border-b-5 border-black">
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />

          <button
            onClick={closeEventModal}
            className="absolute top-6 right-6 w-12 h-12 bg-white text-black border-3 border-black flex items-center justify-center hover:bg-black hover:text-white hover:border-white transition-colors duration-100"
          >
            <X className="w-8 h-8" strokeWidth={3} />
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2">
              {selectedEvent.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-wide border-2 border-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-4xl font-bold text-black mb-6 uppercase tracking-tight">
            {selectedEvent.title}
          </h2>

          {/* Event Details */}
          <div className="space-y-5 mb-8 border-5 border-black p-6 bg-white">
            <div className="flex items-start pb-4 border-b-3 border-black">
              <Calendar className="w-6 h-6 text-black mr-4 mt-1 flex-shrink-0" strokeWidth={3} />
              <div>
                <p className="font-bold text-black text-lg uppercase">
                  {format(new Date(selectedEvent.date), 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-black font-medium">
                  {format(new Date(selectedEvent.date), 'h:mm a')}
                </p>
              </div>
            </div>

            <div className="flex items-start pb-4 border-b-3 border-black">
              <MapPin className="w-6 h-6 text-black mr-4 mt-1 flex-shrink-0" strokeWidth={3} />
              <div>
                <p className="font-bold text-black text-lg">{selectedEvent.location}</p>
                <p className="text-black font-medium text-sm">{selectedEvent.address}</p>
              </div>
            </div>

            <div className="flex items-center pb-4 border-b-3 border-black">
              <DollarSign className="w-6 h-6 text-black mr-4" strokeWidth={3} />
              <span className="font-bold text-black text-xl uppercase">{selectedEvent.price}</span>
            </div>

            <div className="flex items-center">
              <Users className="w-6 h-6 text-black mr-4" strokeWidth={3} />
              <span className="text-black font-bold uppercase">{selectedEvent.attendees} Interested</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-bold text-black mb-3 text-xl uppercase tracking-wide">About</h3>
            <p className="text-black leading-relaxed font-medium">{selectedEvent.description}</p>
          </div>

          {/* Organizer */}
          <div className="mb-8 p-5 border-5 border-black bg-white">
            <p className="text-sm text-black font-bold uppercase tracking-wide mb-1">Organized By</p>
            <p className="font-bold text-black text-xl">{selectedEvent.organizer}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleSave}
              className={`w-full py-5 font-bold text-xl uppercase tracking-wider border-5 transition-colors duration-100 ${isSaved
                  ? 'bg-white text-black border-black hover:bg-black hover:text-white'
                  : 'bg-black text-white border-black hover:bg-white hover:text-black'
                }`}
            >
              {isSaved ? '✓ SAVED' : '❤ SAVE EVENT'}
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleShare}
                className="flex items-center justify-center space-x-2 py-4 border-5 border-black text-black bg-white hover:bg-black hover:text-white transition-colors duration-100 font-bold uppercase"
              >
                <Share2 className="w-5 h-5" strokeWidth={3} />
                <span>Share</span>
              </button>

              <button
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(selectedEvent.address)}`, '_blank')}
                className="flex items-center justify-center space-x-2 py-4 border-5 border-black text-black bg-white hover:bg-black hover:text-white transition-colors duration-100 font-bold uppercase"
              >
                <Navigation className="w-5 h-5" strokeWidth={3} />
                <span>Directions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
