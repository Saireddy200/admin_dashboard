'use client';

export default function InvoicesPage({ activeRole }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          {activeRole} Invoices Page
        </h1>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-900">Invoices</h2>
          <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
            Limited access
          </span>
        </div>
        <p className="text-gray-600 mt-2">View and manage invoices and payment records</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📄</div>
          <h3 className="text-xl font-semibold text-gray-900">Invoices Management</h3>
          <p className="text-gray-600 mt-2">Track and manage all invoices here</p>
        </div>
      </div>
    </div>
  );
}
