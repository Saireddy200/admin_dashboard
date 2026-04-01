export default function Home() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
      </div>

      {/* Placeholder Content Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 min-h-96 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">📊</div>
          <h2 className="text-2xl font-semibold text-gray-900">Dashboard Content Here</h2>
          <p className="text-gray-600 max-w-md">
            This is a placeholder for the main dashboard content. Build your pages and components here.
          </p>
        </div>
      </div>
    </div>
  );
}
