'use client';

export default function OrdersPage({ activeRole }) {
  const roleContent = {
    'Super Admin': 'View all orders, manage fulfillment, handle disputes and chargebacks',
    'Retailer': 'Manage your store orders, track shipments, handle returns',
    'Vendor Manager': 'Monitor vendor order fulfillment and performance',
    'Product Ops': 'Track orders for inventory planning',
    'Support': 'View customer orders for support tickets',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          {activeRole} Orders Page
        </h1>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-900">Orders</h2>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            {['Super Admin', 'Retailer', 'Vendor Manager', 'Product Ops', 'Support'].includes(activeRole) ? 'Limited' : 'No'} access
          </span>
        </div>
        <p className="text-gray-600 mt-2">{roleContent[activeRole]}</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🛒</div>
          <h3 className="text-xl font-semibold text-gray-900">Orders Management</h3>
          <p className="text-gray-600 mt-2">View and manage customer orders here</p>
        </div>
      </div>
    </div>
  );
}
