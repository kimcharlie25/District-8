import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const { siteSettings, loading } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-gradient-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <button 
            onClick={onMenuClick}
            className="flex items-center space-x-3 group"
          >
            {loading ? (
              <div className="w-12 h-12 bg-white/20 rounded-xl animate-pulse" />
            ) : (
              <img 
                src={siteSettings?.site_logo || "/logo.jpg"} 
                alt={siteSettings?.site_name || "District 8"}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/30 group-hover:ring-white/60 transition-all duration-300 shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = "/logo.jpg";
                }}
              />
            )}
            <div>
              {loading ? (
                <div className="w-32 h-7 bg-white/20 rounded animate-pulse" />
              ) : (
                <h1 className="text-2xl font-heading text-white tracking-wider group-hover:scale-105 transition-transform duration-200">
                  {siteSettings?.site_name?.toUpperCase() || "CLICKEATS"}
                </h1>
              )}
            </div>
          </button>

          {/* Cart Button */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onCartClick}
              className="relative bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl transition-all duration-300 group border border-white/20 hover:border-white/40"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-200" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-primary-900 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-bounce-gentle border-2 border-white">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
