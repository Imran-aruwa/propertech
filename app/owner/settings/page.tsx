
// ============================================
// FILE: app/owner/settings/page.tsx
// ============================================
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { User, Bell, Lock, CreditCard, Save } from 'lucide-react';

export default function OwnerSettingsPage() {
  const [settings, setSettings] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254712345678',
    notifications: {
      email: true,
      sms: true,
      rentReminders: true,
      maintenanceAlerts: true,
    },
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout role="owner">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
            <div className="space-y-3">
              {Object.entries({
                email: 'Email Notifications',
                sms: 'SMS Notifications',
                rentReminders: 'Rent Payment Reminders',
                maintenanceAlerts: 'Maintenance Alerts',
              }).map(([key, label]) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.notifications[key as keyof typeof settings.notifications]}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, [key]: e.target.checked },
                    })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}


