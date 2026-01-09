import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { Calendar, MapPin, DollarSign, Users, Info } from 'lucide-react';
import { format } from 'date-fns';

const SwipeCard = ({ event, onSwipeLeft, onSwipeRight, onShowDetails, style, isTop }) => {
  const [gone, setGone] = useState(false);
  const hasSwipedRef = useRef(false);
  const isDark = document.body.classList.contains('dark');

  // Reset hasSwipedRef when event changes or when card becomes top
  useEffect(() => {
    hasSwipedRef.current = false;
    setGone(false);
  }, [event.id, isTop]);

  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
  }));

  const bind = useDrag(
    ({ movement: [mx, my], velocity: [vx], direction: [dx], down, cancel, last }) => {
      // Only allow swiping if this is the top card and hasn't been swiped yet
      if (!isTop || hasSwipedRef.current) {
        return;
      }

      const trigger = Math.abs(mx) > 200 || Math.abs(vx) > 0.5;
      const dir = dx < 0 ? -1 : 1;

      // Only process on the LAST event of the gesture (when finger/mouse is released)
      if (last && trigger && !gone) {
        // Mark as swiped IMMEDIATELY to prevent any duplicate calls
        if (hasSwipedRef.current) {
          console.log('Blocked duplicate swipe in handler');
          return;
        }

        hasSwipedRef.current = true;
        setGone(true);

        // Call the swipe handler
        console.log('SwipeCard calling handler for event:', event.id, 'direction:', dir === 1 ? 'right' : 'left');
        if (dir === 1) {
          onSwipeRight(event.id);
        } else {
          onSwipeLeft(event.id);
        }
      }

      api.start({
        x: gone ? (200 + window.innerWidth) * dir : down ? mx : 0,
        y: down ? my : 0,
        scale: down ? 1.02 : 1,
        config: { friction: 50, tension: down ? 800 : gone ? 200 : 500 },
      });
    },
    { pointer: { touch: true } }
  );

  if (!event) return null;

  const likeOpacity = x.to([0, 200], [0, 1]);
  const nopeOpacity = x.to([-200, 0], [1, 0]);

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        scale,
        touchAction: 'none',
        ...style,
      }}
      className={`absolute w-full max-w-sm ${isTop ? 'z-10' : 'z-0'}`}
    >
      <div className={`card relative select-none cursor-grab active:cursor-grabbing transition-colors duration-300 ${isDark ? 'bg-black border-white' : 'bg-white border-black'
        }`}>
        {/* Event Image */}
        <div className="relative h-80 sm:h-96 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            draggable="false"
          />

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Swipe Indicators */}
          <animated.div
            style={{ opacity: likeOpacity }}
            className="absolute top-6 sm:top-8 right-6 sm:right-8 bg-white text-black border-5 border-black px-4 sm:px-8 py-2 sm:py-4 font-bold text-lg sm:text-2xl uppercase tracking-wider pointer-events-none"
          >
            INTERESTED ✓
          </animated.div>

          <animated.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-6 sm:top-8 left-6 sm:left-8 bg-black text-white border-5 border-white px-4 sm:px-8 py-2 sm:py-4 font-bold text-lg sm:text-2xl uppercase tracking-wider pointer-events-none"
          >
            SKIP ✗
          </animated.div>

          {/* Event Info Overlay */}
          <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white border-t-5 transition-colors duration-300 pointer-events-none ${isDark ? 'border-white bg-black' : 'border-white bg-black'
            }`}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 uppercase tracking-tight line-clamp-2">
              {event.title}
            </h2>

            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              {event.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-white text-black px-2 sm:px-3 py-1 text-xs font-bold uppercase tracking-wide border-2 border-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-1 sm:space-y-2 font-medium text-sm sm:text-base">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" strokeWidth={3} />
                <span className="truncate">{format(new Date(event.date), 'EEE, MMM d, yyyy • h:mm a')}</span>
              </div>

              <div className="flex items-center">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" strokeWidth={3} />
                <span className="truncate">{event.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center font-bold">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-1" strokeWidth={3} />
                  {event.price}
                </div>

                <div className="flex items-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-1" strokeWidth={3} />
                  {event.attendees}
                </div>
              </div>
            </div>
          </div>

          {/* Info Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isTop) {
                onShowDetails(event);
              }
            }}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-white text-black border-3 border-black p-2 sm:p-3 hover:bg-black hover:text-white hover:border-white transition-all duration-200 pointer-events-auto"
          >
            <Info className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default SwipeCard;
