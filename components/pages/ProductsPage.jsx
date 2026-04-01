'use client';

import React from 'react';

export default function ProductsPage({ activeRole }) {
  const roleContent = {
    'Super Admin': {
      description: 'Manage all products across all categories, set pricing, control listings',
      stats: [
        { label: 'Total Products', value: '2,847', color: 'blue' },
        { label: 'Active Listings', value: '2,834', color: 'green' },
        { label: 'Inactive', value: '13', color: 'gray' },
        { label: 'Pending Review', value: '45', color: 'yellow' },
      ]
    },
    'Retailer': {
      description: 'Upload and manage your store products, update inventory, view pricing',
      stats: [
        { label: 'My Products', value: '156', color: 'blue' },
        { label: 'Active', value: '150', color: 'green' },
        { label: 'Inactive', value: '6', color: 'gray' },
        { label: 'Draft', value: '3', color: 'yellow' },
      ]
    },
    'Vendor Manager': {
      description: 'Monitor vendor product listings, approve new submissions, manage categories',
      stats: [
        { label: 'Vendor Products', value: '1,245', color: 'blue' },
        { label: 'Pending Approval', value: '23', color: 'yellow' },
        { label: 'Rejected', value: '8', color: 'red' },
        { label: 'Active Vendors', value: '45', color: 'green' },
      ]
    },
    'Product Ops': {
      description: 'Catalog management, bulk uploads, category organization, inventory sync',
      stats: [
        { label: 'All Products', value: '2,847', color: 'blue' },
        { label: 'Out of Stock', value: '87', color: 'red' },
        { label: 'Low Stock', value: '234', color: 'yellow' },
        { label: 'Categories', value: '89', color: 'green' },
      ]
    },
    'Support': {
      description: 'View product details for customer support, check listings and specifications',
      stats: [
        { label: 'Total Products', value: '2,847', color: 'blue' },
        { label: 'Product Issues', value: '12', color: 'red' },
        { label: 'Pricing Issues', value: '5', color: 'yellow' },
        { label: 'Resolved Today', value: '18', color: 'green' },
      ]
    }
  };

  const content = roleContent[activeRole];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          {activeRole} Products Page
        </h1>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-900">Products</h2>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            {activeRole === 'Super Admin' ? 'Full' : 'Limited'} access
          </span>
        </div>
        <p className="text-gray-600 mt-2">{content.description}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {content.stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase">{stat.label}</p>
            <p className={`text-2xl font-bold mt-2 ${
              stat.color === 'blue' ? 'text-blue-600' :
              stat.color === 'green' ? 'text-green-600' :
              stat.color === 'yellow' ? 'text-orange-600' :
              stat.color === 'red' ? 'text-red-600' :
              'text-gray-600'
            }`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📦</div>
          <h3 className="text-xl font-semibold text-gray-900">Products Management</h3>
          <p className="text-gray-600 mt-2 max-w-lg mx-auto">
            This is the {activeRole} products page. Here you can manage, upload, and organize your products.
          </p>
        </div>
      </div>
    </div>
  );
}
