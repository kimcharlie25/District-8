import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="text-center py-16 bg-white rounded-3xl shadow-lg border-2 border-primary-100">
            <div className="text-8xl mb-6 animate-float">🛒</div>
            <h2 className="text-3xl font-heading text-primary-900 mb-3 tracking-tight">YOUR CART IS EMPTY</h2>
            <p className="text-gray-600 font-body mb-8 px-6">Start adding delicious items to your cart!</p>
            <button
              onClick={onContinueShopping}
              className="bg-gradient-primary text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-body font-semibold shadow-lg"
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-2xl shadow-md p-6 border-2 border-primary-100">
          <button
            onClick={onContinueShopping}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 font-body"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Continue Shopping</span>
          </button>
          <h1 className="text-3xl font-heading text-primary-900 tracking-wide">YOUR CART</h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 transition-colors duration-200 font-body font-medium hover:underline"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-primary-200">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    {/* Item Info */}
                    <div className="flex-1 mr-4">
                      <h3 className="text-xl font-heading text-primary-900 mb-2 tracking-tight">{item.name.toUpperCase()}</h3>
                      
                      {item.selectedVariation && (
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs font-body text-primary-600 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
                            Size: {item.selectedVariation.name}
                          </span>
                        </div>
                      )}
                      
                      {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-body text-gray-600 mb-1">Add-ons:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.selectedAddOns.map((addOn, idx) => (
                              <span key={idx} className="text-xs font-body text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
                                {addOn.quantity && addOn.quantity > 1 
                                  ? `${addOn.name} x${addOn.quantity}`
                                  : addOn.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <p className="text-lg font-body font-semibold text-gray-700">₱{item.totalPrice.toFixed(2)} each</p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end space-y-4">
                      <div className="flex items-center space-x-3 bg-gradient-primary-soft rounded-xl p-2 border-2 border-primary-300 shadow-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-primary-200 rounded-lg transition-colors duration-200 hover:scale-110"
                        >
                          <Minus className="h-4 w-4 text-primary-700" />
                        </button>
                        <span className="font-bold font-body text-primary-900 min-w-[40px] text-center text-lg">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-primary-200 rounded-lg transition-colors duration-200 hover:scale-110"
                        >
                          <Plus className="h-4 w-4 text-primary-700" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-heading text-primary-600">₱{(item.totalPrice * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary-200 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <ShoppingBag className="h-6 w-6 text-primary-600" />
                <h2 className="text-xl font-heading text-primary-900 tracking-wide">ORDER SUMMARY</h2>
              </div>
              
              <div className="space-y-4 mb-6 pb-6 border-b-2 border-primary-100">
                <div className="flex items-center justify-between font-body text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₱{parseFloat(getTotalPrice() || 0).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between font-body text-gray-700">
                  <span>Items:</span>
                  <span className="font-semibold">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-2xl font-heading text-primary-900 mb-6 bg-primary-50 p-4 rounded-xl border-2 border-primary-200">
                <span>TOTAL:</span>
                <span className="text-primary-600">₱{parseFloat(getTotalPrice() || 0).toFixed(2)}</span>
              </div>
              
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-primary text-white py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-heading font-semibold text-lg shadow-lg flex items-center justify-center space-x-2"
              >
                <Sparkles className="h-5 w-5" />
                <span>PROCEED TO CHECKOUT</span>
              </button>
              
              <p className="text-xs font-body text-gray-500 text-center mt-4">
                Taxes and fees calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
