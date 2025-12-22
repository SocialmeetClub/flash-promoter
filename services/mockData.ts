import { Venue, Promo, FanReport } from '../types';

export const MOCK_VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'The Turbo Paddock',
    location: 'San Francisco',
    capacity: 200,
    currentOccupancy: 45,
    queueLength: 0,
    status: 'Open',
  },
  {
    id: 'v2',
    name: 'Pit Stop Pub',
    location: 'Santa Clara - Sunnyvale',
    capacity: 150,
    currentOccupancy: 150,
    queueLength: 25,
    status: 'At Capacity',
  },
  {
    id: 'v3',
    name: 'Apex Club',
    location: 'San Jose',
    capacity: 300,
    currentOccupancy: 210,
    queueLength: 10,
    status: 'Open',
  },
];

export const MOCK_REPORTS: FanReport[] = [
  {
    id: 'r1',
    venueId: 'v2',
    type: 'MAINTENANCE',
    description: 'Restroom sink 2 is leaking water everywhere.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    severity: 'HIGH',
  },
  {
    id: 'r2',
    venueId: 'v1',
    type: 'VIBE',
    description: 'Music is too quiet, needs more energy!',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    severity: 'LOW',
  },
];

export const INITIAL_PROMOS: Promo[] = [
  {
    id: 'p1',
    title: 'Flash Hour: First Names "M"',
    description: '1 Free Drink for anyone with a name starting with M.',
    durationMinutes: 30,
    active: false,
    type: 'FREE_ITEM',
    targetAudience: 'Names starting with M',
  },
  {
    id: 'p2',
    title: 'Meritocracy Spot Release',
    description: 'Skip the line! 5 Spots available for 1 Meritocracy Coin.',
    durationMinutes: 15,
    active: false,
    type: 'ACCESS',
  },
  {
    id: 'p3',
    title: 'Launch Party VIP Access',
    description: 'Exclusive entry to the Williams Motorhome.',
    durationMinutes: 60,
    active: false,
    type: 'ACCESS',
    targetAudience: 'VIPs Only',
  },
];