'use client'

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="mt-4 text-gray-600">Welcome to PROPERTECH!</p>
      <div className="mt-8 space-y-2">
        <a href="/dashboard/properties" className="block bg-blue-600 text-white p-2 rounded">Properties</a>
        <a href="/dashboard/tenants" className="block bg-purple-600 text-white p-2 rounded">Tenants</a>
        <a href="/dashboard/financials" className="block bg-green-600 text-white p-2 rounded">Financials</a>
        <a href="/logout" className="block bg-red-600 text-white p-2 rounded">Logout</a>
      </div>
    </div>
  );
}