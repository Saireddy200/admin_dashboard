'use client';

import React, { useState } from 'react';

export default function Header({ activeRole, setActiveRole }) {
  const roles = ['Super Admin', 'Retailer', 'Vendor Manager', 'Product Ops', 'Support'];

  return (
    <>
      {/* Logo Section */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Fameo</h1>
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
              Products Admin
            </span>
          </div>

          {/* Right Section - Alerts & Access Matrix */}
          <div className="flex items-center gap-4">
            {/* Alerts Badge */}
            <div className="relative">
              <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                <span>🔔</span>
                <span>4 alerts</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {/* Access Matrix Button */}
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Access matrix
            </button>
          </div>
        </div>
      </div>

      {/* Top Menu Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-8 py-4">
          {/* Left Section - Role Buttons */}
          <div className="flex items-center gap-2">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeRole === role
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
