import React from 'react';
import { MenuItem, CartItem } from '../types';
import { useCategories } from '../hooks/useCategories';
import MenuItemCard from './MenuItemCard';

// Preload images for better performance
const preloadImages = (items: MenuItem[]) => {
  items.forEach(item => {
    if (item.image) {
      const img = new Image();
      img.src = item.image;
    }
  });
};

interface MenuProps {
  menuItems: MenuItem[];
  addToCart: (item: MenuItem, quantity?: number, variation?: any, addOns?: any[]) => void;
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, addToCart, cartItems, updateQuantity }) => {
  const { categories } = useCategories();
  const [activeCategory, setActiveCategory] = React.useState('hot-coffee');

  // Preload images when menu items change
  React.useEffect(() => {
    if (menuItems.length > 0) {
      // Preload images for visible category first
      const visibleItems = menuItems.filter(item => item.category === activeCategory);
      preloadImages(visibleItems);
      
      // Then preload other images after a short delay
      setTimeout(() => {
        const otherItems = menuItems.filter(item => item.category !== activeCategory);
        preloadImages(otherItems);
      }, 1000);
    }
  }, [menuItems, activeCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const headerHeight = 80; // Header height
      const mobileNavHeight = 60; // Mobile nav height
      const offset = headerHeight + mobileNavHeight + 20; // Extra padding
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    if (categories.length > 0) {
      // Set default to dim-sum if it exists, otherwise first category
      const defaultCategory = categories.find(cat => cat.id === 'dim-sum') || categories[0];
      if (!categories.find(cat => cat.id === activeCategory)) {
        setActiveCategory(defaultCategory.id);
      }
    }
  }, [categories, activeCategory]);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(cat => document.getElementById(cat.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(categories[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-primary-600 mb-3 md:mb-4 tracking-wide">
              OUR MENU
            </h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-primary mx-auto mb-4 md:mb-6 rounded-full"></div>
            <p className="text-sm sm:text-base md:text-lg font-body text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              Discover our premium selection of delicious dishes crafted with passion and served with excellence.
            </p>
          </div>

          {categories.map((category) => {
            const categoryItems = menuItems.filter(item => item.category === category.id);
            
            if (categoryItems.length === 0) return null;
            
            return (
              <section key={category.id} id={category.id} className="mb-12 sm:mb-16 md:mb-20 animate-slide-up">
                {/* Category Header */}
                <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10">
                  <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 bg-white rounded-xl sm:rounded-2xl shadow-lg px-4 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 border-2 border-primary-100">
                    <span className="text-2xl sm:text-3xl md:text-4xl">{category.icon}</span>
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-heading text-primary-700 tracking-wide">
                      {category.name.toUpperCase()}
                    </h3>
                  </div>
                </div>
                
                {/* Menu Items Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                  {categoryItems.map((item) => {
                    const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
                    return (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        onAddToCart={addToCart}
                        quantity={cartItem?.quantity || 0}
                        onUpdateQuantity={updateQuantity}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Menu;
