import AdminLayout from "../layout";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/admin/users")
      .then(r => r.json())
      .then(setUsers);
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <table className="w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="border-b">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-b">
              <td className="p-4">{u.name}</td>
              <td className="p-4">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}