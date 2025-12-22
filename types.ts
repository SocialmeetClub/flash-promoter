export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentOccupancy: number;
  queueLength: number;
  status: 'Open' | 'Closed' | 'At Capacity';
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  active: boolean;
  type: 'DISCOUNT' | 'FREE_ITEM' | 'ACCESS';
  targetAudience?: string; 
}

export interface FanReport {
  id: string;
  venueId: string;
  type: 'MAINTENANCE' | 'VIBE' | 'CROWD';
  description: string;
  timestamp: Date;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface Reservation {
  id: string;
  customerName: string;
  meritCoinsPaid: number;
  status: 'CONFIRMED' | 'PENDING';
  expiresAt: Date;
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  ADD_VENUE = 'ADD_VENUE',
  PROMOS = 'PROMOS',
  ROVO_AGENT = 'ROVO_AGENT',
  SIMULATION = 'SIMULATION',
  INTERNAL_CHAT = 'INTERNAL_CHAT'
}