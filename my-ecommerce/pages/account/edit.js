import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function EditProfile() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [name, setName] = useState(session?.user?.name || "");
  const [image, setImage] = useState(session?.user?.image || "");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64 }),
      });

      const data = await res.json();
      setImage(data.url);
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const saveChanges = async () => {
    await update(); // refresh NextAuth session
    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Update failed");
      return;
    }

    // 🔥 REFRESH SESSION WITH NEW NAME + IMAGE
    await update();

    setSuccess("Profile updated successfully!");

    setTimeout(() => {
      router.push("/account");
    }, 1200);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <div className="text-center mb-4">
        <label>
          <img
            src={image || "/default-avatar.png"}
            className="w-24 h-24 rounded-full mx-auto cursor-pointer"
          />
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>

        {uploading && <p className="text-indigo-600 mt-2">Uploading...</p>}
      </div>

      {success && (
        <p className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {success}
        </p>
      )}

      <label className="block mb-2">Full Name</label>
      <input
        className="w-full border p-3 rounded mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={saveChanges}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}