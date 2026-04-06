import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import TripControls from './components/TripControls';
import TripHistory from './components/TripHistory';
import EmailModal from './components/EmailModal';
import { getDistance, sampleTrips } from './data/locations';

const STORAGE_KEY = 'rco-mileage-trips';

function loadTrips() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return sampleTrips;
}

function saveTrips(trips) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  } catch {}
}

export default function App() {
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [tripActive, setTripActive] = useState(false);
  const [trips, setTrips] = useState(loadTrips);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    saveTrips(trips);
  }, [trips]);

  const handleStartTrip = () => {
    if (fromId && toId && fromId !== toId) {
      setTripActive(true);
    }
  };

  const handleEndTrip = () => {
    const distance = getDistance(fromId, toId);
    const today = new Date().toISOString().split('T')[0];
    const newTrip = {
      id: Date.now().toString(),
      date: today,
      fromId,
      toId,
      distance,
      status: 'Completed',
    };
    setTrips((prev) => [...prev, newTrip]);
    setTripActive(false);
    setFromId('');
    setToId('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Demo banner */}
      <div className="bg-primary/20 border-b border-primary/30">
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary-light tracking-wide">
            DEMO MODE &mdash; Using mock data, no real tracking or APIs
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-surface-lighter bg-surface/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                RCO Mileage Tracker
              </h1>
              <p className="text-xs text-gray-500">
                Rowe Casa Organics &mdash; Employee Mileage Logging
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowEmail(true)}
            className="bg-surface-lighter hover:bg-surface-lighter/80 border border-surface-lighter hover:border-primary/40 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Send Report
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Top row: Map + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Map fromId={fromId} toId={toId} tripActive={tripActive} />
          </div>
          <div>
            <TripControls
              fromId={fromId}
              setFromId={setFromId}
              toId={toId}
              setToId={setToId}
              tripActive={tripActive}
              onStartTrip={handleStartTrip}
              onEndTrip={handleEndTrip}
            />
          </div>
        </div>

        {/* Trip history */}
        <TripHistory trips={trips} />
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-lighter mt-12">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-xs text-gray-600">
          RCO Mileage Tracker Demo &mdash; Built for Rowe Casa Organics
        </div>
      </footer>

      {/* Email Modal */}
      {showEmail && (
        <EmailModal trips={trips} onClose={() => setShowEmail(false)} />
      )}
    </div>
  );
}
