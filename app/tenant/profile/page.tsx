// ============================================
// FILE: app/tenant/profile/page.tsx
// ============================================
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { User, Mail, Phone, Home, Save } from 'lucide-react';

export default function TenantProfilePage() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254712345678',
    unit: '304',
    emergencyContact: '+254723456789',
    emergencyName: 'Jane Doe',
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout role="tenant">
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Home className="w-4 h-4 inline mr-2" />
                Unit Number
              </label>
              <input
                type="text"
                value={profile.unit}
                disabled
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Emergency Contact</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={profile.emergencyName}
                    onChange={(e) => setProfile({ ...profile, emergencyName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profile.emergencyContact}
                    onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
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
      </div>
    </DashboardLayout>
  );
}


