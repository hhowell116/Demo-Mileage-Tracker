import React from 'react';
import { locations, getDistance, getLocation } from '../data/locations';

export default function TripControls({
  fromId,
  setFromId,
  toId,
  setToId,
  tripActive,
  onStartTrip,
  onEndTrip,
}) {
  const distance = getDistance(fromId, toId);
  const canStart = fromId && toId && fromId !== toId && !tripActive;

  return (
    <div className="bg-surface rounded-xl border border-surface-lighter p-5">
      <h2 className="text-lg font-semibold mb-4 text-white">Trip Controls</h2>

      <div className="space-y-4">
        {/* Start Location */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">
            Start Location
          </label>
          <select
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
            disabled={tripActive}
            className="w-full bg-surface-lighter border border-surface-lighter rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select start location...</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.label}
              </option>
            ))}
          </select>
        </div>

        {/* End Location */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">
            End Location
          </label>
          <select
            value={toId}
            onChange={(e) => setToId(e.target.value)}
            disabled={tripActive}
            className="w-full bg-surface-lighter border border-surface-lighter rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select end location...</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.label}
              </option>
            ))}
          </select>
        </div>

        {/* Distance preview */}
        {fromId && toId && fromId !== toId && (
          <div className="bg-surface-lighter/50 rounded-lg px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-400">Estimated Distance</span>
            <span className="text-lg font-bold text-primary">
              {distance} mi
            </span>
          </div>
        )}

        {fromId && toId && fromId === toId && (
          <p className="text-sm text-yellow-400/80 px-1">
            Start and end locations must be different.
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-1">
          {!tripActive ? (
            <button
              onClick={onStartTrip}
              disabled={!canStart}
              className="flex-1 bg-primary hover:bg-primary-light text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary"
            >
              Start Trip
            </button>
          ) : (
            <button
              onClick={onEndTrip}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
            >
              End Trip
            </button>
          )}
        </div>

        {tripActive && (
          <div className="flex items-center gap-2 text-sm text-primary-light bg-primary/10 rounded-lg px-4 py-2.5">
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>
              Trip in progress &mdash;{' '}
              {getLocation(fromId)?.city} to {getLocation(toId)?.city}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
