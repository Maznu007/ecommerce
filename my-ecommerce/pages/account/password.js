import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ChangePassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/account"), 2000);
      } else {
        alert("Current password is incorrect");
      }
    } catch (error) {
      alert("Something went wrong");
    }

    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-emerald-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Password Changed!</h2>
          <p className="text-slate-600">Your password has been updated successfully.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <ArrowLeft size={24} className="text-slate-600" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Change Password</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type={showPassword.old ? "text" : "password"}
                placeholder="Enter current password"
                value={formData.oldPassword}
                onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
                className="w-full pl-12 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword({...showPassword, old: !showPassword.old})}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword.old ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type={showPassword.new ? "text" : "password"}
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                className="w-full pl-12 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type={showPassword.confirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full pl-12 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-6"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}