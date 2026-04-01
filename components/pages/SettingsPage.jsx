'use client';

export default function SettingsPage({ activeRole }) {
  const roleContent = {
    'Super Admin': 'Configure global platform settings, integrations, and system preferences',
    'Vendor Manager': 'Manage vendor portal settings and configurations',
    'Product Ops': 'Configure product management settings',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          {activeRole} Settings Page
        </h1>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            ['Super Admin', 'Vendor Manager', 'Product Ops'].includes(activeRole)
              ? 'bg-yellow-100 text-yellow-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {['Super Admin', 'Vendor Manager', 'Product Ops'].includes(activeRole) ? 'Limited' : 'No'} access
          </span>
        </div>
        <p className="text-gray-600 mt-2">
          {roleContent[activeRole] || 'This section is not available for your role'}
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center py-12">
          <div className="text-4xl mb-3">⚙️</div>
          <h3 className="text-xl font-semibold text-gray-900">Settings</h3>
          <p className="text-gray-600 mt-2">Configure system settings here</p>
        </div>
      </div>
    </div>
  );
}
