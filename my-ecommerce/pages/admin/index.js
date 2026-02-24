import { useSession } from "next-auth/react";
import AdminLayout from "./layout";
import { useState, useEffect } from "react";
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setStats(d));
  }, []);

  if (!stats) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-4 gap-6">
        <Card label="Revenue" value={`$${stats.totalRevenue}`} Icon={DollarSign} color="bg-emerald-500" />
        <Card label="Orders" value={stats.totalOrders} Icon={ShoppingCart} color="bg-blue-500" />
        <Card label="Products" value={stats.totalProducts} Icon={Package} color="bg-indigo-500" />
        <Card label="Users" value={stats.totalUsers} Icon={Users} color="bg-violet-500" />
      </div>
    </AdminLayout>
  );
}

function Card({ label, value, Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="text-white" size={24} />
      </div>
      <p className="text-slate-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}