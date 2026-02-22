import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await fetch("/api/admin/stats");
    const data = await res.json();
    setStats(data);
  };

  const statCards = [
    { label: "Total Revenue", value: `$${stats.totalRevenue}`, icon: DollarSign, color: "bg-emerald-500" },
    { label: "Orders", value: stats.totalOrders, icon: ShoppingCart, color: "bg-blue-500" },
    { label: "Products", value: stats.totalProducts, icon: Package, color: "bg-indigo-500" },
    { label: "Users", value: stats.totalUsers, icon: Users, color: "bg-violet-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white p-6">
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="text-indigo-400" size={28} />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <nav className="space-y-2">
          {[
            { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
            { label: "Products", href: "/admin/products", icon: Package },
            { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
            { label: "Users", href: "/admin/users", icon: Users },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
          <p className="text-slate-500">Welcome back, {session?.user?.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <p className="text-slate-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
            <Link href="/admin/orders" className="text-indigo-600 flex items-center gap-1 hover:underline">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          {/* Add recent orders table here */}
        </div>
      </main>
    </div>
  );
}