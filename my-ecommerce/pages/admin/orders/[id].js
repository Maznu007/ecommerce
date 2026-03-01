import AdminLayout from "../layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ViewOrder() {
  const router = useRouter();
  const { id } = router.query;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/orders?id=${id}`)
      .then((r) => r.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading order...</p>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout>
        <p className="text-red-600 font-bold">Order not found!</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3">Order #{order._id}</h2>

        <div className="mb-6">
          <h3 className="font-bold text-slate-700 mb-2">Customer</h3>
          <p>
            {order.shippingAddress?.street},{" "}
            {order.shippingAddress?.city},{" "}
            {order.shippingAddress?.postalCode},{" "}
            {order.shippingAddress?.country}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-slate-700 mb-2">Products</h3>
          <div className="space-y-2">
            {order.products.map((p, index) => (
              <div
                key={index}
                className="p-3 border rounded-lg bg-slate-50 flex justify-between"
              >
                <span>
                  {p.name} (Qty: {p.quantity})
                </span>
                <span>${p.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-slate-700 mb-2">Total Amount</h3>
          <p className="text-lg font-bold">${order.totalAmount}</p>
        </div>

        <div>
          <h3 className="font-bold text-slate-700 mb-2">Order Status</h3>
          <p className="capitalize">{order.status}</p>
        </div>
      </div>
    </AdminLayout>
  );
}