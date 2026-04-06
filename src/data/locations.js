export const locations = [
  {
    id: 'waco',
    name: 'RCO Headquarters',
    city: 'Waco, TX',
    label: 'RCO Headquarters - Waco, TX',
    coords: { x: 52, y: 55 },
  },
  {
    id: 'temple',
    name: 'RCO Warehouse',
    city: 'Temple, TX',
    label: 'RCO Warehouse - Temple, TX',
    coords: { x: 50, y: 65 },
  },
  {
    id: 'dallas',
    name: 'RCO Distribution',
    city: 'Dallas, TX',
    label: 'RCO Distribution - Dallas, TX',
    coords: { x: 58, y: 25 },
  },
  {
    id: 'austin',
    name: 'RCO Office',
    city: 'Austin, TX',
    label: 'RCO Office - Austin, TX',
    coords: { x: 42, y: 80 },
  },
];

// Distance matrix in miles (symmetric)
const distanceMap = {
  'waco-temple': 37,
  'waco-dallas': 96,
  'waco-austin': 102,
  'temple-dallas': 133,
  'temple-austin': 68,
  'dallas-austin': 195,
};

export function getDistance(fromId, toId) {
  if (fromId === toId) return 0;
  const key1 = `${fromId}-${toId}`;
  const key2 = `${toId}-${fromId}`;
  return distanceMap[key1] || distanceMap[key2] || 0;
}

export function getLocation(id) {
  return locations.find((loc) => loc.id === id);
}

// Pre-populated sample trips
export const sampleTrips = [
  {
    id: '1',
    date: '2026-04-03',
    fromId: 'waco',
    toId: 'dallas',
    distance: 96,
    status: 'Completed',
  },
  {
    id: '2',
    date: '2026-04-04',
    fromId: 'temple',
    toId: 'austin',
    distance: 68,
    status: 'Completed',
  },
  {
    id: '3',
    date: '2026-04-05',
    fromId: 'dallas',
    toId: 'waco',
    distance: 96,
    status: 'Completed',
  },
  {
    id: '4',
    date: '2026-04-05',
    fromId: 'waco',
    toId: 'temple',
    distance: 37,
    status: 'Completed',
  },
];
