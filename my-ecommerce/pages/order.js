import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  ChevronRight,
  MapPin
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/account");
      return;
    }
    
    if (session) {
      fetchOrders();
    }
  }, [session, status]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
    setLoading(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="text-emerald-500" size={20} />;
      case 'shipped': return <Truck className="text-blue-500" size={20} />;
      case 'processing': return <Package className="text-indigo-500" size={20} />;
      case 'cancelled': return <XCircle className="text-rose-500" size={20} />;
      default: return <Clock className="text-amber-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-100 text-emerald-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-indigo-100 text-indigo-700';
      case 'cancelled': return 'bg-rose-100 text-rose-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <ArrowLeft size={24} className="text-slate-600" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-slate-400" size={40} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No orders yet</h2>
            <p className="text-slate-600 mb-6">Start shopping to see your orders here</p>
            <Link href="/" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  {order.products.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 mb-4 last:mb-0">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.picture} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900">{item.name}</h3>
                        <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-slate-900">${item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="p-6 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={16} />
                    {order.shippingAddress?.city || 'No address'}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Total</p>
                    <p className="text-xl font-bold text-slate-900">${order.totalAmount}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}