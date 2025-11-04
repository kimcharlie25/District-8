import React, { useState } from 'react';
import { Plus, Minus, X, ShoppingCart, Sparkles } from 'lucide-react';
import { MenuItem, Variation, AddOn } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity?: number, variation?: Variation, addOns?: AddOn[]) => void;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ 
  item, 
  onAddToCart, 
  quantity, 
  onUpdateQuantity 
}) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(
    item.variations?.[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState<(AddOn & { quantity: number })[]>([]);

  const calculatePrice = () => {
    // Use effective price (discounted or regular) as base
    let price = item.effectivePrice || item.basePrice;
    if (selectedVariation) {
      price = (item.effectivePrice || item.basePrice) + selectedVariation.price;
    }
    selectedAddOns.forEach(addOn => {
      price += addOn.price * addOn.quantity;
    });
    return price;
  };

  const handleAddToCart = () => {
    if (item.variations?.length || item.addOns?.length) {
      setShowCustomization(true);
    } else {
      onAddToCart(item, 1);
    }
  };

  const handleCustomizedAddToCart = () => {
    // Convert selectedAddOns back to regular AddOn array for cart
    const addOnsForCart: AddOn[] = selectedAddOns.flatMap(addOn => 
      Array(addOn.quantity).fill({ ...addOn, quantity: undefined })
    );
    onAddToCart(item, 1, selectedVariation, addOnsForCart);
    setShowCustomization(false);
    setSelectedAddOns([]);
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onUpdateQuantity(item.id, quantity - 1);
    }
  };

  const updateAddOnQuantity = (addOn: AddOn, quantity: number) => {
    setSelectedAddOns(prev => {
      const existingIndex = prev.findIndex(a => a.id === addOn.id);
      
      if (quantity === 0) {
        // Remove add-on if quantity is 0
        return prev.filter(a => a.id !== addOn.id);
      }
      
      if (existingIndex >= 0) {
        // Update existing add-on quantity
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity };
        return updated;
      } else {
        // Add new add-on with quantity
        return [...prev, { ...addOn, quantity }];
      }
    });
  };

  const groupedAddOns = item.addOns?.reduce((groups, addOn) => {
    const category = addOn.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(addOn);
    return groups;
  }, {} as Record<string, AddOn[]>);

  return (
    <>
      <div className={`bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group border-2 border-gray-100 hover:border-primary-200 ${!item.available ? 'opacity-60' : ''}`}>
        {/* Image Container with Badges */}
        <div className="relative h-40 sm:h-48 md:h-56 bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`absolute inset-0 flex items-center justify-center ${item.image ? 'hidden' : ''}`}>
            <div className="text-6xl opacity-30 text-primary-300">🍽️</div>
          </div>
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1 md:gap-2">
            {item.isOnDiscount && item.discountPrice && (
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-4 md:py-2 rounded-full shadow-lg animate-pulse flex items-center space-x-1">
                <Sparkles className="h-2 w-2 md:h-3 md:w-3" />
                <span>SALE</span>
              </div>
            )}
            {item.popular && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-4 md:py-2 rounded-full shadow-lg flex items-center space-x-1">
                <span className="text-xs md:text-sm">⭐</span>
                <span>POPULAR</span>
              </div>
            )}
          </div>
          
          {!item.available && (
            <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-gray-800 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-4 md:py-2 rounded-full shadow-lg">
              UNAVAILABLE
            </div>
          )}
          
          {/* Discount Percentage Badge */}
          {item.isOnDiscount && item.discountPrice && (
            <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-white text-primary-600 text-xs md:text-sm font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg border-2 border-primary-200">
              {Math.round(((item.basePrice - item.discountPrice) / item.basePrice) * 100)}% OFF
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6">
          <div className="flex items-start justify-between mb-2 md:mb-3">
            <h4 className="text-sm sm:text-base md:text-xl font-heading text-primary-900 leading-tight flex-1 pr-1 md:pr-2 tracking-wide">
              {item.name.toUpperCase()}
            </h4>
            {item.variations && item.variations.length > 0 && (
              <div className="text-[10px] md:text-xs font-body text-primary-600 bg-primary-50 px-2 py-0.5 md:px-3 md:py-1 rounded-full whitespace-nowrap border border-primary-200">
                {item.variations.length} sizes
              </div>
            )}
          </div>
          
          <p className={`text-xs sm:text-sm font-body mb-3 md:mb-4 leading-relaxed line-clamp-2 md:line-clamp-none ${!item.available ? 'text-gray-400' : 'text-gray-600'}`}>
            {!item.available ? 'Currently Unavailable' : item.description}
          </p>
          
          {/* Pricing Section */}
          <div className="flex items-center justify-between mb-3 md:mb-5">
            <div className="flex-1">
              {item.isOnDiscount && item.discountPrice ? (
                <div className="space-y-0.5 md:space-y-1">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <span className="text-lg sm:text-xl md:text-3xl font-heading text-primary-600">
                      ₱{item.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-[10px] sm:text-xs md:text-sm font-body text-gray-400 line-through">
                      ₱{item.basePrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-[10px] md:text-xs font-body text-green-600 font-semibold">
                    Save ₱{(item.basePrice - item.discountPrice).toFixed(2)}
                  </div>
                </div>
              ) : (
                <div className="text-lg sm:text-xl md:text-3xl font-heading text-primary-600">
                  ₱{item.basePrice.toFixed(2)}
                </div>
              )}
              
              {item.variations && item.variations.length > 0 && (
                <div className="text-[10px] md:text-xs font-body text-gray-500 mt-0.5 md:mt-1">
                  Starting price
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex-shrink-0">
              {!item.available ? (
                <button
                  disabled
                  className="bg-gray-200 text-gray-500 px-3 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl cursor-not-allowed font-body font-medium text-xs md:text-sm"
                >
                  Unavailable
                </button>
              ) : quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="bg-gradient-primary text-white px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-body font-semibold text-xs md:text-sm shadow-md hover:shadow-primary-300/50 whitespace-nowrap"
                >
                  {item.variations?.length || item.addOns?.length ? (
                    <>
                      <span className="hidden sm:inline">Customize</span>
                      <span className="sm:hidden">+</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Add to Cart</span>
                      <span className="sm:hidden">Add</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="flex items-center space-x-1 md:space-x-2 bg-gradient-primary-soft rounded-lg md:rounded-xl p-1 md:p-1.5 border-2 border-primary-300 shadow-sm">
                  <button
                    onClick={handleDecrement}
                    className="p-1 md:p-2 hover:bg-primary-200 rounded-md md:rounded-lg transition-colors duration-200 hover:scale-110"
                  >
                    <Minus className="h-3 w-3 md:h-4 md:w-4 text-primary-700" />
                  </button>
                  <span className="font-bold font-body text-primary-900 min-w-[24px] md:min-w-[32px] text-center text-sm md:text-base">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="p-1 md:p-2 hover:bg-primary-200 rounded-md md:rounded-lg transition-colors duration-200 hover:scale-110"
                  >
                    <Plus className="h-3 w-3 md:h-4 md:w-4 text-primary-700" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Add-ons indicator */}
          {item.addOns && item.addOns.length > 0 && (
            <div className="flex items-center space-x-1 md:space-x-2 text-[10px] md:text-xs font-body text-primary-600 bg-primary-50 px-2 py-1.5 md:px-3 md:py-2 rounded-lg border border-primary-100">
              <Sparkles className="h-2.5 w-2.5 md:h-3 md:w-3" />
              <span className="font-medium">{item.addOns.length} add-on{item.addOns.length > 1 ? 's' : ''} available</span>
            </div>
          )}
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            <div className="sticky top-0 bg-gradient-primary border-b border-primary-700 p-6 flex items-center justify-between rounded-t-3xl z-10">
              <div>
                <h3 className="text-xl font-heading text-white tracking-wide">CUSTOMIZE</h3>
                <p className="text-sm font-body text-white/80 mt-1">{item.name}</p>
              </div>
              <button
                onClick={() => setShowCustomization(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="p-6">
              {/* Size Variations */}
              {item.variations && item.variations.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-heading text-primary-900 mb-4 text-lg tracking-wide">CHOOSE SIZE</h4>
                  <div className="space-y-3">
                    {item.variations.map((variation) => (
                      <label
                        key={variation.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          selectedVariation?.id === variation.id
                            ? 'border-primary-600 bg-primary-50 shadow-md'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="variation"
                            checked={selectedVariation?.id === variation.id}
                            onChange={() => setSelectedVariation(variation)}
                            className="text-primary-600 focus:ring-primary-500"
                          />
                          <span className="font-body font-semibold text-gray-900">{variation.name}</span>
                        </div>
                        <span className="text-primary-600 font-heading font-bold">
                          ₱{((item.effectivePrice || item.basePrice) + variation.price).toFixed(2)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {groupedAddOns && Object.keys(groupedAddOns).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-heading text-primary-900 mb-4 text-lg tracking-wide">ADD-ONS</h4>
                  {Object.entries(groupedAddOns).map(([category, addOns]) => (
                    <div key={category} className="mb-4">
                      <h5 className="text-sm font-body font-semibold text-primary-700 mb-3 capitalize">
                        {category.replace('-', ' ')}
                      </h5>
                      <div className="space-y-3">
                        {addOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-300"
                          >
                            <div className="flex-1">
                              <span className="font-body font-semibold text-gray-900">{addOn.name}</span>
                              <div className="text-sm font-body text-gray-600">
                                {addOn.price > 0 ? `₱${addOn.price.toFixed(2)} each` : 'Free'}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {selectedAddOns.find(a => a.id === addOn.id) ? (
                                <div className="flex items-center space-x-2 bg-primary-100 rounded-xl p-1 border-2 border-primary-300">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 1) - 1);
                                    }}
                                    className="p-1.5 hover:bg-primary-200 rounded-lg transition-colors duration-200"
                                  >
                                    <Minus className="h-3 w-3 text-primary-700" />
                                  </button>
                                  <span className="font-bold font-body text-primary-900 min-w-[24px] text-center text-sm">
                                    {selectedAddOns.find(a => a.id === addOn.id)?.quantity || 0}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 0) + 1);
                                    }}
                                    className="p-1.5 hover:bg-primary-200 rounded-lg transition-colors duration-200"
                                  >
                                    <Plus className="h-3 w-3 text-primary-700" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => updateAddOnQuantity(addOn, 1)}
                                  className="flex items-center space-x-1 px-4 py-2 bg-gradient-primary text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm font-body font-semibold shadow-md"
                                >
                                  <Plus className="h-3 w-3" />
                                  <span>Add</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Summary */}
              <div className="border-t-2 border-primary-200 pt-4 mb-6">
                <div className="flex items-center justify-between text-2xl font-heading text-primary-900">
                  <span>TOTAL:</span>
                  <span className="text-primary-600">₱{calculatePrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCustomizedAddToCart}
                className="w-full bg-gradient-primary text-white py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-heading font-semibold flex items-center justify-center space-x-2 shadow-lg hover:scale-105 text-lg"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>ADD TO CART - ₱{calculatePrice().toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;
