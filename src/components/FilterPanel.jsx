import React from 'react';
import useStore from '../store/useStore';
import { categories } from '../data/mockEvents';

const FilterPanel = ({ onClose }) => {
  const { filters, setFilters } = useStore();
  const isDark = document.body.classList.contains('dark');

  const handleCategoryToggle = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    setFilters({ categories: newCategories });
  };

  return (
    <div className={`p-4 sm:p-6 border-5 transition-colors duration-300 ${isDark ? 'bg-black border-white' : 'bg-white border-black'
      }`}>
      <div className={`flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-3 ${isDark ? 'border-white' : 'border-black'
        }`}>
        <h2 className={`text-2xl sm:text-3xl font-bold uppercase tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
          Filters
        </h2>
        <button
          onClick={() => setFilters({ categories: [], dateRange: 'all', priceRange: 'all' })}
          className={`font-bold text-xs sm:text-sm uppercase px-3 sm:px-4 py-2 border-3 transition-all duration-200 ${isDark
              ? 'text-white border-white hover:bg-white hover:text-black'
              : 'text-black border-black hover:bg-black hover:text-white'
            }`}
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-4 sm:mb-6">
        <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wide ${isDark ? 'text-white' : 'text-black'}`}>
          Categories
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {categories.filter(c => c !== 'All').map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wide border-3 transition-all duration-200 ${filters.categories.includes(category)
                  ? isDark
                    ? 'bg-white text-black border-white'
                    : 'bg-black text-white border-black'
                  : isDark
                    ? 'bg-black text-white border-white hover:bg-white hover:text-black'
                    : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="mb-4 sm:mb-6">
        <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wide ${isDark ? 'text-white' : 'text-black'}`}>
          When
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {['all', 'today', 'week', 'month'].map((range) => (
            <button
              key={range}
              onClick={() => setFilters({ dateRange: range })}
              className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wide border-3 transition-all duration-200 ${filters.dateRange === range
                  ? isDark
                    ? 'bg-white text-black border-white'
                    : 'bg-black text-white border-black'
                  : isDark
                    ? 'bg-black text-white border-white hover:bg-white hover:text-black'
                    : 'bg-white text-black border-black hover:bg-black hover:text-white'
                }`}
            >
              {range === 'all' ? 'All' : range === 'today' ? 'Today' : range === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4 sm:mb-6">
        <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 uppercase tracking-wide ${isDark ? 'text-white' : 'text-black'}`}>
          Price
        </h3>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {['all', 'free', 'paid'].map((price) => (
            <button
              key={price}
              onClick={() => setFilters({ priceRange: price })}
              className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wide border-3 transition-all duration-200 ${filters.priceRange === price
                  ? isDark
                    ? 'bg-white text-black border-white'
                    : 'bg-black text-white border-black'
                  : isDark
                    ? 'bg-black text-white border-white hover:bg-white hover:text-black'
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
