import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  Users, 
  Truck, 
  MapPin, 
  Package, 
  Settings,
  ChevronRight,
  Shield
} from "lucide-react";

import NavigationText from "../../components/Texts/NavigationText";

const navItems = [
  {
    to: "/admin/admins",
    label: "Admins",
    icon: Shield,
    description: "Manage administrators"
  },
  {
    to: "/admin/shippers",
    label: "Shippers",
    icon: Truck,
    description: "Shipping partners"
  },
  {
    to: "/admin/trackers",
    label: "Trackers",
    icon: MapPin,
    description: "Track shipments"
  },
  {
    to: "/admin/productlists",
    label: "Product Lists",
    icon: Package,
    description: "Manage inventory"
  }
];

function SidebarNavItem({ item, isActive }) {
  const Icon = item.icon;
  
  return (
    <Link
      to={item.to}
      className={`
        group relative flex items-center gap-3 px-4 py-3 mx-2 rounded-lg
        transition-all duration-200 ease-in-out
        ${isActive 
          ? 'bg-primary text-primary-foreground shadow-md' 
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        }
      `}
    >
      <Icon 
        size={20} 
        className={`
          transition-transform duration-200
          ${isActive ? 'scale-110' : 'group-hover:scale-105'}
        `} 
      />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">{item.label}</div>
        <div className={`
          text-xs opacity-70 truncate
          ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}
        `}>
          {item.description}
        </div>
      </div>
      <ChevronRight 
        size={16} 
        className={`
          transition-all duration-200
          ${isActive ? 'opacity-100 translate-x-1' : 'opacity-0 group-hover:opacity-50'}
        `}
      />
    </Link>
  );
}

export default function Index_Admin() {
  const location = useLocation();

  return (
    <div className="size-full flex bg-background">
      {/* Sidebar */}
      <div className="min-w-[280px] flex flex-col bg-card border-r border-border shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Management Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <div className="px-4 mb-3">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Management
            </h2>
          </div>
          <div className="space-y-1">
            {navItems.map((item) => (
              <SidebarNavItem
                key={item.to}
                item={item}
                isActive={location.pathname === item.to}
              />
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 bg-background">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
