import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
const navItems = [
  { to: "/marketplace/home", label: "Home" },
  { to: "/marketplace/store", label: "Store" },
  { to: "/marketplace/cart", label: "Cart" },
  { to: "/marketplace/profile", label: "Profile" }
];
function MarketplaceLayout() {
  const { toggleTheme } = useTheme();
  return <div className="bg-surface font-body-md text-on-surface min-h-screen mesh-gradient"><header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm"><div className="flex justify-between items-center h-16 px-gutter max-w-[1280px] mx-auto"><NavLink to="/marketplace/home" className="flex items-center gap-sm"><span className="material-symbols-outlined text-primary">blur_on</span><h1 className="font-display text-headline-md tracking-tighter text-primary">AI-O HOME</h1></NavLink><nav className="hidden md:flex items-center gap-lg">{navItems.map((item) => <NavLink
    key={item.to}
    to={item.to}
    className={({ isActive }) => `font-label-caps text-label-caps transition-colors ${isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"}`}
  >{item.label}</NavLink>)}</nav><button onClick={toggleTheme} className="w-10 h-10 inline-flex items-center justify-center rounded-full hover:bg-primary/5" aria-label="Toggle theme"><span className="material-symbols-outlined block leading-none text-on-surface-variant">dark_mode</span></button></div></header><Outlet /></div>;
}
export {
  MarketplaceLayout
};
