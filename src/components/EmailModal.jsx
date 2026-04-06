import React, { useState } from 'react';
import { getLocation } from '../data/locations';

export default function EmailModal({ trips, onClose }) {
  const [sent, setSent] = useState(false);
  const totalMiles = trips.reduce((sum, t) => sum + t.distance, 0);
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface border border-surface-lighter rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-lighter">
          <h3 className="text-lg font-semibold text-white">
            Mileage Report Preview
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Email preview */}
        <div className="px-6 py-4 space-y-3">
          <div className="flex gap-2 text-sm">
            <span className="text-gray-400 w-16 shrink-0">To:</span>
            <span className="text-gray-200">
              management@rowecasaorganics.com
            </span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-gray-400 w-16 shrink-0">Subject:</span>
            <span className="text-gray-200">
              Mileage Report - Hayden Howell - {today}
            </span>
          </div>

          <div className="border-t border-surface-lighter pt-3 mt-3">
            <div className="bg-surface-lighter/50 rounded-lg p-4 text-sm text-gray-300 space-y-3">
              <p>Hi Team,</p>
              <p>
                Please find below my mileage report summary for the current
                period.
              </p>

              <div className="border border-surface-lighter rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-surface-lighter">
                      <th className="text-left py-2 px-3 text-gray-400">
                        Date
                      </th>
                      <th className="text-left py-2 px-3 text-gray-400">
                        Route
                      </th>
                      <th className="text-right py-2 px-3 text-gray-400">
                        Miles
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {trips.map((trip) => (
                      <tr
                        key={trip.id}
                        className="border-t border-surface-lighter/50"
                      >
                        <td className="py-1.5 px-3">{trip.date}</td>
                        <td className="py-1.5 px-3">
                          {getLocation(trip.fromId)?.city} &rarr;{' '}
                          {getLocation(trip.toId)?.city}
                        </td>
                        <td className="py-1.5 px-3 text-right">
                          {trip.distance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-surface-lighter bg-surface-lighter/50">
                      <td
                        colSpan={2}
                        className="py-2 px-3 font-semibold text-white"
                      >
                        Total Mileage
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-primary">
                        {totalMiles} mi
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <p>Best regards,</p>
              <p>Hayden Howell</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-surface-lighter flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Demo mode - no email will be sent
          </span>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={sent}
              className="px-5 py-2 bg-primary hover:bg-primary-light text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-60"
            >
              {sent ? 'Demo: Email would be sent' : 'Send Report'}
            </button>
          </div>
        </div>

        {/* Sent toast */}
        {sent && (
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Demo: Email would be sent
          </div>
        )}
      </div>
    </div>
  );
}
