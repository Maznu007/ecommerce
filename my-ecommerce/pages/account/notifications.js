import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Mail, ShoppingBag, Tag, Check } from "lucide-react";
import Link from "next/link";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: false,
    newArrivals: true,
    newsletter: false,
  });

  const [saved, setSaved] = useState(false);

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
    setSaved(false);
  };

  const handleSave = () => {
    // Save to API here
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const notificationOptions = [
    { key: "orderUpdates", label: "Order Updates", description: "Get notified about your order status", icon: ShoppingBag },
    { key: "promotions", label: "Promotions & Deals", description: "Receive exclusive offers and discounts", icon: Tag },
    { key: "newArrivals", label: "New Arrivals", description: "Be the first to know about new products", icon: Bell },
    { key: "newsletter", label: "Newsletter", description: "Weekly digest of trends and tips", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <ArrowLeft size={24} className="text-slate-600" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        </div>

        {/* Settings List */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {notificationOptions.map((option, index) => {
            const Icon = option.icon;
            const isEnabled = settings[option.key];

            return (
              <div
                key={option.key}
                className={`p-6 flex items-center gap-4 ${index !== notificationOptions.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isEnabled ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                  <Icon className={isEnabled ? 'text-indigo-600' : 'text-slate-400'} size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{option.label}</h3>
                  <p className="text-sm text-slate-500">{option.description}</p>
                </div>
                <button
                  onClick={() => toggleSetting(option.key)}
                  className={`w-14 h-8 rounded-full transition-colors relative ${isEnabled ? 'bg-indigo-600' : 'bg-slate-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${isEnabled ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <Check size={20} />
              Saved!
            </>
          ) : (
            "Save Preferences"
          )}
        </button>
      </div>
    </div>
  );
}