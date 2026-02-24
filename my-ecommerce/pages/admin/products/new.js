import AdminLayout from "../layout";
import { useState } from "react";
import { useRouter } from "next/router";

export default function NewProduct() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", price: 0 });

  const save = async () => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    router.push("/admin/products");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <input
        className="border p-3 w-full mb-4"
        placeholder="Product Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <textarea
        className="border p-3 w-full mb-4"
        placeholder="Description"
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="number"
        className="border p-3 w-full mb-4"
        placeholder="Price"
        onChange={e => setForm({ ...form, price: e.target.value })}
      />

      <button onClick={save} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
        Save
      </button>
    </AdminLayout>
  );
}