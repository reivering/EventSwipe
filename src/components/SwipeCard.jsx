import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { Calendar, MapPin, DollarSign, Users, Info } from 'lucide-react';
import { format } from 'date-fns';

const SwipeCard = ({ event, onSwipeLeft, onSwipeRight, onShowDetails, style, isTop }) => {
  const [gone, setGone] = useState(false);
  const [direction, setDirection] = useState(null);

  const [{ x, y, rotate, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
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
        }, 300);
      }

      api.start({
        x: gone ? (200 + window.innerWidth) * dir : down ? mx : 0,
        y: down ? my : 0,
        rotate: gone ? dir * 45 : down ? mx / 20 : 0,
        scale: down ? 1.05 : 1,
        config: { friction: 50, tension: down ? 800 : gone ? 200 : 500 },
      });
    },
    { pointer: { touch: true } }
  );

  if (!event) return null;

  const swipeOpacity = x.to([-200, 0, 200], [0, 1, 0]);
  const likeOpacity = x.to([0, 200], [0, 1]);
  const nopeOpacity = x.to([-200, 0], [1, 0]);

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        rotate,
        scale,
        touchAction: 'none',
        ...style,
      }}
      className={`absolute w-full max-w-sm ${isTop ? 'z-10' : 'z-0'}`}
    >
      <div className="card relative select-none cursor-grab active:cursor-grabbing">
        {/* Event Image */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            draggable="false"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Swipe Indicators */}
          <animated.div
            style={{ opacity: likeOpacity }}
            className="absolute top-8 right-8 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-xl rotate-12 shadow-lg"
          >
            INTERESTED ✓
          </animated.div>
          
          <animated.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-8 left-8 bg-red-500 text-white px-6 py-3 rounded-full font-bold text-xl -rotate-12 shadow-lg"
          >
            SKIP ✗
          </animated.div>

          {/* Event Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{event.title}</h2>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                {format(new Date(event.date), 'EEE, MMM d, yyyy • h:mm a')}
              </div>
              
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                {event.location}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {event.price}
                </div>
                
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  {event.attendees} interested
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
            className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <Info className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default SwipeCard;
