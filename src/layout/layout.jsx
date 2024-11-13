import React, { useState } from 'react';
import { Mail, Package, Ruler, LayoutDashboard, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: <Package size={20} />, label: 'All Products', href: '/all-products' },
    { icon: <LayoutDashboard size={20} />, label: 'Product Form', href: '/' },
    { icon: <Mail size={20} />, label: 'Email', href: '/email' },
    { icon: <Ruler size={20} />, label: 'Size Guide', href: '/size-guide' },
    { icon: <Ruler size={20} />, label: 'Create Table', href: '/table' },

  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full p-4 flex justify-end hover:bg-gray-800"
        >
          {isCollapsed ? 
            <ChevronRight size={20} /> : 
            <ChevronLeft size={20} />
          }
        </button>

        {/* Navigation Items */}
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="flex items-center p-4 hover:bg-gray-800 transition-colors"
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <span className="ml-4">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;