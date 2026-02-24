import AdminLayout from "../layout";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(setProducts);
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
          + Add Product
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p._id} className="border-b">
              <td className="p-4">{p.name}</td>
              <td className="p-4">${p.price}</td>
              <td className="p-4 flex gap-4">
                <Link href={`/admin/products/edit/${p._id}`} className="text-blue-600">Edit</Link>
                <button onClick={() => deleteProduct(p._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );

  function deleteProduct(id) {
    if (!confirm("Delete product?")) return;

    fetch(`/api/products?id=${id}`, { method: "DELETE" })
      .then(() => setProducts(products.filter(p => p._id !== id)));
  }
}