import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut } from "lucide-react";

export default function AdminLayout({ children }) {

  const handleLogout = () => {
    signOut({ callbackUrl: "/account" }); // Redirect to login/signup page
  };

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* SIDEBAR */}
      <aside className="w-64 h-screen bg-slate-900 text-white p-6 fixed left-0 top-0 flex flex-col justify-between">

        {/* TOP SECTION */}
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2 mb-8">
            <LayoutDashboard /> Admin Panel
          </h1>

          <nav className="space-y-2">
            <Link href="/admin" className="block p-3 bg-slate-800 rounded-lg hover:bg-slate-700">
              Dashboard
            </Link>
            <Link href="/admin/products" className="block p-3 bg-slate-800 rounded-lg hover:bg-slate-700">
              <Package className="inline mr-2" /> Products
            </Link>
            <Link href="/admin/orders" className="block p-3 bg-slate-800 rounded-lg hover:bg-slate-700">
              <ShoppingCart className="inline mr-2" /> Orders
            </Link>
            <Link href="/admin/users" className="block p-3 bg-slate-800 rounded-lg hover:bg-slate-700">
              <Users className="inline mr-2" /> Users
            </Link>
          </nav>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 bg-rose-600 hover:bg-rose-700 rounded-lg mt-6"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 w-full p-8">{children}</main>
    </div>
  );
}