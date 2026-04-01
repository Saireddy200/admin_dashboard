'use client';

import { useContext, useMemo, useState } from 'react';
import { RoleContext } from '@/context/RoleContext';

const allOrders = [
  { id: '#FM-2044', creator: 'Arun K.', product: 'Rode NT-USB Mini', paid: '₹9,799', discount: '-2%', status: 'Pending pack', tracking: '–', date: 'Today', roles: ['Super Admin'] },
  { id: '#FM-2043', creator: 'Sneha R.', product: 'Sony ZV-E10', paid: '₹50,399', discount: '-4%', status: 'Packed', tracking: '–', date: 'Today', roles: ['Super Admin'] },
  { id: '#FM-2042', creator: 'Vishal M.', product: 'Joby GorillaPod', paid: '₹5,499', discount: '–', status: 'Dispatched', tracking: 'DL4892011234', date: 'Yesterday', roles: ['Super Admin'] },
  { id: '#FM-2041', creator: 'Priya D.', product: 'Elgato Key Light', paid: '₹17,999', discount: '–', status: 'Delivered', tracking: 'DL4891988123', date: 'Mar 29', roles: ['Super Admin'] },
  { id: '#FM-2040', creator: 'Kiran V.', product: 'Rode NT-USB Mini', paid: '₹9,799', discount: '-2%', status: 'Delivered', tracking: 'DL4891855011', date: 'Mar 28', roles: ['Super Admin'] },
  { id: '#FM-2039', creator: 'Divya S.', product: 'Samsung T7 SSD', paid: '₹7,679', discount: '-4%', status: 'Refund initiated', tracking: 'DL4891744001', date: 'Mar 27', roles: ['Super Admin'] },
  { id: '#FM-2038', creator: 'Ramesh N.', product: 'Sony ZV-E10', paid: '₹52,499', discount: '–', status: 'Cancelled', tracking: '–', date: 'Mar 26', roles: ['Super Admin'] },
  { id: '#FM-2051', creator: 'Anita P.', product: 'Canon EOS 2000D', paid: '₹35,999', discount: '2%', status: 'Packed', tracking: '–', date: 'Today', roles: ['Retailer'] },
  { id: '#FM-2052', creator: 'Karthik S.', product: 'Godox SL-60W', paid: '₹15,999', discount: '–', status: 'Pending pack', tracking: '–', date: 'Today', roles: ['Vendor Manager'] },
];

const statusColors = {
  'Pending pack': 'bg-amber-100 text-amber-700',
  'Packed': 'bg-sky-100 text-sky-700',
  'Dispatched': 'bg-indigo-100 text-indigo-700',
  'Delivered': 'bg-emerald-100 text-emerald-700',
  'Refund initiated': 'bg-orange-100 text-orange-700',
  'Cancelled': 'bg-rose-100 text-rose-700',
};

const tabs = [
  { id: 'all', label: 'All orders' },
  { id: 'pending', label: 'Pending pack' },
  { id: 'packed', label: 'Packed' },
  { id: 'shipped', label: 'Dispatched' },
];

export default function OrdersPage() {
  const { activeRole } = useContext(RoleContext);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState(allOrders);

  const roleOrders = useMemo(() => {
    return orders.filter((order) => order.roles.includes(activeRole));
  }, [activeRole, orders]);

  const filtered = useMemo(() => {
    return roleOrders.filter((order) => {
      const searchTerm = search.toLowerCase();
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm) ||
        order.creator.toLowerCase().includes(searchTerm) ||
        order.product.toLowerCase().includes(searchTerm);

      const tabMatch =
        activeTab === 'all'
          ? true
          : activeTab === 'pending'
          ? order.status === 'Pending pack'
          : activeTab === 'packed'
          ? order.status === 'Packed'
          : activeTab === 'shipped'
          ? order.status === 'Dispatched'
          : true;

      return matchesSearch && tabMatch;
    });
  }, [roleOrders, activeTab, search]);

  const getRoleAccessLevel = () => {
    switch (activeRole) {
      case 'Super Admin':
        return 'Full access';
      case 'Product Ops':
        return 'Full access';
      case 'Vendor Manager':
        return 'Limited access';
      case 'Retailer':
        return 'Limited access';
      case 'Support':
        return 'Limited access';
      default:
        return 'No access';
    }
  };

  const handlePushOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: 'Dispatched', tracking: `DL${Math.floor(1000000000 + Math.random() * 9000000000)}` }
          : o
      )
    );
  };

  const headerText =
    activeRole === 'Super Admin'
      ? 'All orders, all creators, full pipeline — manually push stuck orders'
      : activeRole === 'Retailer'
      ? 'Your order pipeline and status updates'
      : 'Orders you can review and action';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Order pipeline and status management</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700">{getRoleAccessLevel()}</span>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-2 text-gray-500">{headerText}</div>
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 mb-4">
          {tabs.map((tab) => {
            const current = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${current ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="grid gap-3 md:grid-cols-2 mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-left text-xs uppercase tracking-wider">
                <th className="px-3 py-2">Order ID</th>
                <th className="px-3 py-2">Creator</th>
                <th className="px-3 py-2">Product</th>
                <th className="px-3 py-2">Paid</th>
                <th className="px-3 py-2">Disc.</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Tracking</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-3 py-6 text-center text-gray-500">No orders found.</td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{order.id}</td>
                    <td className="px-3 py-2 text-gray-600">{order.creator}</td>
                    <td className="px-3 py-2 text-gray-600">{order.product}</td>
                    <td className="px-3 py-2">{order.paid}</td>
                    <td className="px-3 py-2">{order.discount}</td>
                    <td className="px-3 py-2"><span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColors[order.status]}`}>{order.status}</span></td>
                    <td className="px-3 py-2 text-blue-600 font-medium">{order.tracking}</td>
                    <td className="px-3 py-2">{order.date}</td>
                    <td className="px-3 py-2">
                      {order.status === 'Pending pack' ? (
                        <button
                          onClick={() => handlePushOrder(order.id)}
                          className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"
                        >
                          Push
                        </button>
                      ) : (
                        <span className="text-xs text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-lg border border-gray-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold mb-2">Order edge cases & rules</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <strong>Payment success, webhook fails:</strong> Dead-letter retry 3× then Super Admin alert. Never mark payment complete without order ID.
            </li>
            <li>
              <strong>OOS after payment accepted:</strong> support may wait for restock, or full refund amount_paid, or substitute offer.
            </li>
            <li>
              <strong>Partial cart OOS:</strong> unfulfillable items auto-refunded; fulfilled items ship separately.
            </li>
            <li>
              <strong>Plan downgrade mid-checkout:</strong> discounts locked at cart creation; cart expires after 30 min.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
