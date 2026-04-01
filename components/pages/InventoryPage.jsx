'use client';

import React, { useState } from 'react';

export default function InventoryPage({ activeRole }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Sample inventory data
  const inventoryData = [
    { id: 1, product: 'Sony ZV-E10', sku: 'CAM-001', costPrice: '₹52,000', inStock: 8, reserved: 2, available: 6, status: 'OK' },
    { id: 2, product: 'Rode NT-USB Mini', sku: 'HCC-003', costPrice: '₹9,230', inStock: 14, reserved: 1, available: 13, status: 'OK' },
    { id: 3, product: 'Elgato Key Light', sku: 'LST-002', costPrice: '₹17,200', inStock: 3, reserved: 1, available: 2, status: 'Low stock' },
    { id: 4, product: 'Joby GorillaPod 3K', sku: 'TPD-001', costPrice: '₹1,100', inStock: 22, reserved: 0, available: 22, status: 'OK' },
    { id: 5, product: 'Stream Deck MK.2', sku: 'STR-004', costPrice: '₹14,600', inStock: 0, reserved: 0, available: 0, status: 'Out of stock' },
    { id: 6, product: 'Rode Wireless GO II', sku: 'MIC-007', costPrice: '₹26,000', inStock: 5, reserved: 0, available: 5, status: 'OK' },
    { id: 7, product: 'Samsung T7 SSD 1TB', sku: 'ACC-012', costPrice: '₹7,200', inStock: 30, reserved: 2, available: 28, status: 'OK' },
    { id: 8, product: 'Elgato Cam Link 4K', sku: 'STR-005', costPrice: '₹11,500', inStock: 6, reserved: 1, available: 5, status: 'OK' },
  ];

  // Repricing workflow steps
  const repricingSteps = [
    { actor: 'Retailer', action: 'Updates cost price in inventory' },
    { actor: 'System', action: 'Auto-freezes listing, creators see "Temporarily unavailable"' },
    { actor: 'System', action: 'Fires alert to Product Ops (dashboard + email)' },
    { actor: 'Product Ops', action: 'Recalculates: new_cost + logistics + infra + new base price, sets discount_mode & max_discount_pct' },
    { actor: 'Product Ops', action: 'Submits proposed listed price for approval' },
    { actor: 'Super Admin', action: 'Approves if change >10%, auto-approves below threshold' },
    { actor: 'System', action: 'Unfreezes listing with new price. Order queue resumes.' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'OK':
        return 'bg-green-100 text-green-700';
      case 'Low stock':
        return 'bg-orange-100 text-orange-700';
      case 'Out of stock':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getActorColor = (actor) => {
    switch (actor) {
      case 'Retailer':
        return 'bg-blue-100 text-blue-700';
      case 'System':
        return 'bg-purple-100 text-purple-700';
      case 'Product Ops':
        return 'bg-orange-100 text-orange-700';
      case 'Super Admin':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          {activeRole} Inventory Page
        </h1>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-900">Inventory</h2>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            Full access
          </span>
        </div>
        <p className="text-gray-600 mt-2">
          View + override retailer stock, freeze/unfreeze listings
        </p>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-800">
          <span className="font-semibold">⚠️ 2 products have a pending cost update from the retailer – listings frozen. Reprice to unfreeze.</span>
        </p>
      </div>

      {/* Stock Inventory Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Stock inventory</h3>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">SKU</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Cost price</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">In stock</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Reserved</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Available</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{item.product}</td>
                  <td className="py-3 px-4 text-gray-600">{item.sku}</td>
                  <td className="py-3 px-4 text-center text-gray-900 font-medium">{item.costPrice}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{item.inStock}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{item.reserved}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-green-600 font-semibold">{item.available}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded transition-colors">
                      +Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Repricing Workflow Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Repricing workflow — when retailer updates cost price</h3>

        <div className="space-y-3">
          {repricingSteps.map((step, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              {/* Step number */}
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-gray-200 text-gray-900 font-semibold text-sm">
                  {idx + 1}
                </span>
              </div>

              {/* Actor badge */}
              <div className="flex-shrink-0 pt-1">
                <span className={`text-xs font-semibold px-2 py-1 rounded inline-block ${getActorColor(step.actor)}`}>
                  {step.actor}
                </span>
              </div>

              {/* Action description */}
              <div className="flex-1 pt-1">
                <p className="text-gray-900 text-sm">{step.action}</p>
              </div>

              {/* Connector arrow (except last) */}
              {idx < repricingSteps.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-400 mt-8">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-700">OK</span>
            <span className="text-xs text-gray-600">Sufficient stock</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-1 rounded bg-orange-100 text-orange-700">Low stock</span>
            <span className="text-xs text-gray-600">Below threshold</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-1 rounded bg-red-100 text-red-700">Out of stock</span>
            <span className="text-xs text-gray-600">No inventory</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">Retailer</span>
            <span className="text-xs text-gray-600">Retailer action</span>
          </div>
        </div>
      </div>
    </div>
  );
}
