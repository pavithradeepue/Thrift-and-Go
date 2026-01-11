import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, MapPin, User, Phone, Mail, ShieldCheck, CheckCircle } from 'lucide-react';
import { auth } from '../firebase';

const CheckoutPage = ({ selectedItem, onBack }) => {
    const [formData, setFormData] = useState({
        fullName: auth.currentUser?.displayName || '',
        email: auth.currentUser?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        paymentMethod: 'card'
    });

    const [orderPlaced, setOrderPlaced] = useState(false);
    const accentColor = "#B19CD9"; // Lavender

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        // Here you would typically process the payment and create an order
        setOrderPlaced(true);
    };

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                        <CheckCircle size={48} style={{ color: accentColor }} />
                    </div>
                    <h2 className="text-3xl font-bold font-serif text-gray-900 mb-3">Order Placed!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for your purchase. Your order has been confirmed and will be delivered soon.
                    </p>
                    <button
                        onClick={onBack}
                        className="w-full py-3 text-white font-bold rounded-full shadow-lg hover:scale-[1.02] transition-all"
                        style={{ backgroundColor: accentColor }}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCF8] animate-fade-in">

            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="font-bold text-xl text-gray-900">Checkout</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Left: Checkout Form */}
                    <div className="md:col-span-2 space-y-6">

                        {/* User Information */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                                    <User size={20} style={{ color: accentColor }} />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900">Contact Information</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:border-black focus:bg-white outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:border-black focus:bg-white outline-none transition-all"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:border-black focus:bg-white outline-none transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                                    <MapPin size={20} style={{ color: accentColor }} />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900">Shipping Address</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Street Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:border-black focus:bg-white outline-none transition-all"
                                        placeholder="123 Main Street, Apartment 4B"
                                    />
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:border-black focus:bg-white outline-none transition-all"
                                            placeholder="Mumbai"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:border-black focus:bg-white outline-none transition-all"
                                            placeholder="Maharashtra"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:border-black focus:bg-white outline-none transition-all"
                                            placeholder="400001"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                                    <CreditCard size={20} style={{ color: accentColor }} />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900">Payment Method</h3>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
                                    style={{ borderColor: formData.paymentMethod === 'card' ? accentColor : '#E5E7EB' }}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={formData.paymentMethod === 'card'}
                                        onChange={handleInputChange}
                                        className="w-5 h-5"
                                        style={{ accentColor: accentColor }}
                                    />
                                    <CreditCard size={20} className="text-gray-600" />
                                    <span className="font-medium text-gray-900">Credit/Debit Card</span>
                                </label>

                                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
                                    style={{ borderColor: formData.paymentMethod === 'upi' ? accentColor : '#E5E7EB' }}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="upi"
                                        checked={formData.paymentMethod === 'upi'}
                                        onChange={handleInputChange}
                                        className="w-5 h-5"
                                        style={{ accentColor: accentColor }}
                                    />
                                    <Phone size={20} className="text-gray-600" />
                                    <span className="font-medium text-gray-900">UPI</span>
                                </label>

                                <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50"
                                    style={{ borderColor: formData.paymentMethod === 'cod' ? accentColor : '#E5E7EB' }}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={handleInputChange}
                                        className="w-5 h-5"
                                        style={{ accentColor: accentColor }}
                                    />
                                    <Truck size={20} className="text-gray-600" />
                                    <span className="font-medium text-gray-900">Cash on Delivery</span>
                                </label>
                            </div>
                        </div>

                    </div>

                    {/* Right: Order Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
                            <h3 className="font-bold text-lg text-gray-900 mb-6">Order Summary</h3>

                            {/* Product */}
                            {selectedItem && (
                                <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center">
                                        <img src={selectedItem.image} alt={selectedItem.name} className="max-h-full max-w-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 text-sm mb-1">{selectedItem.name}</h4>
                                        <p className="text-xs text-gray-500">Size: M</p>
                                        <p className="font-bold text-sm mt-1" style={{ color: accentColor }}>₹{selectedItem.price}</p>
                                    </div>
                                </div>
                            )}

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium text-gray-900">₹{selectedItem?.price || '1,999'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-medium text-gray-900">₹180</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-lg text-gray-900">Total</span>
                                <span className="font-bold text-2xl text-gray-900">₹{(parseInt(selectedItem?.price || 1999) + 180).toLocaleString()}</span>
                            </div>

                            {/* Place Order Button */}
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full py-4 text-white font-bold text-lg rounded-full shadow-lg hover:scale-[1.02] transition-all"
                                style={{ backgroundColor: accentColor }}
                            >
                                Place Order
                            </button>

                            {/* Security Badge */}
                            <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-xs">
                                <ShieldCheck size={16} className="text-green-600" />
                                <span>Secure Checkout</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
