'use client';

import { useContext, useMemo, useState } from 'react';
import { RoleContext } from '@/context/RoleContext';
import AppDataContext from '@/context/AppDataContext';
import SectionHeader from '@/components/shared/SectionHeader';
import DataTable from '@/components/shared/DataTable';
import StatusPill from '@/components/shared/StatusPill';

export default function PricingPage() {
  const { activeRole } = useContext(RoleContext);
  const { state, actions } = useContext(AppDataContext);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [priceEdit, setPriceEdit] = useState('');

  const products = useMemo(() => state.products.filter((product) => product.roles.includes(activeRole)), [state.products, activeRole]);
  const filtered = useMemo(() => products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())), [products, search]);

  const getRoleAccessLevel = () => (activeRole === 'Super Admin' || activeRole === 'Product Ops') ? 'Full access' : 'Limited access';

  const handleUpdatePrice = () => {
    if (!selectedProduct || !priceEdit) return;
    actions.updateProduct({ ...selectedProduct, price: priceEdit });
    setSelectedProduct(null);
    setPriceEdit('');
  };

  const columns = [
    { key: 'name', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'discountMode', label: 'Discount mode' },
    { key: 'maxDisc', label: 'Max disc.' },
    { key: 'status', label: 'Status', render: (row) => <StatusPill status={row.status} /> },
    { key: 'action', label: 'Action', render: (row) => (
        <button onClick={() => { setSelectedProduct(row); setPriceEdit(row.price); }} className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100">Reprice</button>
      )},
  ];

  const rows = filtered.map((product) => ({ ...product, key: product.id }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Pricing & Discounts" subtitle="View and adjust pricing by role" badge={getRoleAccessLevel()} />
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="grid gap-3 md:grid-cols-2 mb-4">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400" />
        </div>

        <DataTable columns={columns} rows={rows} noDataText="No pricing entries found." />

        {selectedProduct && (
          <div className="mt-6 rounded-lg border border-gray-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold mb-2">Reprice {selectedProduct.name}</h3>
            <div className="flex flex-wrap items-center gap-2">
              <input value={priceEdit} onChange={(e) => setPriceEdit(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2" />
              <button onClick={handleUpdatePrice} className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">Save</button>
              <button onClick={() => setSelectedProduct(null)} className="px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
