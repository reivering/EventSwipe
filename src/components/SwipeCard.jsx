import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { Calendar, MapPin, DollarSign, Users, Info } from 'lucide-react';
import { format } from 'date-fns';

const SwipeCard = ({ event, onSwipeLeft, onSwipeRight, onShowDetails, style, isTop }) => {
  const [gone, setGone] = useState(false);
  const [direction, setDirection] = useState(null);

  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
  }));

  const bind = useDrag(
    ({ movement: [mx, my], velocity: [vx], direction: [dx], down, cancel }) => {
      const trigger = Math.abs(mx) > 200 || Math.abs(vx) > 0.5;
      const dir = dx < 0 ? -1 : 1;

      if (!down && trigger) {
        setGone(true);
        setDirection(dir);

        // Trigger callback
        setTimeout(() => {
          if (dir === 1) {
            onSwipeRight(event.id);
          } else {
            onSwipeLeft(event.id);
          }
        }, 200);
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
      <div className="card relative select-none cursor-grab active:cursor-grabbing">
        {/* Event Image */}
        <div className="relative h-96 overflow-hidden bg-white">
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
            className="absolute top-8 right-8 bg-white text-black border-5 border-black px-8 py-4 font-bold text-2xl uppercase tracking-wider"
          >
            INTERESTED ✓
          </animated.div>

          <animated.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-8 left-8 bg-black text-white border-5 border-white px-8 py-4 font-bold text-2xl uppercase tracking-wider"
          >
            SKIP ✗
          </animated.div>

          {/* Event Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white border-t-5 border-white bg-black">
            <h2 className="text-3xl font-bold mb-3 uppercase tracking-tight">{event.title}</h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-wide border-2 border-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-2 font-medium">
              <div className="flex items-center text-sm">
                <Calendar className="w-5 h-5 mr-2" strokeWidth={3} />
                {format(new Date(event.date), 'EEE, MMM d, yyyy • h:mm a')}
              </div>

              <div className="flex items-center text-sm">
                <MapPin className="w-5 h-5 mr-2" strokeWidth={3} />
                {event.location}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm font-bold">
                  <DollarSign className="w-5 h-5 mr-1" strokeWidth={3} />
                  {event.price}
                </div>

                <div className="flex items-center text-sm">
                  <Users className="w-5 h-5 mr-1" strokeWidth={3} />
                  {event.attendees}
                </div>
              </div>
            </div>
          </div>

          {/* Info Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShowDetails(event);
            }}
            className="absolute top-6 right-6 bg-white text-black border-3 border-black p-3 hover:bg-black hover:text-white hover:border-white transition-colors duration-100"
          >
            <Info className="w-6 h-6" strokeWidth={3} />
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default SwipeCard;
