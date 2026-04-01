'use client';

import React, { useState } from 'react';

export default function PricingDiscountsPage({ activeRole }) {
  const [showEditRules, setShowEditRules] = useState(false);

  // Global discount plans
  const discountPlans = [
    {
      percentage: '0%',
      name: 'Free / no plan',
      description: 'Full listed price, no discount',
      color: 'bg-gray-50',
      textColor: 'text-gray-700'
    },
    {
      percentage: '2%',
      name: 'Popular plan',
      description: '2% off listed price – absorbed from retailer cost',
      color: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      percentage: '4%',
      name: 'Elite plan',
      description: '4% off (if max_discount_pct cap if dustier) – absorbed from Fameo margin',
      color: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
  ];

  // Sample products data
  const products = [
    { name: 'Sony ZV-E10', mode: 'Full discount', maxCap: '4%', margin: '₹499', marginPercent: '1.8%', popularSale: 'No', eliteSale: 'No' },
    { name: 'Rode NT-USB Mini', mode: 'Full discount', maxCap: '4%', margin: '₹799', marginPercent: '8.6%', popularSale: 'Yes', eliteSale: 'Yes' },
    { name: 'Elgato Key Light', mode: 'Elite only', maxCap: '2%', margin: '₹759', marginPercent: '4.2%', popularSale: 'Yes', eliteSale: 'Yes' },
    { name: 'Joby GorillaPod 3K', mode: 'No discount', maxCap: '—', margin: '₹399', marginPercent: '7.3%', popularSale: 'Yes', eliteSale: 'Yes' },
    { name: 'Samsung T7 SSD 1TB', mode: 'Full discount', maxCap: '4%', margin: '₹799', marginPercent: '10.8%', popularSale: 'Yes', eliteSale: 'Yes' },
    { name: 'Elgato Cam Link 4K', mode: 'Full discount', maxCap: '4%', margin: '₹299', marginPercent: '5.6%', popularSale: 'Yes', eliteSale: 'Yes' },
  ];

  // Discount system logic rules
  const systemRules = [
    { rule: 'Cart lock', description: 'discount_rate + plan_snapshot locked at cart creation – NOT at payment time' },
    { rule: 'Plan change', description: 'Plan changes after cart creation don\'t affect that cart (30-min TTL)' },
    { rule: 'Calculation', description: 'applied_disc = min(plan_discount_pct, product max_discount_pct)' },
    { rule: 'Mode check', description: 'ELITE_ONLY → Popular gets 0%, NO_DISCOUNT → all plans pay full price' },
    { rule: 'Retailer invoice', description: 'Retailer invoices at retailer_cost_price only – listed price & discount never shared' },
    { rule: 'Fameo net margin', description: 'listed_price – retailer_cost – logistics – infra – discount_absorbed' },
    { rule: 'Gaming egg', description: 'Monthly purchase cap per creator (default ₹1/mo for discounted products)' },
  ];

  if (activeRole !== 'Super Admin') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
            {activeRole} Pricing & Discounts Page
          </h1>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-900">Pricing & Discounts</h2>
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
              No access
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-xl font-semibold text-gray-900">Access Restricted</h3>
            <p className="text-gray-600 mt-2">
              {activeRole} does not have access to pricing and discounts management
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          Super Admin Pricing & Discounts Page
        </h1>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-900">Pricing & Discounts</h2>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            Full access
          </span>
        </div>
        <p className="text-gray-600 mt-2">
          Set global plain discounts, per-product discount_mode & max_discount_pct
        </p>
      </div>

      {/* Global Plan Discount Rules */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Global plan discount rules <span className="text-xs font-semibold text-gray-500">Super Admin only</span></h3>
          <button 
            onClick={() => setShowEditRules(!showEditRules)}
            className="bg-green-50 hover:bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Edit rules
          </button>
        </div>

        {/* Discount Plan Cards */}
        <div className="grid grid-cols-3 gap-4">
          {discountPlans.map((plan, idx) => (
            <div key={idx} className={`rounded-lg border border-gray-200 p-4 ${plan.color}`}>
              <div className="text-center">
                <p className={`text-3xl font-bold ${plan.textColor}`}>{plan.percentage}</p>
                <p className="font-semibold text-gray-900 mt-2">{plan.name}</p>
                <p className="text-xs text-gray-600 mt-2">{plan.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Per-Product Discount Safety Check */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Per-product discount safety check <span className="text-xs font-semibold text-gray-500">Product Ops proposes · Super Admin approves</span></h3>
        </div>

        {/* Alert Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">Rule:</span> Retailer always invoices at full cost price. Discounts absorbed entirely from Fameo's margin.
          </p>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Mode</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Max cap</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Margin ₹</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Margin %</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Popular sale?</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Elite sale?</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{product.name}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      product.mode === 'Full discount' ? 'bg-green-100 text-green-700' :
                      product.mode === 'Elite only' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {product.mode}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-gray-600">{product.maxCap}</td>
                  <td className="py-3 px-4 text-center text-gray-900 font-medium">{product.margin}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{product.marginPercent}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={product.popularSale === 'Yes' ? 'text-green-600 font-semibold' : 'text-gray-400'}>
                      {product.popularSale}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={product.eliteSale === 'Yes' ? 'text-green-600 font-semibold' : 'text-gray-400'}>
                      {product.eliteSale}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded transition-colors">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discount System Logic */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Discount system logic</h3>

        <div className="space-y-4">
          {systemRules.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-blue-100 text-blue-700 font-semibold text-sm">
                  {idx + 1}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{item.rule}</p>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-100 rounded border border-green-300"></span>
            <span className="text-xs text-gray-600">Full discount</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-100 rounded border border-purple-300"></span>
            <span className="text-xs text-gray-600">Elite only</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-gray-100 rounded border border-gray-300"></span>
            <span className="text-xs text-gray-600">No discount</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-semibold">Yes</span>
            <span className="text-xs text-gray-600">Eligible</span>
          </div>
        </div>
      </div>
    </div>
  );
}
