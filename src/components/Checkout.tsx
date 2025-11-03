import React, { useState } from 'react';
import { ArrowLeft, Clock, Users, Sparkles } from 'lucide-react';
import { CartItem, ServiceType } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPrice, onBack }) => {
  const [customerName, setCustomerName] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('dine-in');
  // Dine-in specific state
  const [partySize, setPartySize] = useState(1);
  const [notes, setNotes] = useState('');

  const handlePlaceOrder = () => {
    const dineInInfo = serviceType === 'dine-in' 
      ? `👥 Party Size: ${partySize} person${partySize !== 1 ? 's' : ''}`
      : '';
    
    const orderDetails = `
🛒 District 8 ORDER

👤 Customer: ${customerName}
📍 Service: ${serviceType === 'dine-in' ? 'Dine In' : 'Take Out'}
${serviceType === 'dine-in' ? dineInInfo : ''}


📋 ORDER DETAILS:
${cartItems.map(item => {
  let itemDetails = `• ${item.name}`;
  if (item.selectedVariation) {
    itemDetails += ` (${item.selectedVariation.name})`;
  }
  if (item.selectedAddOns && item.selectedAddOns.length > 0) {
    itemDetails += ` + ${item.selectedAddOns.map(addOn => 
      addOn.quantity && addOn.quantity > 1 
        ? `${addOn.name} x${addOn.quantity}`
        : addOn.name
    ).join(', ')}`;
  }
  itemDetails += ` x${item.quantity} - ₱${item.totalPrice * item.quantity}`;
  return itemDetails;
}).join('\n')}

💰 TOTAL: ₱${totalPrice}

${notes ? `📝 Notes: ${notes}` : ''}

Please confirm this order to proceed. Thank you for choosing District 8!
    `.trim();

    const encodedMessage = encodeURIComponent(orderDetails);
    const messengerUrl = `https://m.me/district8cafeandrestaurant?text=${encodedMessage}`;
    
    window.open(messengerUrl, '_blank');
    
  };

  const isDetailsValid = customerName && 
    (serviceType !== 'dine-in' || partySize > 0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center mb-8 bg-white rounded-2xl shadow-md p-6 border-2 border-primary-100">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 font-body"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Cart</span>
            </button>
            <h1 className="text-3xl font-heading text-primary-900 ml-8 tracking-wide">CHECKOUT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-primary-100 h-fit">
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="h-6 w-6 text-primary-600" />
                <h2 className="text-2xl font-heading text-primary-900 tracking-wide">ORDER SUMMARY</h2>
              </div>
              
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start justify-between py-4 border-b border-primary-100">
                    <div className="flex-1">
                      <h4 className="font-heading text-primary-900 text-sm">{item.name.toUpperCase()}</h4>
                    {item.selectedVariation && (
                        <p className="text-xs font-body text-gray-600 mt-1">Size: {item.selectedVariation.name}</p>
                    )}
                    {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                        <p className="text-xs font-body text-gray-600 mt-1">
                        Add-ons: {item.selectedAddOns.map(addOn => addOn.name).join(', ')}
                      </p>
                    )}
                      <p className="text-sm font-body text-gray-600 mt-1">₱{item.totalPrice} x {item.quantity}</p>
                    </div>
                    <span className="font-heading text-primary-600 font-semibold">₱{item.totalPrice * item.quantity}</span>
                </div>
              ))}
            </div>
            
              <div className="border-t-2 border-primary-200 pt-4 bg-primary-50 -mx-8 px-8 py-6 -mb-8 rounded-b-2xl">
                <div className="flex items-center justify-between text-3xl font-heading text-primary-900">
                  <span>TOTAL:</span>
                  <span className="text-primary-600">₱{totalPrice}</span>
                </div>
            </div>
          </div>

            {/* Customer Details Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-primary-100">
              <h2 className="text-2xl font-heading text-primary-900 mb-6 tracking-wide">YOUR DETAILS</h2>
            
            <form className="space-y-6">
              {/* Customer Information */}
              <div>
                  <label className="block text-sm font-body font-semibold text-primary-900 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 font-body"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Service Type */}
              <div>
                  <label className="block text-sm font-body font-semibold text-primary-900 mb-3">Service Type *</label>
                  <div className="grid grid-cols-2 gap-3">
                  {[
                      { value: 'dine-in', label: 'Dine In', icon: <Users className="h-5 w-5" /> },
                      { value: 'pickup', label: 'Take Out', icon: <Clock className="h-5 w-5" /> }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setServiceType(option.value as ServiceType)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        serviceType === option.value
                            ? 'border-primary-600 bg-gradient-primary text-white shadow-lg scale-105'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-primary-400'
                      }`}
                    >
                        <div className="flex justify-center mb-2">{option.icon}</div>
                        <div className="text-sm font-body font-semibold">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dine-in Details */}
              {serviceType === 'dine-in' && (
                  <div>
                    <label className="block text-sm font-body font-semibold text-primary-900 mb-2">Party Size *</label>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => setPartySize(Math.max(1, partySize - 1))}
                        className="w-12 h-12 rounded-xl border-2 border-primary-300 flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-all duration-200 font-bold text-lg"
                      >
                        -
                      </button>
                      <span className="text-3xl font-heading text-primary-900 min-w-[4rem] text-center">{partySize}</span>
                      <button
                        type="button"
                        onClick={() => setPartySize(Math.min(20, partySize + 1))}
                        className="w-12 h-12 rounded-xl border-2 border-primary-300 flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-all duration-200 font-bold text-lg"
                      >
                        +
                      </button>
                      <span className="text-sm font-body text-gray-600 ml-2">person{partySize !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
              )}

              {/* Special Notes */}
              <div>
                  <label className="block text-sm font-body font-semibold text-primary-900 mb-2">Special Instructions</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 font-body"
                  placeholder="Any special requests or notes..."
                  rows={3}
                />
              </div>

              <button
                  onClick={handlePlaceOrder}
                disabled={!isDetailsValid}
                  className={`w-full py-4 rounded-xl font-heading font-semibold text-lg transition-all duration-300 transform flex items-center justify-center space-x-2 ${
                  isDetailsValid
                      ? 'bg-gradient-primary text-white hover:shadow-xl hover:scale-105 shadow-lg'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                  <Sparkles className="h-5 w-5" />
                  <span>PLACE ORDER VIA MESSENGER</span>
              </button>
                
                <p className="text-xs font-body text-gray-500 text-center mt-4">
                  You'll be redirected to Facebook Messenger to confirm your order
                </p>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
