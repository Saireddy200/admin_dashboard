'use client';

import { useContext, useMemo, useState } from 'react';
import { RoleContext } from '@/context/RoleContext';

const allInvoices = [
  { id: 'INV-C-0044', type: 'To creator', party: 'Arun K.', amount: '₹9,799', ref: '#FM-2044', status: 'Sent', date: 'Today', roles: ['Super Admin'] },
  { id: 'INV-C-0043', type: 'To creator', party: 'Sneha R.', amount: '₹50,399', ref: '#FM-2043', status: 'Sent', date: 'Today', roles: ['Super Admin'] },
  { id: 'INV-C-0042', type: 'To creator', party: 'Vishal M.', amount: '₹5,499', ref: '#FM-2042', status: 'Sent', date: 'Yesterday', roles: ['Super Admin'] },
  { id: 'INV-R-0019', type: 'To Fameo', party: 'RetailCo', amount: '₹57,100', ref: 'Batch', status: 'Pending review', date: 'Today', roles: ['Super Admin'] },
  { id: 'INV-R-0018', type: 'To Fameo', party: 'RetailCo', amount: '₹35,600', ref: 'Batch', status: 'Cleared', date: 'Mar 28', roles: ['Super Admin'] },
  { id: 'INV-C-0045', type: 'To creator', party: 'Rohit T.', amount: '₹12,499', ref: '#FM-2045', status: 'Draft', date: 'Today', roles: ['Product Ops', 'Vendor Manager'] },
];

const statusColors = {
  Sent: 'bg-sky-100 text-sky-700',
  'Pending review': 'bg-amber-100 text-amber-700',
  Cleared: 'bg-emerald-100 text-emerald-700',
  Draft: 'bg-gray-100 text-gray-600',
  Disputed: 'bg-rose-100 text-rose-700',
};

const tabs = [
  { id: 'all', label: 'All invoices' },
  { id: 'pending', label: 'Pending review' },
  { id: 'cleared', label: 'Cleared' },
];

export default function InvoicesPage() {
  const { activeRole } = useContext(RoleContext);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [invoices, setInvoices] = useState(allInvoices);

  const roleInvoices = useMemo(() => invoices.filter((invoice) => invoice.roles.includes(activeRole)), [activeRole, invoices]);

  const filtered = useMemo(() => {
    return roleInvoices.filter((invoice) => {
      const searchTerm = search.toLowerCase();
      const matchesSearch =
        invoice.id.toLowerCase().includes(searchTerm) ||
        invoice.party.toLowerCase().includes(searchTerm) ||
        invoice.ref.toLowerCase().includes(searchTerm);

      const tabMatch =
        activeTab === 'all'
          ? true
          : activeTab === 'pending'
          ? invoice.status === 'Pending review'
          : activeTab === 'cleared'
          ? invoice.status === 'Cleared'
          : true;

      return matchesSearch && tabMatch;
    });
  }, [roleInvoices, activeTab, search]);

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

  const handleClear = (invoiceId) => {
    setInvoices((prev) => prev.map((invoice) => (invoice.id === invoiceId ? { ...invoice, status: 'Cleared' } : invoice)));
  };

  const handleDispute = (invoiceId) => {
    setInvoices((prev) => prev.map((invoice) => (invoice.id === invoiceId ? { ...invoice, status: 'Disputed' } : invoice)));
  };

  const headerText =
    activeRole === 'Super Admin'
      ? 'Creator & retailer invoices; clear payments; dispute resolution'
      : 'Invoice workflow for your role';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1">Creator & retailer invoice flow</p>
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
            placeholder="Search invoices..."
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-left text-xs uppercase tracking-wider">
                <th className="px-3 py-2">Invoice ID</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">To / From</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Ref.</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-3 py-6 text-center text-gray-500">No invoices found.</td>
                </tr>
              ) : (
                filtered.map((invoice) => (
                  <tr key={invoice.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{invoice.id}</td>
                    <td className="px-3 py-2">{invoice.type}</td>
                    <td className="px-3 py-2">{invoice.party}</td>
                    <td className="px-3 py-2">{invoice.amount}</td>
                    <td className="px-3 py-2">{invoice.ref}</td>
                    <td className="px-3 py-2"><span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColors[invoice.status]}`}>{invoice.status}</span></td>
                    <td className="px-3 py-2">{invoice.date}</td>
                    <td className="px-3 py-2 flex gap-2">
                      {invoice.status === 'Pending review' && (
                        <button onClick={() => handleClear(invoice.id)} className="px-3 py-1 text-xs font-semibold text-white bg-emerald-600 rounded hover:bg-emerald-700">Clear</button>
                      )}
                      {invoice.status === 'Pending review' && (
                        <button onClick={() => handleDispute(invoice.id)} className="px-3 py-1 text-xs font-semibold text-white bg-rose-600 rounded hover:bg-rose-700">Dispute</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-lg border border-gray-200 bg-slate-50 p-4 text-sm text-gray-700">
          <p><strong>Refund amount:</strong> Always refund amount_paid by creator (after discount). Never MRP.</p>
          <p><strong>Fameo exposure:</strong> Retailer accepts return → Fameo recovers retailer_cost. Retailer refuses → Fameo absorbs full cost.</p>
          <p><strong>Return policy:</strong> Defined per retailer/vendor onboarding. No-return products must show label on Fameo.</p>
          <p><strong>Discount clawback:</strong> Fameo does NOT claw back discount from creator. It was Fameo's margin cost to absorb.</p>
        </div>
      </div>
    </div>
  );
}
