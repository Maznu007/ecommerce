import AdminLayout from "../../layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/products?id=${id}`)
      .then((r) => r.json())
      .then(setForm);
  }, [id]);

  if (!form)
    return (
      <AdminLayout>
        <p>Loading...</p>
      </AdminLayout>
    );

  const save = async () => {
    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Product updated!");
    router.push("/admin/products");
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      {/* LABELS ADDED HERE */}
      <label className="block text-sm font-medium mb-2">Product Name</label>
      <input
        className="border p-3 w-full mb-6"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <label className="block text-sm font-medium mb-2">Description</label>
      <textarea
        className="border p-3 w-full mb-6"
        rows={5}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <label className="block text-sm font-medium mb-2">Price ($)</label>
      <input
        type="number"
        className="border p-3 w-full mb-6"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button
        onClick={save}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
      >
        Save Changes
      </button>
    </AdminLayout>
  );
}