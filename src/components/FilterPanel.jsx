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
    <div className="bg-white border-5 border-black p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b-3 border-black">
        <h2 className="text-3xl font-bold text-black uppercase tracking-tight">Filters</h2>
        <button
          onClick={() => setFilters({ categories: [], dateRange: 'all', priceRange: 'all' })}
          className="text-black hover:bg-black hover:text-white font-bold text-sm uppercase px-4 py-2 border-3 border-black transition-colors duration-100"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Categories</h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.filter(c => c !== 'All').map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`px-4 py-3 text-sm font-bold uppercase tracking-wide border-3 transition-colors duration-100 ${filters.categories.includes(category)
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">When</h3>
        <div className="grid grid-cols-2 gap-3">
          {['all', 'today', 'week', 'month'].map((range) => (
            <button
              key={range}
              onClick={() => setFilters({ dateRange: range })}
              className={`px-4 py-3 text-sm font-bold uppercase tracking-wide border-3 transition-colors duration-100 ${filters.dateRange === range
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
            >
              {range === 'all' ? 'All' : range === 'today' ? 'Today' : range === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">Price</h3>
        <div className="grid grid-cols-3 gap-3">
          {['all', 'free', 'paid'].map((price) => (
            <button
              key={price}
              onClick={() => setFilters({ priceRange: price })}
              className={`px-4 py-3 text-sm font-bold uppercase tracking-wide border-3 transition-colors duration-100 ${filters.priceRange === price
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black hover:bg-black hover:text-white'
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
