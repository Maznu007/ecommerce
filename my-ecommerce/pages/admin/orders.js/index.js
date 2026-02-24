import AdminLayout from "../layout";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders);
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <table className="w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="border-b">
            <th className="p-4">Order ID</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Total</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-b">
              <td className="p-4">{o._id}</td>

              {/* FIX: CUSTOMER NAME */}
              <td className="p-4">
                {o.shippingAddress?.street 
                  ? `${o.shippingAddress.street}, ${o.shippingAddress.city}`
                  : "Unknown"}
              </td>

              <td className="p-4">${o.totalAmount}</td>
              <td className="p-4 capitalize">{o.status}</td>

              <td className="p-4">
                <Link href={`/admin/orders/${o._id}`} className="text-blue-600">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}