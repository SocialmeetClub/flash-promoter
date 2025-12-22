import React, { useState } from 'react';
import { Promo, Venue } from '../types';
import { Timer, Send, Coins, Beer, Radio, Plus, Edit3, Save, Trash2 } from 'lucide-react';

interface PromoManagerProps {
  venues: Venue[];
  initialPromos: Promo[];
  activeVenueId: string | null;
  onNavigateToSim: (promo: Promo) => void;
}

export const PromoManager: React.FC<PromoManagerProps> = ({ venues, initialPromos, activeVenueId, onNavigateToSim }) => {
  const [promos, setPromos] = useState<Promo[]>(initialPromos);
  const [activeVenue, setActiveVenue] = useState<string>(activeVenueId || venues[0].id);

  const togglePromo = (id: string) => {
    setPromos(prev => prev.map(p => {
        if (p.id === id) {
            const newState = !p.active;
            if (newState) {
                // Execute logic
                onNavigateToSim(p);
            }
            return { ...p, active: newState };
        }
        return p;
    }));
  };

  const updatePromoDetails = (id: string, field: 'title' | 'description', value: string) => {
    setPromos(prev => prev.map(p => {
        if (p.id === id) {
            return { ...p, [field]: value };
        }
        return p;
    }));
  };

  const handleDeletePromo = (id: string) => {
    setPromos(prev => prev.filter(p => p.id !== id));
  };

  const handleAddPromo = () => {
      const newPromo: Promo = {
          id: Date.now().toString(),
          title: 'Flash Hour: First Names "S"',
          description: '1 Free Drink for anyone with a name starting with S.',
          durationMinutes: 30,
          active: false,
          type: 'FREE_ITEM',
          targetAudience: 'Names starting with S',
      };
      setPromos([...promos, newPromo]);
  };

  const getVenueName = (id: string) => venues.find(v => v.id === id)?.name || 'Unknown Venue';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn pb-10">
      {/* Context Panel */}
      <div className="bg-cyber-slate border border-gray-700 p-8 shadow-2xl relative rounded-sm">
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyber-cyan opacity-50 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyber-cyan opacity-50 rounded-bl-xl"></div>

        <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-white uppercase tracking-wider">
            <Send className="text-cyber-cyan" size={32} />
            Flash Promo Dispatch
        </h2>
        <p className="text-white mb-8 text-lg leading-relaxed">
          > Initiating crowd control protocols via limited-time offers
        </p>

        <div className="p-6 border border-cyber-cyan rounded-sm bg-black/40 mb-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-cyber-cyan"></div>
             <h3 className="text-xl font-black text-white uppercase flex items-center gap-2 mb-4">
                <Send size={20} className="text-cyber-cyan" />
                Flash Transmitter
             </h3>
             <p className="text-sm text-gray-200 mb-6 font-medium">
                Deploy real-time offers to <span className="text-cyber-cyan font-bold">"TheFunFanReporter"</span> app users near <span className="font-bold text-white border-b border-cyber-cyan">{getVenueName(activeVenue)}</span>.
             </p>

            <div className="space-y-2">
                <label className="block text-[10px] font-mono font-bold text-cyber-cyan uppercase tracking-widest">Target Venue Selection</label>
                <select 
                    value={activeVenue} 
                    onChange={(e) => setActiveVenue(e.target.value)}
                    className="w-full bg-black border border-gray-600 rounded-sm p-3 text-white text-base focus:ring-1 focus:ring-cyber-cyan focus:border-cyber-cyan font-mono outline-none transition-shadow"
                >
                    {venues.map(v => (
                        <option key={v.id} value={v.id}>{v.name} [Load: {Math.round((v.currentOccupancy/v.capacity)*100)}%]</option>
                    ))}
                </select>
            </div>
        </div>

        <div className="mt-8 p-6 bg-black/40 border border-cyber-pink/30 rounded-sm relative overflow-hidden">
             <div className="absolute inset-0 bg-cyber-pink/5 animate-pulse-fast"></div>
            <h4 className="font-bold text-cyber-pink mb-4 uppercase tracking-widest text-sm font-mono flex items-center gap-2">
                <Radio className="animate-pulse" size={16} />
                AI Strategy Suggestion
            </h4>
            {venues.find(v => v.id === activeVenue)?.status === 'At Capacity' ? (
                <div className="flex items-start gap-4 text-white relative z-10">
                    <Coins size={32} className="text-cyber-yellow mt-1 shrink-0" />
                    <div>
                        <p className="font-bold text-xl text-cyber-yellow mb-1">Status: CRITICAL DENSITY</p>
                        <p className="text-base text-gray-200">Action: Monetize Access. Release 5 "Fast-Pass" spots for <span className="text-white font-bold">1 Meritocracy Coin</span> each.</p>
                        <p className="text-xs font-mono text-gray-200 mt-2">Est. Revenue: 5 MC</p>
                    </div>
                </div>
            ) : (
                <div className="flex items-start gap-4 text-white relative z-10">
                    <Beer size={32} className="text-cyber-cyan mt-1 shrink-0" />
                    <div>
                        <p className="font-bold text-xl text-cyber-cyan mb-1">Status: LOW TRAFFIC</p>
                        <p className="text-base text-gray-200">Action: Boost Traffic. Trigger "Happy Hour" for next 30 mins to fill <span className="text-white font-bold">{venues.find(v => v.id === activeVenue)?.capacity! - venues.find(v => v.id === activeVenue)?.currentOccupancy!}</span> spots.</p>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Promos List */}
      <div className="space-y-6">
        <div className="flex justify-end">
            <button 
                onClick={handleAddPromo}
                className="text-cyber-cyan hover:text-white flex items-center gap-2 text-sm font-bold uppercase border border-cyber-cyan px-4 py-2 hover:bg-cyber-cyan hover:text-black transition-colors rounded-sm"
            >
                <Plus size={16} /> Add Promo
            </button>
        </div>
        
        {promos.map((promo) => (
          <div 
            key={promo.id} 
            className={`border-2 p-6 transition-all duration-300 relative group rounded-sm ${
                promo.active 
                ? 'bg-cyber-cyan/5 border-cyber-cyan shadow-neon-cyan' 
                : 'bg-cyber-slate border-gray-700 hover:border-gray-500'
            }`}
          >
            {promo.active && <div className="absolute top-0 right-0 px-3 py-1 bg-cyber-cyan text-black font-bold text-xs uppercase tracking-widest">Broadcasting</div>}
            
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4 sm:gap-0">
                <div className="flex-1 w-full mr-4">
                    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2 ${promo.active ? 'text-cyber-cyan' : 'text-white'}`}>
                        <div className="hidden sm:block">
                            {promo.type === 'DISCOUNT' && <Beer size={24} className="shrink-0" />}
                            {promo.type === 'FREE_ITEM' && <Beer size={24} className="shrink-0" />}
                            {promo.type === 'ACCESS' && <Coins size={24} className="shrink-0" />}
                        </div>
                        
                        {/* Editable Title */}
                        <div className="w-full space-y-2">
                            <input 
                                type="text"
                                value={promo.title}
                                onChange={(e) => updatePromoDetails(promo.id, 'title', e.target.value)}
                                className={`w-full bg-transparent border-b border-transparent hover:border-gray-600 focus:border-cyber-cyan outline-none text-xl font-black uppercase tracking-wide placeholder-gray-400 ${promo.active ? 'text-cyber-cyan' : 'text-white'}`}
                                placeholder="PROMO TITLE"
                            />
                             <div className="flex gap-4 sm:gap-2 justify-end sm:justify-start">
                                <button className="flex items-center gap-1 text-xs font-bold text-cyber-cyan hover:text-white cursor-pointer uppercase tracking-wider">
                                    <Edit3 size={14} /> Edit
                                </button>
                                <button className="flex items-center gap-1 text-xs font-bold text-green-500 hover:text-white cursor-pointer uppercase tracking-wider">
                                    <Save size={14} /> Save
                                </button>
                                <button onClick={() => handleDeletePromo(promo.id)} className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-red-500 cursor-pointer transition-colors uppercase tracking-wider">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Editable Description */}
                    <div className="relative mt-2">
                        <textarea 
                            value={promo.description}
                            onChange={(e) => updatePromoDetails(promo.id, 'description', e.target.value)}
                            className="w-full bg-transparent border border-gray-700 hover:border-gray-500 focus:border-cyber-cyan outline-none text-white text-base resize-none p-2 rounded-sm"
                            rows={2}
                            placeholder="Promo description..."
                        />
                    </div>
                </div>
                <div className="bg-black border border-gray-600 px-4 py-2 text-sm font-mono text-cyber-cyan flex items-center gap-2 shrink-0 rounded-sm self-start sm:self-auto">
                    <Timer size={16} />
                    {promo.durationMinutes}m
                </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                <span className={`text-sm font-mono uppercase tracking-widest ${promo.active ? 'text-cyber-cyan animate-pulse' : 'text-gray-200'}`}>
                    {promo.active ? '>>> SIGNAL ACTIVE' : '>>> STANDBY'}
                </span>
                <button
                    onClick={() => togglePromo(promo.id)}
                    className={`w-full sm:w-auto px-8 py-3 font-bold text-sm uppercase tracking-widest transition-all duration-200 shadow-lg transform active:scale-95 rounded-sm ${
                        promo.active 
                        ? 'bg-cyber-pink hover:bg-pink-600 text-black shadow-neon-pink' 
                        : 'bg-gray-800 hover:bg-cyber-cyan hover:text-black text-white border border-gray-600 hover:border-cyber-cyan'
                    }`}
                >
                    {promo.active ? 'ABORT SIGNAL' : 'EXECUTE'}
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};