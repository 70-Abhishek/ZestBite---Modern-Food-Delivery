import React, { useState } from 'react';
import { 
  X, 
  User, 
  MapPin, 
  CreditCard, 
  Bell, 
  DollarSign, 
  Plus, 
  Trash2, 
  Check, 
  ShieldCheck,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { useFoodDelivery } from '../context/FoodDeliveryContext';
import { CurrencyCode } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { 
    userProfile, 
    updateUserProfile, 
    currency, 
    setCurrency, 
    addNotification,
    deliveryLocation,
    setDeliveryLocation
  } = useFoodDelivery();

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [dietary, setDietary] = useState<string[]>(userProfile.dietaryPreferences || []);
  const [savedAddresses, setSavedAddresses] = useState(userProfile.savedAddresses || []);
  const [newAddressLabel, setNewAddressLabel] = useState('');
  const [newAddressText, setNewAddressText] = useState('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  if (!isOpen) return null;

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Keto', 'Dairy-Free', 'Nut-Free'];

  const toggleDiet = (diet: string) => {
    setDietary(prev => 
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      dietaryPreferences: dietary,
      savedAddresses
    });
    addNotification('Profile Saved ✅', 'Your settings and delivery preferences are updated.', 'info');
    onClose();
  };

  const handleAddAddress = () => {
    if (!newAddressLabel.trim() || !newAddressText.trim()) return;
    const newAddr = {
      id: `addr-${Date.now()}`,
      label: newAddressLabel.trim(),
      address: newAddressText.trim(),
      isDefault: savedAddresses.length === 0
    };
    setSavedAddresses([...savedAddresses, newAddr]);
    setNewAddressLabel('');
    setNewAddressText('');
    setIsAddingAddress(false);
  };

  const currencies: { code: CurrencyCode; label: string; symbol: string }[] = [
    { code: 'USD', label: 'US Dollar', symbol: '$' },
    { code: 'EUR', label: 'Euro', symbol: '€' },
    { code: 'GBP', label: 'British Pound', symbol: '£' },
    { code: 'JPY', label: 'Japanese Yen', symbol: '¥' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <img
              src={userProfile.avatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-500/30"
            />
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Account Preferences</h2>
              <p className="text-xs text-slate-500">Manage identity, locations & currency</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSave} className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          
          {/* Personal Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Currency Preference */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Display Currency
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {currencies.map(c => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCurrency(c.code)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                    currency === c.code 
                      ? 'border-orange-500 bg-orange-50/50 text-orange-700 ring-2 ring-orange-500/20' 
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="block text-sm font-black">{c.symbol}</span>
                  <span className="text-[10px] text-slate-500">{c.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Saved Addresses */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Saved Delivery Addresses
              </h3>
              <button
                type="button"
                onClick={() => setIsAddingAddress(true)}
                className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            <div className="space-y-2">
              {(savedAddresses || []).map(addr => (
                <div 
                  key={addr.id}
                  onClick={() => setDeliveryLocation(addr.address)}
                  className={`p-3 rounded-2xl border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                    deliveryLocation === addr.address 
                      ? 'border-orange-500 bg-orange-50/30' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className={`w-4 h-4 ${deliveryLocation === addr.address ? 'text-orange-600' : 'text-slate-400'}`} />
                    <div>
                      <p className="font-bold text-slate-900">{addr.label}</p>
                      <p className="text-[11px] text-slate-500">{addr.address}</p>
                    </div>
                  </div>
                  {deliveryLocation === addr.address && (
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
              ))}
            </div>

            {isAddingAddress && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <input
                  type="text"
                  value={newAddressLabel}
                  onChange={(e) => setNewAddressLabel(e.target.value)}
                  placeholder="Label e.g. Office, Gym, Mom's House"
                  className="w-full text-xs p-2 bg-white border border-slate-200 rounded-xl"
                />
                <input
                  type="text"
                  value={newAddressText}
                  onChange={(e) => setNewAddressText(e.target.value)}
                  placeholder="Full street address..."
                  className="w-full text-xs p-2 bg-white border border-slate-200 rounded-xl"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingAddress(false)}
                    className="px-3 py-1 text-xs text-slate-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddAddress}
                    className="px-3 py-1 bg-orange-600 text-white rounded-lg text-xs font-bold"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dietary filters */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Dietary Preferences
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {dietaryOptions.map(opt => {
                const isSelected = dietary.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleDiet(opt)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      isSelected 
                        ? 'bg-emerald-600 text-white shadow-xs' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isSelected ? `✓ ${opt}` : `+ ${opt}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white font-extrabold text-xs transition-colors shadow-md"
            >
              Save Account Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
