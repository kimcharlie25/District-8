import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  return (
    <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 overflow-x-auto py-4 scrollbar-hide">
          {loading ? (
            <div className="flex space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-11 w-28 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => onCategoryClick('all')}
                className={`px-5 py-2.5 rounded-xl font-body font-medium text-sm transition-all duration-300 border-2 whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-primary text-white border-primary-600 shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary-400 hover:shadow-md hover:scale-105'
                }`}
              >
                ✨ All Items
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCategoryClick(c.id)}
                  className={`px-5 py-2.5 rounded-xl font-body font-medium text-sm transition-all duration-300 border-2 flex items-center space-x-2 whitespace-nowrap ${
                    selectedCategory === c.id
                      ? 'bg-gradient-primary text-white border-primary-600 shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-primary-400 hover:shadow-md hover:scale-105'
                  }`}
                >
                  <span className="text-base">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubNav;
