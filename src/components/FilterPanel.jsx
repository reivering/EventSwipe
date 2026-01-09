import React from 'react';
import useStore from '../store/useStore';
import { categories } from '../data/mockEvents';

const FilterPanel = ({ onClose }) => {
  const { filters, setFilters } = useStore();

  const handleCategoryToggle = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    
    setFilters({ categories: newCategories });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
        <button
          onClick={() => setFilters({ categories: [], dateRange: 'all', priceRange: 'all' })}
          className="text-primary-500 hover:text-primary-600 font-medium text-sm"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.filter(c => c !== 'All').map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.categories.includes(category)
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">When</h3>
        <div className="grid grid-cols-4 gap-2">
          {['all', 'today', 'week', 'month'].map((range) => (
            <button
              key={range}
              onClick={() => setFilters({ dateRange: range })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.dateRange === range
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range === 'all' ? 'All' : range === 'today' ? 'Today' : range === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Price</h3>
        <div className="grid grid-cols-3 gap-2">
          {['all', 'free', 'paid'].map((price) => (
            <button
              key={price}
              onClick={() => setFilters({ priceRange: price })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.priceRange === price
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {price === 'all' ? 'All' : price === 'free' ? 'Free' : 'Paid'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
