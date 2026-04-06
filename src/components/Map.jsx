import React from 'react';
import { locations, getLocation } from '../data/locations';

export default function Map({ fromId, toId, tripActive }) {
  const fromLoc = getLocation(fromId);
  const toLoc = getLocation(toId);

  return (
    <div className="relative w-full h-[350px] bg-surface rounded-xl border border-surface-lighter overflow-hidden">
      {/* Map background with grid */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Background */}
        <rect width="100" height="100" fill="#141428" />

        {/* Grid lines */}
        {[...Array(11)].map((_, i) => (
          <React.Fragment key={i}>
            <line
              x1={i * 10}
              y1="0"
              x2={i * 10}
              y2="100"
              stroke="#1e1e3a"
              strokeWidth="0.3"
            />
            <line
              x1="0"
              y1={i * 10}
              x2="100"
              y2={i * 10}
              stroke="#1e1e3a"
              strokeWidth="0.3"
            />
          </React.Fragment>
        ))}

        {/* Texas outline (simplified) */}
        <path
          d="M 25,8 L 65,8 L 68,12 L 70,18 L 72,25 L 73,35 L 72,45 L 70,55 L 68,65 L 65,75 L 60,82 L 55,88 L 48,92 L 40,95 L 32,92 L 28,85 L 25,78 L 22,70 L 20,60 L 18,50 L 18,40 L 19,30 L 20,20 L 22,12 Z"
          fill="#1a1a35"
          stroke="#915EFF"
          strokeWidth="0.5"
          opacity="0.6"
        />

        {/* Road lines between all locations */}
        {locations.map((loc1, i) =>
          locations.slice(i + 1).map((loc2) => (
            <line
              key={`${loc1.id}-${loc2.id}`}
              x1={loc1.coords.x}
              y1={loc1.coords.y}
              x2={loc2.coords.x}
              y2={loc2.coords.y}
              stroke="#2a2a4a"
              strokeWidth="0.4"
              strokeDasharray="1,1"
            />
          ))
        )}

        {/* Active route */}
        {fromLoc && toLoc && fromId !== toId && (
          <line
            x1={fromLoc.coords.x}
            y1={fromLoc.coords.y}
            x2={toLoc.coords.x}
            y2={toLoc.coords.y}
            stroke="#915EFF"
            strokeWidth="1"
            strokeLinecap="round"
          >
            {tripActive && (
              <animate
                attributeName="stroke-dasharray"
                values="0,3,3,0;3,0,0,3"
                dur="1s"
                repeatCount="indefinite"
              />
            )}
          </line>
        )}

        {/* Location pins */}
        {locations.map((loc) => {
          const isFrom = fromId === loc.id;
          const isTo = toId === loc.id;
          const isActive = isFrom || isTo;

          return (
            <g key={loc.id}>
              {/* Pulse ring for active locations */}
              {isActive && (
                <circle
                  cx={loc.coords.x}
                  cy={loc.coords.y}
                  r="3"
                  fill="none"
                  stroke="#915EFF"
                  strokeWidth="0.3"
                  opacity="0.6"
                >
                  <animate
                    attributeName="r"
                    values="2;5"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Pin dot */}
              <circle
                cx={loc.coords.x}
                cy={loc.coords.y}
                r={isActive ? 2.2 : 1.5}
                fill={isFrom ? '#915EFF' : isTo ? '#22d3ee' : '#64748b'}
                stroke={isActive ? '#fff' : '#94a3b8'}
                strokeWidth={isActive ? 0.5 : 0.3}
              />

              {/* Label */}
              <text
                x={loc.coords.x}
                y={loc.coords.y - 4}
                textAnchor="middle"
                fill={isActive ? '#e2e8f0' : '#94a3b8'}
                fontSize="2.5"
                fontWeight={isActive ? 'bold' : 'normal'}
              >
                {loc.city}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Map label overlay */}
      <div className="absolute top-3 left-3 bg-surface/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-surface-lighter">
        <span className="text-xs text-gray-400 font-medium">
          Central Texas Region
        </span>
      </div>

      {/* Trip active indicator */}
      {tripActive && (
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-primary/30">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <span className="text-xs text-primary-light font-medium">
            Trip in Progress
          </span>
        </div>
      )}
    </div>
  );
}
