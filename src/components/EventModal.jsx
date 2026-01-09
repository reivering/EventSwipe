import React from 'react';
import useStore from '../store/useStore';
import { X, Calendar, MapPin, DollarSign, Users, ExternalLink, Share2, Navigation } from 'lucide-react';
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
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white w-full md:max-w-2xl md:rounded-3xl overflow-hidden shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-72">
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <button
            onClick={closeEventModal}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedEvent.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedEvent.title}
          </h2>

          {/* Event Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">
                  {format(new Date(selectedEvent.date), 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-gray-600">
                  {format(new Date(selectedEvent.date), 'h:mm a')}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-primary-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">{selectedEvent.location}</p>
                <p className="text-gray-600 text-sm">{selectedEvent.address}</p>
              </div>
            </div>

            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-primary-500 mr-3" />
              <span className="font-semibold text-gray-900">{selectedEvent.price}</span>
            </div>

            <div className="flex items-center">
              <Users className="w-5 h-5 text-primary-500 mr-3" />
              <span className="text-gray-600">{selectedEvent.attendees} people interested</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">About this event</h3>
            <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
          </div>

          {/* Organizer */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">Organized by</p>
            <p className="font-semibold text-gray-900">{selectedEvent.organizer}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSave}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                isSaved
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
              }`}
            >
              {isSaved ? '✓ Saved to Calendar' : '❤️ Save Event'}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleShare}
                className="flex items-center justify-center space-x-2 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:border-primary-500 hover:text-primary-500 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>

              <button
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(selectedEvent.address)}`, '_blank')}
                className="flex items-center justify-center space-x-2 py-3 rounded-xl border-2 border-gray-200 text-gray-700 hover:border-primary-500 hover:text-primary-500 transition-colors"
              >
                <Navigation className="w-5 h-5" />
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
