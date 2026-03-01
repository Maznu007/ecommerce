import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
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

//
// ⭐ LOGIN FORM
//
function LoginForm({ switchMode }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password
    });

    if (!res.error) {
      router.push("/account");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-slate-900">
        Welcome Back
      </h1>

      <form onSubmit={handleLogin}>
        <label className="block mb-1 text-slate-700">Email</label>
        <input
          type="email"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-1 text-slate-700">Password</label>
        <input
          type="password"
          className="w-full border p-3 rounded-xl mb-6"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-4 text-slate-500">
        Don’t have an account?{" "}
        <button className="text-indigo-600 font-medium" onClick={switchMode}>
          Create one
        </button>
      </p>
    </div>
  );
}

//
// ⭐ SIGNUP FORM
//
function SignupForm({ switchMode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const createAccount = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error || "Signup failed");
      return;
    }

    alert("Account created! Please log in.");
    switchMode();
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-slate-900">
        Create Account
      </h1>

      <form onSubmit={createAccount}>
        <label className="block mb-1 text-slate-700">Full Name</label>
        <input
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block mb-1 text-slate-700">Email</label>
        <input
          type="email"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-1 text-slate-700">Password</label>
        <input
          type="password"
          className="w-full border p-3 rounded-xl mb-6"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      <p className="text-center mt-4 text-slate-500">
        Already have an account?{" "}
        <button className="text-indigo-600 font-medium" onClick={switchMode}>
          Login
        </button>
      </p>
    </div>
  );
}

//
// ⭐ DASHBOARD (INCLUDES ORDERS • WISHLIST • ADDRESSES)
//
function Dashboard({ user, onLogout, wishlistCount = 0 }) {
  const profileImage = user?.image || "/default-avatar.png";

  const menuCards = [
    {
      label: "My Orders",
      icon: ShoppingBag,
      color: "bg-blue-500",
      href: "/account/orders",
      count: 0,
    },
    {
      label: "Wishlist",
      icon: Heart,
      color: "bg-rose-500",
      href: "/wishlist",
      count: wishlistCount,
    },
    {
      label: "Addresses",
      icon: MapPin,
      color: "bg-emerald-500",
      href: "/account/addresses",
      count: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-4">
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
              className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {menuCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link key={idx} href={card.href}>
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl text-center cursor-pointer transition">
                  <div
                    className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{card.count}</p>
                  <p className="text-sm text-slate-600">{card.label}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Settings List */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold text-slate-900">Account Settings</h2>
          </div>

          <div className="divide-y">
            <Link
              href="/account/edit"
              className="flex items-center justify-between p-4 hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <User size={20} className="text-slate-400" />
                <span className="text-slate-700 font-medium">Edit Profile</span>
              </div>
              <ArrowRight size={20} className="text-slate-400" />
            </Link>

            <Link
              href="/account/password"
              className="flex items-center justify-between p-4 hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-slate-400" />
                <span className="text-slate-700 font-medium">Change Password</span>
              </div>
              <ArrowRight size={20} className="text-slate-400" />
            </Link>

            <Link
              href="/account/privacy"
              className="flex items-center justify-between p-4 hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-slate-400" />
                <span className="text-slate-700 font-medium">Privacy Settings</span>
              </div>
              <ArrowRight size={20} className="text-slate-400" />
            </Link>

            <Link
              href="/help"
              className="flex items-center justify-between p-4 hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-slate-400" />
                <span className="text-slate-700 font-medium">Help & Support</span>
              </div>
              <ArrowRight size={20} className="text-slate-400" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

//
// ⭐ MAIN ACCOUNT PAGE
//
export default function AccountPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mode, setMode] = useState("login");
  const [wishlistCount, setWishlistCount] = useState(0);

  const switchMode = () => setMode(mode === "login" ? "signup" : "login");

  useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => res.json())
      .then((data) => setWishlistCount(data?.wishlist?.length || 0));
  }, []);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  // Logged OUT → show login/signup UI
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        {mode === "login" ? (
          <LoginForm switchMode={switchMode} />
        ) : (
          <SignupForm switchMode={switchMode} />
        )}
      </div>
    );
  }

// ⭐ ADMIN REDIRECT
if (session?.user?.email === "admin@yourdomain.com") {
  router.push("/admin");
  return null;
}

// ⭐ NORMAL USER DASHBOARD
return (
  <Dashboard
    user={session.user}
    wishlistCount={wishlistCount}
    onLogout={() => signOut({ callbackUrl: "/account" })}
  />
);
}