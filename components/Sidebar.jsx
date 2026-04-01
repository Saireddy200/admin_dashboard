'use client';

import React from 'react';
import Link from 'next/link';

export default function Sidebar({ activeRole }) {
  // Role descriptions
  const roleDescriptions = {
    'Super Admin': 'Full platform control',
    'Retailer': 'Manage your store',
    'Vendor Manager': 'Manage vendors',
    'Product Ops': 'Manage products',
    'Support': 'Handle support tickets',
  };

  // All navigation items
  const allNavigationItems = [
    { name: 'Overview', icon: '📊', href: '/' },
    { name: 'Products', icon: '📦', href: '/' },
    { name: 'Pricing & Discounts', icon: '💰', href: '/pricing' },
    { name: 'Orders', icon: '🛒', href: '/orders' },
    { name: 'Inventory', icon: '📋', href: '/inventory' },
    { name: 'Invoices', icon: '📄', href: '/invoices' },
    { name: 'Vendors', icon: '🤝', href: '/vendors' },
    { name: 'Support', icon: '🆘', href: '/support' },
    { name: 'Users & Roles', icon: '👥', href: '/users' },
    { name: 'Settings', icon: '⚙️', href: '/settings' },
  ];

  // Access matrix - defines access level for each role to each menu item
  const accessMatrix = {
    'Super Admin': {
      'Overview': 'full',
      'Products': 'full',
      'Pricing & Discounts': 'full',
      'Orders': 'full',
      'Inventory': 'full',
      'Invoices': 'full',
      'Vendors': 'full',
      'Support': 'full',
      'Users & Roles': 'full',
      'Settings': 'full',
    },
    'Retailer': {
      'Overview': 'full',
      'Products': 'limited',
      'Pricing & Discounts': 'none',
      'Orders': 'limited',
      'Inventory': 'full',
      'Invoices': 'limited',
      'Vendors': 'none',
      'Support': 'none',
      'Users & Roles': 'none',
      'Settings': 'none',
    },
    'Vendor Manager': {
      'Overview': 'full',
      'Products': 'limited',
      'Pricing & Discounts': 'none',
      'Orders': 'limited',
      'Inventory': 'full',
      'Invoices': 'limited',
      'Vendors': 'full',
      'Support': 'limited',
      'Users & Roles': 'none',
      'Settings': 'limited',
    },
    'Product Ops': {
      'Overview': 'full',
      'Products': 'full',
      'Pricing & Discounts': 'limited',
      'Orders': 'limited',
      'Inventory': 'full',
      'Invoices': 'limited',
      'Vendors': 'limited',
      'Support': 'none',
      'Users & Roles': 'none',
      'Settings': 'limited',
    },
    'Support': {
      'Overview': 'full',
      'Products': 'limited',
      'Pricing & Discounts': 'none',
      'Orders': 'limited',
      'Inventory': 'limited',
      'Invoices': 'limited',
      'Vendors': 'none',
      'Support': 'full',
      'Users & Roles': 'none',
      'Settings': 'none',
    },
  };

  const getRoleAccess = (itemName) => {
    return accessMatrix[activeRole]?.[itemName] || 'none';
  };

  const getAccessStyles = (accessLevel) => {
    switch (accessLevel) {
      case 'full':
        return 'text-gray-700 hover:bg-gray-50 border border-transparent cursor-pointer';
      case 'limited':
        return 'text-yellow-600 hover:bg-yellow-50 border border-yellow-200 cursor-not-allowed opacity-75';
      case 'none':
        return 'text-gray-400 hover:bg-gray-100 border border-gray-200 cursor-not-allowed opacity-60';
      default:
        return '';
    }
  };

  const getAccessBadge = (accessLevel) => {
    switch (accessLevel) {
      case 'full':
        return <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Full access</span>;
      case 'limited':
        return <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Limited</span>;
      case 'none':
        return <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">No access</span>;
      default:
        return null;
    }
  };

  const handleRestrictedClick = (e, accessLevel) => {
    if (accessLevel !== 'full') {
      e.preventDefault();
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* Current Role Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Current Role
          </p>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm font-semibold text-blue-900">{activeRole}</p>
            <p className="text-xs text-blue-600 mt-1">{roleDescriptions[activeRole]}</p>
          </div>
        </div>

        {/* Navigation Section */}
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Navigation
        </p>
        
        {/* Vertical Menu */}
        <nav className="space-y-2">
          {allNavigationItems.map((item, index) => {
            const accessLevel = getRoleAccess(item.name);
            const isAccessible = accessLevel === 'full';

            return (
              <div key={index}>
                {isAccessible ? (
                  <Link
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left border ${getAccessStyles(accessLevel)}`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="flex-1">{item.name}</span>
                  </Link>
                ) : (
                  <div
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left border ${getAccessStyles(accessLevel)}`}
                    title={`${accessLevel === 'limited' ? 'Limited access' : 'No access'} to this section`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="flex-1">{item.name}</span>
                    <span className="text-xs">🔒</span>
                  </div>
                )}
                {accessLevel !== 'full' && (
                  <div className="ml-4 mb-1">
                    {getAccessBadge(accessLevel)}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
