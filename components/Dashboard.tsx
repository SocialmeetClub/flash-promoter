import React from 'react';
import { Venue } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Users, AlertTriangle, Zap, Activity, MapPin, UserPlus, UserMinus, Signal } from 'lucide-react';

interface DashboardProps {
  venues: Venue[];
  onTriggerPromo: (venueId: string) => void;
  onUpdateOccupancy: (venueId: string, change: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ venues, onTriggerPromo, onUpdateOccupancy }) => {
  const data = venues.map(v => ({
    name: v.name,
    Occupancy: v.currentOccupancy,
    Capacity: v.capacity,
    Queue: v.queueLength
  }));

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-cyber-slate border border-gray-700 p-6 lg:p-8 shadow-xl relative overflow-hidden group hover:border-cyber-cyan/50 transition-all duration-300 hover:shadow-neon-cyan flex flex-col justify-between rounded-sm">
            {/* Background Tech Elements */}
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
               <Activity size={120} className="text-cyber-cyan" />
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
                <div className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-black text-white tracking-wide uppercase italic leading-tight max-w-[70%]">{venue.name}</h3>
                        <span className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider border shrink-0 ${
                        venue.status === 'At Capacity' 
                            ? 'text-cyber-pink border-cyber-pink bg-cyber-pink/10 shadow-neon-pink' 
                            : 'text-cyber-cyan border-cyber-cyan bg-cyber-cyan/10 shadow-neon-cyan'
                        }`}>
                        {venue.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200 text-sm font-mono">
                        <MapPin size={14} className="text-cyber-cyan" />
                        {venue.location}
                    </div>
                </div>
                
                <div className="flex justify-between items-end mb-2">
                    <p className="text-gray-200 font-mono text-xs uppercase tracking-widest font-bold">Occupancy Level</p>
                    <p className="text-4xl font-mono font-bold text-white tracking-tighter shadow-black drop-shadow-lg">
                        {Math.round((venue.currentOccupancy / venue.capacity) * 100)}<span className="text-xl text-gray-200">%</span>
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-800 h-4 border border-gray-600 mb-6 relative rounded-sm overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 relative ${
                        venue.currentOccupancy >= venue.capacity ? 'bg-cyber-pink shadow-neon-pink' : 'bg-cyber-cyan shadow-neon-cyan'
                        }`}
                        style={{ width: `${Math.min((venue.currentOccupancy / venue.capacity) * 100, 100)}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20" style={{backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem'}}></div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-base text-white mb-6 font-mono bg-black/40 p-2 rounded border border-gray-700">
                    <div className="flex items-center gap-3">
                        <Users size={18} className="text-cyber-cyan" />
                        <span className="font-bold">{venue.currentOccupancy} <span className="text-gray-400">/</span> {venue.capacity}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <AlertTriangle size={18} className={venue.queueLength > 10 ? 'text-cyber-yellow animate-pulse' : 'text-gray-200'} />
                        <span className={`font-bold ${venue.queueLength > 10 ? 'text-cyber-yellow' : 'text-white'}`}>Queue: {venue.queueLength}</span>
                    </div>
                </div>

                {/* Real-time Door Controls */}
                <div className="bg-black/60 border border-gray-700 p-3 mb-6 flex items-center justify-between rounded shadow-inner">
                    <span className="text-cyber-cyan font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                         <Signal size={12} className="animate-pulse" /> Door Control
                    </span>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => onUpdateOccupancy(venue.id, -1)}
                            className="bg-gray-800 hover:bg-red-900/40 text-white border border-gray-600 hover:border-red-500 px-3 py-1.5 rounded text-sm font-mono font-bold transition-colors flex items-center gap-1 focus:outline-none focus:ring-1 focus:ring-red-500"
                            title="Remove 1 Person"
                        >
                            <UserMinus size={14} />
                        </button>
                        <button 
                            onClick={() => onUpdateOccupancy(venue.id, 1)}
                            className="bg-gray-800 hover:bg-green-900/40 text-white border border-gray-600 hover:border-green-500 px-3 py-1.5 rounded text-sm font-mono font-bold transition-colors flex items-center gap-1 focus:outline-none focus:ring-1 focus:ring-green-500"
                            title="Add 1 Person"
                        >
                            <UserPlus size={14} />
                        </button>
                         <button 
                            onClick={() => onUpdateOccupancy(venue.id, 5)}
                            className="bg-gray-800 hover:bg-green-900/40 text-white border border-gray-600 hover:border-green-500 px-3 py-1.5 rounded text-sm font-mono font-bold transition-colors focus:outline-none focus:ring-1 focus:ring-green-500"
                            title="Add Group of 5"
                        >
                            +5
                        </button>
                    </div>
                </div>

                <button 
                onClick={() => onTriggerPromo(venue.id)}
                className="w-full bg-transparent border-2 border-cyber-cyan text-cyber-cyan font-bold py-3 px-4 uppercase tracking-widest hover:bg-cyber-cyan hover:text-black transition-all duration-200 flex items-center justify-center gap-3 group-hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] text-sm md:text-base rounded-sm"
                >
                <Zap size={20} className="fill-current" />
                Initiate Flash Action
                </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-cyber-slate border border-gray-800 p-8 shadow-2xl relative rounded-sm">
        <div className="absolute top-0 left-0 w-1 h-full bg-cyber-cyan"></div>
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3 border-b border-gray-800 pb-4">
            <Activity className="text-cyber-pink" />
            Live Crowd Telemetry
        </h3>
        <div className="h-96 w-full font-mono text-sm">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#666" 
                tick={{fill: '#e5e7eb', fontSize: 12}} 
                axisLine={false} 
                tickLine={false} 
                dy={10} 
              />
              <YAxis 
                stroke="#666" 
                tick={{fill: '#e5e7eb', fontSize: 12}} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', color: '#fff', fontFamily: 'monospace' }}
              />
              <Legend wrapperStyle={{paddingTop: '30px'}} iconType="rect" />
              <Bar dataKey="Occupancy" name="Current Occupancy" fill="#00f3ff" radius={[2, 2, 0, 0]} barSize={40}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.Occupancy >= entry.Capacity ? '#ff00ff' : '#00f3ff'} />
                ))}
              </Bar>
              <Bar dataKey="Queue" name="Waitlist Queue" fill="#ffee00" radius={[2, 2, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};