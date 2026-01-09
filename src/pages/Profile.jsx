import React, { useState } from 'react';
import useStore from '../store/useStore';
import StarryBackground from '../components/StarryBackground';
import { categories } from '../data/mockEvents';
import { User, MapPin, Heart, Calendar, Edit2, Save } from 'lucide-react';

const Profile = () => {
  const { user, setUser, savedEvents } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    location: user.location,
    interests: user.interests,
  });
  const isDark = document.body.classList.contains('dark');

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  const handleInterestToggle = (interest) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];

    setFormData({ ...formData, interests: newInterests });
  };

  return (
    <div className={`min-h-screen pt-20 pb-32 md:pt-24 md:pb-8 px-4 relative ${isDark ? 'bg-black' : 'bg-white'}`}>
      {isDark && <StarryBackground />}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-24 h-24 border-5 mx-auto mb-4 flex items-center justify-center ${isDark ? 'border-white' : 'border-black'
            }`}>
            <User className={`w-12 h-12 ${isDark ? 'text-white' : 'text-black'}`} strokeWidth={3} />
          </div>

          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`text-3xl font-bold text-center border-5 px-4 py-2 mb-2 uppercase ${isDark
                  ? 'border-white bg-black text-white'
                  : 'border-black bg-white text-black'
                }`}
            />
          ) : (
            <h1 className={`text-3xl font-bold mb-2 uppercase ${isDark ? 'text-white' : 'text-black'}`}>
              {user.name}
            </h1>
          )}

          {isEditing ? (
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`border-3 px-4 py-2 font-medium ${isDark
                  ? 'border-white bg-black text-white'
                  : 'border-black bg-white text-black'
                }`}
            />
          ) : (
            <div className={`flex items-center justify-center font-medium ${isDark ? 'text-white' : 'text-black'}`}>
              <MapPin className="w-5 h-5 mr-2" strokeWidth={3} />
              {user.location}
            </div>
          )}

          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className={`mt-4 inline-flex items-center space-x-2 px-6 py-3 border-5 font-bold uppercase transition-all duration-200 ${isDark
                ? 'bg-white text-black border-white hover:bg-black hover:text-white'
                : 'bg-black text-white border-black hover:bg-white hover:text-black'
              }`}
          >
            {isEditing ? (
              <>
                <Save className="w-5 h-5" strokeWidth={3} />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <Edit2 className="w-5 h-5" strokeWidth={3} />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className={`border-5 p-6 text-center ${isDark ? 'border-white bg-black' : 'border-black bg-white'}`}>
            <div className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
              {savedEvents.length}
            </div>
            <div className={`text-sm font-bold uppercase ${isDark ? 'text-white' : 'text-black'}`}>
              Saved Events
            </div>
          </div>

          <div className={`border-5 p-6 text-center ${isDark ? 'border-white bg-black' : 'border-black bg-white'}`}>
            <div className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
              {user.interests.length}
            </div>
            <div className={`text-sm font-bold uppercase ${isDark ? 'text-white' : 'text-black'}`}>
              Interests
            </div>
          </div>

          <div className={`border-5 p-6 text-center ${isDark ? 'border-white bg-black' : 'border-black bg-white'}`}>
            <div className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
              {Math.floor(Math.random() * 50) + 20}
            </div>
            <div className={`text-sm font-bold uppercase ${isDark ? 'text-white' : 'text-black'}`}>
              Events Swiped
            </div>
          </div>

          <div className={`border-5 p-6 text-center ${isDark ? 'border-white bg-black' : 'border-black bg-white'}`}>
            <div className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
              {Math.floor(Math.random() * 30) + 5}
            </div>
            <div className={`text-sm font-bold uppercase ${isDark ? 'text-white' : 'text-black'}`}>
              Days Active
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className={`border-5 p-6 mb-8 ${isDark ? 'border-white bg-black' : 'border-black bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-2xl font-bold uppercase ${isDark ? 'text-white' : 'text-black'}`}>
              Your Interests
            </h2>
            <Heart className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} strokeWidth={3} />
          </div>

          <p className={`mb-4 font-medium ${isDark ? 'text-white' : 'text-black'}`}>
            {isEditing
              ? 'Select categories you\'re interested in to get better recommendations'
              : 'These help us recommend events you\'ll love'}
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.filter(c => c !== 'All').map((category) => (
              <button
                key={category}
                onClick={() => isEditing && handleInterestToggle(category)}
                disabled={!isEditing}
                className={`px-4 py-2 text-sm font-bold uppercase border-3 transition-all duration-200 ${(isEditing ? formData.interests : user.interests).includes(category)
                    ? isDark
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-white border-black'
                    : isDark
                      ? 'bg-black text-white border-white hover:bg-white hover:text-black'
                      : 'bg-white text-black border-black hover:bg-black hover:text-white'
                  } ${!isEditing && 'cursor-default'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className={`border-5 p-6 ${isDark ? 'border-white bg-black' : 'border-black bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-2xl font-bold uppercase ${isDark ? 'text-white' : 'text-black'}`}>
              Upcoming Events
            </h2>
            <Calendar className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} strokeWidth={3} />
          </div>

          {savedEvents.length > 0 ? (
            <div className="space-y-4">
              {savedEvents.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className={`flex items-center space-x-4 p-3 border-3 transition-all duration-200 cursor-pointer ${isDark
                      ? 'border-white hover:bg-white hover:text-black'
                      : 'border-black hover:bg-black hover:text-white'
                    }`}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-16 h-16 object-cover border-3 border-current"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold uppercase">{event.title}</h3>
                    <p className="text-sm font-medium">{event.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold uppercase">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-xs font-bold">{event.price}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-center py-8 font-medium ${isDark ? 'text-white' : 'text-black'}`}>
              No upcoming events. Start swiping to find events you love!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
