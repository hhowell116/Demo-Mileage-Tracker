import React from 'react';
import { getLocation } from '../data/locations';

export default function TripHistory({ trips }) {
  const totalMiles = trips.reduce((sum, t) => sum + t.distance, 0);

  return (
    <div className="bg-surface rounded-xl border border-surface-lighter p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Trip History</h2>
        <div className="text-sm text-gray-400">
          Total:{' '}
          <span className="text-primary font-bold">{totalMiles} mi</span>
          {' / '}
          <span className="text-white">{trips.length} trips</span>
        </div>
      </div>

      {trips.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-8">
          No trips recorded yet. Start a trip above.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-lighter">
                <th className="text-left py-2.5 px-3 text-gray-400 font-medium">
                  Date
                </th>
                <th className="text-left py-2.5 px-3 text-gray-400 font-medium">
                  From
                </th>
                <th className="text-left py-2.5 px-3 text-gray-400 font-medium">
                  To
                </th>
                <th className="text-right py-2.5 px-3 text-gray-400 font-medium">
                  Distance
                </th>
                <th className="text-center py-2.5 px-3 text-gray-400 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[...trips].reverse().map((trip) => {
                const from = getLocation(trip.fromId);
                const to = getLocation(trip.toId);
                return (
                  <tr
                    key={trip.id}
                    className="border-b border-surface-lighter/50 hover:bg-surface-lighter/30 transition-colors"
                  >
                    <td className="py-2.5 px-3 text-gray-300">{trip.date}</td>
                    <td className="py-2.5 px-3 text-gray-300">
                      {from?.city || trip.fromId}
                    </td>
                    <td className="py-2.5 px-3 text-gray-300">
                      {to?.city || trip.toId}
                    </td>
                    <td className="py-2.5 px-3 text-right text-white font-medium">
                      {trip.distance} mi
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          trip.status === 'Completed'
                            ? 'bg-green-500/15 text-green-400'
                            : 'bg-yellow-500/15 text-yellow-400'
                        }`}
                      >
                        {trip.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
