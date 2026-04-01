'use client';

export default function SupportPage({ activeRole }) {
  const roleContent = {
    'Super Admin': 'Monitor all support tickets, escalations, and customer issues',
    'Support': 'Manage customer tickets and resolve issues',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          {activeRole} Support Page
        </h1>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-900">Support</h2>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            ['Super Admin', 'Support'].includes(activeRole) 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {['Super Admin', 'Support'].includes(activeRole) ? 'Full/Limited' : 'No'} access
          </span>
        </div>
        <p className="text-gray-600 mt-2">
          {roleContent[activeRole] || 'This section is not available for your role'}
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🆘</div>
          <h3 className="text-xl font-semibold text-gray-900">Support Tickets</h3>
          <p className="text-gray-600 mt-2">Manage customer support tickets here</p>
        </div>
      </div>
    </div>
  );
}
