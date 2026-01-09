import React from 'react';
import useStore from '../store/useStore';
import { Calendar, MapPin, DollarSign, X } from 'lucide-react';
import { format } from 'date-fns';

const SavedEvents = () => {
  const { savedEvents, unsaveEvent, openEventModal } = useStore();

  if (savedEvents.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-32 md:pt-24 md:pb-8 px-4">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Saved Events</h1>
          
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No saved events yet
            </h2>
            <p className="text-gray-600">
              Start swiping and save events you're interested in!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-32 md:pt-24 md:pb-8 px-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Saved Events</h1>
          <p className="text-gray-600 mt-1">
            {savedEvents.length} event{savedEvents.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedEvents.map((event) => (
            <div
              key={event.id}
              className="card overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow"
              onClick={() => openEventModal(event)}
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    unsaveEvent(event.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 transition-colors group/btn"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Tags */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="flex flex-wrap gap-1">
                    {event.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {event.title}
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">
                      {format(new Date(event.date), 'MMM d, yyyy • h:mm a')}
                    </span>
                  </div>

                  <div className="flex items-start text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="font-semibold">{event.price}</span>
                    </div>
                    
                    <span className="text-primary-500 font-semibold text-sm">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedEvents;
