import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ProductsContext } from "@/components/ProductsContext";
import { Home, ShoppingBag } from "lucide-react";

export default function Footer() {
  const router = useRouter();
  const path = router.pathname;
  const { selectedProducts } = useContext(ProductsContext);

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/checkout", icon: ShoppingBag, label: "Cart", badge: selectedProducts.length },
  ];

  return (
    <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="bg-slate-900/90 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-2xl shadow-slate-900/20 border border-white/10">
        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = path === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.href} href={item.href} className="relative group">
                <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive ? "text-indigo-400" : "text-slate-400 hover:text-white"
                }`}>
                  <div className="relative">
                    <Icon 
                      size={24} 
                      strokeWidth={isActive ? 2.5 : 2}
                      className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                    />
                    {item.badge > 0 && (
                      <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-medium transition-all duration-300 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                  }`}>
                    {item.label}
                  </span>
                </div>
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </footer>
  );
}