export default function StatusPill({ status }) {
  const map = {
    'Live': 'bg-emerald-100 text-emerald-700',
    'Frozen': 'bg-amber-100 text-amber-700',
    'Pending review': 'bg-sky-100 text-sky-700',
    'Pending pack': 'bg-amber-100 text-amber-700',
    'Packed': 'bg-sky-100 text-sky-700',
    'Dispatched': 'bg-indigo-100 text-indigo-700',
    'Delivered': 'bg-emerald-100 text-emerald-700',
    'Refund initiated': 'bg-orange-100 text-orange-700',
    'Cancelled': 'bg-rose-100 text-rose-700',
    'Sent': 'bg-sky-100 text-sky-700',
    'Pending review': 'bg-amber-100 text-amber-700',
    'Cleared': 'bg-emerald-100 text-emerald-700',
    'Draft': 'bg-gray-100 text-gray-600',
    'Disputed': 'bg-rose-100 text-rose-700',
  };

  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${map[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>;
}
