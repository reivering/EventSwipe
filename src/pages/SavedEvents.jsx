import React from 'react';
import useStore from '../store/useStore';
import StarryBackground from '../components/StarryBackground';
import { Calendar, MapPin, DollarSign, X } from 'lucide-react';
import { format } from 'date-fns';

const SavedEvents = () => {
  const { savedEvents, unsaveEvent, openEventModal } = useStore();
  const isDark = document.body.classList.contains('dark');

  if (savedEvents.length === 0) {
    return (
      <div className={`min-h-screen pt-20 pb-32 md:pt-24 md:pb-8 px-4 relative ${isDark ? 'bg-black' : 'bg-white'}`}>
        {isDark && <StarryBackground />}
        <div className="max-w-screen-xl mx-auto relative z-10">
          <h1 className={`text-3xl font-bold mb-8 uppercase ${isDark ? 'text-white' : 'text-black'}`}>
            Saved Events
          </h1>

          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <h2 className={`text-2xl font-bold mb-2 uppercase ${isDark ? 'text-white' : 'text-black'}`}>
              No saved events yet
            </h2>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
              Start swiping and save events you're interested in!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 pb-32 md:pt-24 md:pb-8 px-4 relative ${isDark ? 'bg-black' : 'bg-white'}`}>
      {isDark && <StarryBackground />}
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold uppercase ${isDark ? 'text-white' : 'text-black'}`}>
            Saved Events
          </h1>
          <p className={`mt-1 font-medium ${isDark ? 'text-white' : 'text-black'}`}>
            {savedEvents.length} event{savedEvents.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedEvents.map((event) => (
            <div
              key={event.id}
              className={`card overflow-hidden group cursor-pointer transition-all duration-200 hover:scale-105 ${isDark ? 'bg-black border-white' : 'bg-white border-black'
                }`}
              onClick={() => openEventModal(event)}
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    unsaveEvent(event.id);
                  }}
                  className={`absolute top-2 right-2 w-8 h-8 border-3 flex items-center justify-center transition-all duration-200 ${isDark
                      ? 'bg-white text-black border-white hover:bg-black hover:text-white'
                      : 'bg-black text-white border-black hover:bg-white hover:text-black'
                    }`}
                >
                  <X className="w-5 h-5" strokeWidth={3} />
                </button>

                {/* Tags */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="flex flex-wrap gap-1">
                    {event.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white text-black px-2 py-1 text-xs font-bold uppercase border-2 border-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4">
                <h3 className={`text-xl font-bold mb-3 line-clamp-2 uppercase ${isDark ? 'text-white' : 'text-black'}`}>
                  {event.title}
                </h3>

                <div className="space-y-2 text-sm">
                  <div className={`flex items-start font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                    <Calendar className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" strokeWidth={3} />
                    <span className="line-clamp-1">
                      {format(new Date(event.date), 'MMM d, yyyy • h:mm a')}
                    </span>
                  </div>

                  <div className={`flex items-start font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" strokeWidth={3} />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className={`flex items-center font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                      <DollarSign className="w-4 h-4 mr-1" strokeWidth={3} />
                      <span>{event.price}</span>
                    </div>

                    <span className={`font-bold text-sm uppercase ${isDark ? 'text-white' : 'text-black'}`}>
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
