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

// ⭐ LOGIN FORM ─────────────────────────────
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

// ⭐ SIGNUP FORM ─────────────────────────────
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

// ⭐ DASHBOARD (AFTER LOGIN) ─────────────────────────────
function Dashboard({ user, onLogout }) {
  const profileImage = user?.image || "/default-avatar.png";

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-6"
        >
          <div className="flex items-center gap-4">
            <img
              src={profileImage}
              className="w-20 h-20 rounded-full object-cover border"
            />

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
              <p className="text-slate-600">{user.email}</p>
            </div>

            <button
              onClick={onLogout}
              className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl"
            >
              <LogOut size={24} />
            </button>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold">Account Settings</h2>
          </div>

          <div className="divide-y divide-slate-100">
            <Link href="/account/edit" className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <User size={20} className="text-slate-400" />
                <span>Edit Profile</span>
              </div>
              <ArrowRight size={18} />
            </Link>

            <Link href="/account/password" className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-slate-400" />
                <span>Change Password</span>
              </div>
              <ArrowRight size={18} />
            </Link>

            <Link href="/account/privacy" className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-slate-400" />
                <span>Privacy Settings</span>
              </div>
              <ArrowRight size={18} />
            </Link>

            <Link href="/help" className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-slate-400" />
                <span>Help & Support</span>
              </div>
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ⭐ MAIN ACCOUNT PAGE ─────────────────────────────
export default function AccountPage() {
  const { data: session, status } = useSession();
  const [mode, setMode] = useState("login");
  const router = useRouter();

  const switchMode = () => setMode(mode === "login" ? "signup" : "login");

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  // ⭐ ADMIN -> REDIRECT TO ADMIN PANEL
  if (session?.user?.email === "admin@yourdomain.com") {
    router.push("/admin");
    return null;
  }

  // Logged OUT → show login/signup
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

  // Logged IN → show dashboard
  return (
    <Dashboard
      user={session.user}
      onLogout={() => signOut({ callbackUrl: "/account" })}
    />
  );
}