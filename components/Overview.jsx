'use client';

import React from 'react';

export default function Overview({ activeRole }) {
  // KPI Data
  const kpiMetrics = {
    'Super Admin': [
      { label: 'Total Orders', value: '1,284', change: '+12% this week', status: 'positive' },
      { label: 'Net Margin', value: '₹91,200', change: '+8% this month', status: 'positive' },
      { label: 'Frozen Listings', value: '2', change: 'Awaiting reprieve', status: 'alert' },
      { label: 'Open Tickets', value: '17', change: '3 escalated', status: 'warning' },
    ],
    'Retailer': [
      { label: 'Pending Orders', value: '48', change: 'Orders to fulfill', status: 'neutral' },
      { label: 'Dispatched', value: '12', change: 'Tracking active', status: 'positive' },
      { label: 'Invoices Pending', value: '4', change: 'Awaiting clearance', status: 'alert' },
      { label: 'Low Stock Items', value: '3', change: 'Below threshold', status: 'warning' },
    ],
    'Vendor Manager': [
      { label: 'Active Vendors', value: '45', change: '+3 this month', status: 'positive' },
      { label: 'Pending Reviews', value: '8', change: 'Awaiting approval', status: 'warning' },
      { label: 'Performance Score', value: '4.7/5', change: 'Overall average', status: 'positive' },
      { label: 'Open Disputes', value: '2', change: 'High priority', status: 'alert' },
    ],
    'Product Ops': [
      { label: 'Total Products', value: '2,847', change: '+156 this month', status: 'positive' },
      { label: 'Pending Upload', value: '23', change: 'Awaiting verification', status: 'warning' },
      { label: 'Out of Stock', value: '12', change: 'Need replenishment', status: 'alert' },
      { label: 'Categories', value: '89', change: 'Organized & active', status: 'positive' },
    ],
    'Support': [
      { label: 'Open Tickets', value: '34', change: 'Total unresolved', status: 'warning' },
      { label: 'Avg Response', value: '2.5hrs', change: 'Within SLA', status: 'positive' },
      { label: 'Escalated', value: '5', change: 'High priority', status: 'alert' },
      { label: 'Resolved Today', value: '18', change: '+25% than avg', status: 'positive' },
    ],
  };

  // Access Matrix Data
  const accessMatrix = {
    sections: [
      'Overview', 'Products', 'Pricing & Discounts', 'Orders', 'Inventory',
      'Invoices', 'Vendors', 'Support', 'Users & Roles', 'Settings'
    ],
    roles: ['Super Admin', 'Retailer', 'Vendor Manager', 'Product Ops', 'Support'],
    access: {
      'Super Admin': ['full', 'full', 'full', 'full', 'full', 'full', 'full', 'full', 'full', 'full'],
      'Retailer': ['full', 'limited', 'none', 'limited', 'full', 'limited', 'none', 'none', 'none', 'none'],
      'Vendor Manager': ['full', 'limited', 'none', 'limited', 'full', 'limited', 'full', 'limited', 'none', 'limited'],
      'Product Ops': ['full', 'full', 'limited', 'limited', 'full', 'limited', 'limited', 'none', 'none', 'limited'],
      'Support': ['full', 'limited', 'none', 'limited', 'limited', 'limited', 'none', 'full', 'none', 'none'],
    }
  };

  const getAccessColor = (level) => {
    switch (level) {
      case 'full':
        return 'bg-green-100 text-green-700';
      case 'limited':
        return 'bg-yellow-100 text-yellow-700';
      case 'none':
        return 'bg-gray-100 text-gray-400';
      default:
        return '';
    }
  };

  const getAccessLabel = (level) => {
    switch (level) {
      case 'full':
        return 'Full access';
      case 'limited':
        return 'Limited';
      case 'none':
        return 'No access';
      default:
        return '';
    }
  };

  const currentKPIs = kpiMetrics[activeRole] || kpiMetrics['Super Admin'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          {activeRole} Overview Page
        </h1>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-900">Overview</h2>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            Full access
          </span>
        </div>
        <p className="text-gray-600 mt-1">
          {activeRole === 'Super Admin' && 'All KPIs: revenue, orders, margin, frozen listings, all-role activity'}
          {activeRole === 'Retailer' && 'Own orders, pending pack, dispatched, payments — NO margin or revenue data'}
          {activeRole === 'Vendor Manager' && 'Vendor performance metrics, disputes, and onboarding status'}
          {activeRole === 'Product Ops' && 'Product inventory, listings, bulk uploads, and category management'}
          {activeRole === 'Support' && 'Support tickets, escalations, and customer issues'}
        </p>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentKPIs.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
            <p className={`text-xs mt-2 ${
              metric.status === 'positive' ? 'text-green-600' :
              metric.status === 'alert' ? 'text-red-600' :
              metric.status === 'warning' ? 'text-orange-600' :
              'text-gray-600'
            }`}>
              {metric.change}
            </p>
          </div>
        ))}
      </div>

      {/* Alert Banner */}
      {activeRole === 'Super Admin' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">⚠️ When you update a cost price in Inventory, the listing auto-freezes on Fameo until the team reprices it.</span>
          </p>
        </div>
      )}

      {/* Access Summary - Only for Super Admin */}
      {activeRole === 'Super Admin' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Access summary — Super Admin</h2>
          <p className="text-xs text-gray-600 mb-4">10/10 sections</p>

          {/* Access Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Feature</th>
                  {accessMatrix.sections.map((section) => (
                    <td key={section} className="text-center py-2 px-2 font-medium text-gray-600 text-xs">
                      {section}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-transparent">
                  <td className="py-3 px-3 font-semibold text-gray-900">Super Admin</td>
                  {accessMatrix.access['Super Admin'].map((access, idx) => (
                    <td key={idx} className="text-center py-3 px-2">
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getAccessColor(access)}`}>
                        ●
                      </div>
                    </td>
                  ))}
                </tr>

                {['Retailer', 'Vendor Manager', 'Product Ops', 'Support'].map((role) => (
                  <tr key={role} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-3 font-medium text-gray-700">{role}</td>
                    {accessMatrix.access[role].map((access, idx) => (
                      <td key={idx} className="text-center py-3 px-2">
                        <div title={getAccessLabel(access)} className={`inline-block w-3 h-3 rounded-full ${
                          access === 'full' ? 'bg-green-500' :
                          access === 'limited' ? 'bg-yellow-500' :
                          'bg-gray-300'
                        }`}></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="flex gap-6 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-xs text-gray-600">Full access</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="text-xs text-gray-600">Limited</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
              <span className="text-xs text-gray-600">View only</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">○</span>
              <span className="text-xs text-gray-600">No access</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
