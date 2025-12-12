// components/ui/StatCard.tsx
'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  title: string;
  label?: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  // keep strict union for common cases but allow other strings without TS error
  trend?: 'up' | 'down' | 'neutral' | string;
  valueClassName?: string;

  // ✅ Added subtitle support
  subtitle?: string;
}

/**
 * StatCard - simple, defensive stat card
 */
export function StatCard({
  title,
  label,
  value,
  change,
  icon: Icon,
  trend = 'neutral',
  valueClassName,
  subtitle, // ✅ Added
}: StatCardProps) {
  // map common trends to colours; any unknown value falls back to 'neutral'
  const mapTrend = (t: string) => {
    if (!t) return 'neutral';
    const lower = String(t).toLowerCase();
    if (lower === 'up') return 'up';
    if (lower === 'down') return 'down';
    return 'neutral';
  };

  const resolved = mapTrend(trend);

  const trendColors: Record<'up' | 'down' | 'neutral', string> = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };

  const arrow = resolved === 'up' ? '↑' : resolved === 'down' ? '↓' : '';

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>

          {/* ✅ NEW — subtitle line (optional) */}
          {subtitle && (
            <p className="text-xs text-gray-400 mb-1">{subtitle}</p>
          )}

          {label && <p className="text-xs text-gray-500 mb-2">{label}</p>}

          <p className={`text-2xl font-bold ${valueClassName || 'text-gray-900'} mt-1`}>
            {value}
          </p>

          {change && (
            <p className={`text-sm mt-2 ${trendColors[resolved]}`}>
              {arrow} {change}
            </p>
          )}
        </div>

        <div className="ml-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
