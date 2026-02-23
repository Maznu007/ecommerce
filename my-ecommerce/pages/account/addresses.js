import { useState, useEffect } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: ""
  });

  // Load addresses from backend
  useEffect(() => {
    fetch("/api/user/address")
      .then(res => res.json())
      .then(data => {
        setAddresses(data.addresses || []);
        setLoading(false);
      });
  }, []);

  // Submit new address
  const submitAddress = async () => {
    const res = await fetch("/api/user/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      setAddresses(prev => [...prev, form]);
      setShowForm(false);
      setForm({ street: "", city: "", postalCode: "", country: "" });
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Link href="/account" className="flex items-center gap-2 mb-6">
        <ArrowLeft /> Back
      </Link>

      <h1 className="text-2xl font-bold mb-6">My Addresses</h1>

      {/* Address List */}
      {!loading && addresses.length === 0 && (
        <p className="text-slate-600 mb-6">No saved addresses.</p>
      )}

      {addresses.map(a => (
        <div key={a._id} className="p-4 bg-white rounded-xl shadow mb-3">
          <p>{a.street}</p>
          <p>{a.city}, {a.postalCode}</p>
          <p>{a.country}</p>
        </div>
      ))}

      {/* Add new address button */}
      <button
        className="w-full bg-indigo-600 text-white rounded-xl py-3 mt-6 flex items-center justify-center gap-2"
        onClick={() => setShowForm(true)}
      >
        <Plus /> Add New Address
      </button>

      {/* Form Modal */}
      {showForm && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-xl space-y-4">
          {["street", "city", "postalCode", "country"].map(key => (
            <input
              key={key}
              placeholder={key}
              value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              className="w-full border rounded-lg p-3"
            />
          ))}

          <button
            onClick={submitAddress}
            className="w-full bg-indigo-600 text-white p-3 rounded-xl"
          >
            Save Address
          </button>
        </div>
      )}
    </div>
  );
}