import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Eye, Trash2, Download, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PrivacySettings() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const privacyOptions = [
    { icon: Eye, label: "Profile Visibility", value: "Public", href: "#" },
    { icon: Download, label: "Download My Data", value: "Request", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <ArrowLeft size={24} className="text-slate-600" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Privacy</h1>
        </div>

        {/* Privacy Options */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
          {privacyOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={option.label}
                className={`w-full p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left ${index !== privacyOptions.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Icon className="text-slate-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{option.label}</h3>
                </div>
                <span className="text-indigo-600 font-medium text-sm">{option.value}</span>
                <ChevronRight className="text-slate-400" size={20} />
              </button>
            );
          })}
        </div>

        {/* Danger Zone */}
        <div className="bg-rose-50 rounded-3xl p-6 border-2 border-rose-200">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-rose-600" size={24} />
            <h2 className="text-lg font-bold text-rose-900">Danger Zone</h2>
          </div>
          <p className="text-rose-700 text-sm mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Trash2 size={20} />
            Delete Account
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full"
            >
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-rose-600" size={32} />
              </div>
              <h2 className="text-xl font-bold text-center text-slate-900 mb-2">Delete Account?</h2>
              <p className="text-slate-600 text-center mb-6">
                This will permanently delete your account and all your data.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Add delete API call here
                    alert("Account deleted");
                  }}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Yes, Delete My Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}