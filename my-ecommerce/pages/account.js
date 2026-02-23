import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  HelpCircle, 
  ArrowRight,
  Loader2,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut
} from "lucide-react";
import Link from "next/link";

// Dashboard Component
function Dashboard({ user, onLogout, wishlistCount }) {
  const profileImage = user?.image || "/default-avatar.png";

  const menuItems = [
    { icon: ShoppingBag, label: "My Orders", count: 0, color: "bg-blue-500", href: "/account/orders" },
    { icon: Heart, label: "Wishlist", count: wishlistCount, color: "bg-rose-500", href: "/wishlist" },
    { icon: MapPin, label: "Addresses", count: 0, color: "bg-emerald-500", href: "/account/addresses" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-6"
        >
          <div className="flex items-center gap-4">

            {/* FIXED: Show real user image */}
            <img
              src={profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border shadow"
            />

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
              <p className="text-slate-600">{user.email}</p>
            </div>

            <button
              onClick={onLogout}
              className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
            >
              <LogOut size={24} />
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link href={item.href} key={item.label}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center cursor-pointer hover:shadow-xl transition-shadow"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{item.count}</p>
                  <p className="text-sm text-slate-600">{item.label}</p>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Account Settings</h2>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              { label: "Edit Profile", href: "/account/edit", icon: User },
              { label: "Change Password", href: "/account/password", icon: Lock },
              { label: "Notification Preferences", href: "/account/notifications", icon: Bell },
              { label: "Privacy Settings", href: "/account/privacy", icon: Shield },
              { label: "Help & Support", href: "/help", icon: HelpCircle },
            ].map((setting) => {
              const Icon = setting.icon;
              return (
                <Link
                  key={setting.label}
                  href={setting.href}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-slate-400" />
                    <span className="text-slate-700 font-medium">{setting.label}</span>
                  </div>
                  <ArrowRight size={20} className="text-slate-400" />
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [wishlistCount, setWishlistCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then((data) => setWishlistCount(data?.wishlist?.length || 0));
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!session) {
    router.push("/account/login");
    return null;
  }

  return (
    <Dashboard 
      user={session.user} 
      wishlistCount={wishlistCount} 
      onLogout={() => signOut()} 
    />
  );
}