import React, { useState } from 'react';
import useStore from '../store/useStore';
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
    <div className="min-h-screen pt-20 pb-32 md:pt-24 md:pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="text-3xl font-bold text-center border-2 border-primary-500 rounded-lg px-4 py-2 mb-2"
            />
          ) : (
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
          )}

          {isEditing ? (
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="text-gray-600 border-2 border-gray-300 rounded-lg px-4 py-2"
            />
          ) : (
            <div className="flex items-center justify-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              {user.location}
            </div>
          )}

          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="mt-4 inline-flex items-center space-x-2 px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <Edit2 className="w-5 h-5" />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-primary-500 mb-1">
              {savedEvents.length}
            </div>
            <div className="text-sm text-gray-600">Saved Events</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-primary-500 mb-1">
              {user.interests.length}
            </div>
            <div className="text-sm text-gray-600">Interests</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-primary-500 mb-1">
              {Math.floor(Math.random() * 50) + 20}
            </div>
            <div className="text-sm text-gray-600">Events Swiped</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-primary-500 mb-1">
              {Math.floor(Math.random() * 30) + 5}
            </div>
            <div className="text-sm text-gray-600">Days Active</div>
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Interests</h2>
            <Heart className="w-6 h-6 text-primary-500" />
          </div>
          
          <p className="text-gray-600 mb-4">
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  (isEditing ? formData.interests : user.interests).includes(category)
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${!isEditing && 'cursor-default'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
            <Calendar className="w-6 h-6 text-primary-500" />
          </div>

          {savedEvents.length > 0 ? (
            <div className="space-y-4">
              {savedEvents.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-primary-500">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-xs text-gray-600">{event.price}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 py-8">
              No upcoming events. Start swiping to find events you love!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
