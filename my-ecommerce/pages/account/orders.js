import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/order")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="p-2 bg-white rounded-xl shadow-sm">
            <ArrowLeft size={24} className="text-slate-600" />
          </Link>

          <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <p className="text-slate-600 text-center">You have no orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-xl shadow-md p-4">
                <p className="font-semibold">Order ID: {order._id}</p>
                <p>Total: ${order.totalAmount || 0}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}