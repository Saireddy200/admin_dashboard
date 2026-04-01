'use client';

import { useContext, useMemo, useState } from 'react';
import { RoleContext } from '@/context/RoleContext';
import AppDataContext from '@/context/AppDataContext';
import SectionHeader from '@/components/shared/SectionHeader';
import DataTable from '@/components/shared/DataTable';
import StatusPill from '@/components/shared/StatusPill';

export default function InventoryPage() {
  const { activeRole } = useContext(RoleContext);
  const { state, actions } = useContext(AppDataContext);
  const [search, setSearch] = useState('');

  const products = useMemo(() => state.products.filter((product) => product.roles.includes(activeRole)), [state.products, activeRole]);
  const filtered = useMemo(() => products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())), [products, search]);

  const getRoleAccessLevel = () => (['Super Admin', 'Product Ops', 'Vendor Manager'].includes(activeRole) ? 'Full access' : 'Limited access');

  const updateStock = (productId, delta) => {
    const product = state.products.find((p) => p.id === productId);
    if (!product) return;
    actions.updateProduct({ ...product, stock: Math.max(0, product.stock + delta) });
  };

  const columns = [
    { key: 'name', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Stock' },
    { key: 'status', label: 'Status', render: (row) => <StatusPill status={row.status} /> },
    { key: 'action', label: 'Action', render: (row) => (
      <div className="flex items-center gap-2">
        <button onClick={() => updateStock(row.id, 1)} className="px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded hover:bg-green-700">+1</button>
        <button onClick={() => updateStock(row.id, -1)} className="px-2 py-1 text-xs font-semibold text-white bg-rose-600 rounded hover:bg-rose-700">-1</button>
      </div>
    )},
  ];

  const rows = filtered.map((product) => ({ ...product, key: product.id }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Inventory" subtitle="Stock count management" badge={getRoleAccessLevel()} />
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="grid gap-3 md:grid-cols-2 mb-4">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search inventory..." className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400" />
        </div>

        <DataTable columns={columns} rows={rows} noDataText="No inventory items found." />

        <div className="mt-6 rounded-lg border border-gray-200 bg-slate-50 p-4 text-sm text-gray-700">
          <p>Stock changes are persisted to localStorage so role changes and reloads maintain current state.</p>
        </div>
      </div>
    </div>
  );
}
