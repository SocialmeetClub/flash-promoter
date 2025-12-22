import React, { useState } from 'react';
import { Plus, Trash2, Save, MapPin, Edit3 } from 'lucide-react';

export const AddVenueForm: React.FC = () => {
  const [presets, setPresets] = useState([
    { id: '1', title: 'Flash Hour: First Names "M"', description: '1 Free Drink for anyone with a name starting with M.', duration: 30 },
    { id: '2', title: 'Meritocracy Spot Release', description: 'Skip the line! 5 Spots available for 1 Meritocracy Coin.', duration: 15 }
  ]);

  const handleAddPromo = () => {
    const newPromo = {
        id: Date.now().toString(),
        title: 'Flash Hour: First Names "S"',
        description: '1 Free Drink for anyone with a name starting with S.',
        duration: 30
    };
    setPresets([...presets, newPromo]);
  };

  const removePromo = (id: string) => {
    setPresets(presets.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn pb-12">
      <div className="bg-cyber-slate border border-gray-700 p-0 shadow-2xl relative rounded-sm overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-black/50 border-b border-cyber-cyan/30 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
                <span className="text-cyber-cyan text-3xl">+</span> Add New Partner Venue
            </h2>
             <button 
                onClick={handleAddPromo}
                className="text-cyber-cyan hover:text-white flex items-center gap-2 text-xs font-bold uppercase border border-cyber-cyan px-3 py-2 hover:bg-cyber-cyan hover:text-black transition-colors rounded-sm shadow-neon-cyan"
            >
                <Plus size={14} /> Add Promo
            </button>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column: Details */}
            <div className="space-y-8">
                <div>
                    <label className="block text-cyber-cyan font-mono text-xs uppercase tracking-widest mb-3 font-bold">Venue Name</label>
                    <input type="text" placeholder="e.g. The Turbo Paddock" className="w-full bg-black border border-gray-600 p-4 text-white focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan outline-none font-mono rounded-sm transition-all text-lg placeholder-gray-400" />
                </div>
                
                <div>
                    <label className="block text-cyber-cyan font-mono text-xs uppercase tracking-widest mb-3 font-bold">Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-4 text-gray-200" size={20} />
                        <input type="text" placeholder="e.g. San Francisco" className="w-full bg-black border border-gray-600 p-4 pl-12 text-white focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan outline-none font-mono rounded-sm transition-all text-lg placeholder-gray-400" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-white font-mono text-xs uppercase tracking-widest mb-2 font-bold">Status</label>
                        <select className="w-full bg-black border border-gray-600 p-3 text-white focus:border-cyber-cyan outline-none font-mono rounded-sm text-sm">
                            <option>Open</option>
                            <option>Closed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-white font-mono text-xs uppercase tracking-widest mb-2 font-bold">Capacity</label>
                        <input type="number" defaultValue={200} className="w-full bg-black border border-gray-600 p-3 text-white focus:border-cyber-cyan outline-none font-mono rounded-sm text-sm" />
                    </div>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-white font-mono text-xs uppercase tracking-widest mb-2 font-bold">Current Occ.</label>
                        <input type="number" defaultValue={45} className="w-full bg-black border border-gray-600 p-3 text-white focus:border-cyber-cyan outline-none font-mono rounded-sm text-sm" />
                    </div>
                    <div>
                        <label className="block text-white font-mono text-xs uppercase tracking-widest mb-2 font-bold">Queue</label>
                        <input type="number" defaultValue={0} className="w-full bg-black border border-gray-600 p-3 text-white focus:border-cyber-cyan outline-none font-mono rounded-sm text-sm" />
                    </div>
                </div>

                 {/* Preview Card */}
                 <div className="mt-8 pt-8 border-t border-gray-700">
                    <p className="text-gray-200 text-xs font-mono uppercase mb-4 font-bold">Dashboard Preview</p>
                    <div className="bg-cyber-slate border border-gray-600 p-6 rounded-sm relative overflow-hidden">
                        <h3 className="text-xl font-black text-white italic uppercase mb-2">The Turbo Paddock</h3>
                         <span className="text-cyber-cyan border border-cyber-cyan bg-cyber-cyan/10 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">Open</span>
                         <div className="mt-4">
                             <p className="text-xs text-gray-200 font-mono uppercase font-bold">Occupancy Level</p>
                             <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-white">23%</span>
                                <span className="text-xs text-gray-200 mb-1">45 / 200</span>
                             </div>
                             <div className="w-full h-1 bg-gray-800 mt-2 rounded-full overflow-hidden">
                                 <div className="w-[23%] h-full bg-cyber-cyan"></div>
                             </div>
                             <div className="flex justify-between mt-2 text-[10px] text-gray-200 font-mono">
                                 <span>Queue: 0</span>
                             </div>
                         </div>
                         <div className="mt-4 pt-4 border-t border-gray-700">
                             <div className="text-cyber-cyan text-xs font-bold flex items-center gap-1">
                                 <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse"></span> INITIATE FLASH ACTION
                             </div>
                         </div>
                    </div>
                 </div>
            </div>

            {/* Right Column: Promos */}
            <div className="space-y-6">
                 <div className="mb-2">
                    <label className="block text-cyber-pink font-mono text-xs uppercase tracking-widest font-bold">Preset Promotions</label>
                </div>
                
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
                    {presets.map((preset) => (
                        <div key={preset.id} className="bg-black border border-gray-600 p-0 relative group animate-fadeIn rounded-sm overflow-hidden hover:border-gray-400 transition-colors">
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <input type="text" defaultValue={preset.title} className="w-[70%] bg-transparent border-none text-white font-bold text-sm focus:ring-0 outline-none placeholder-gray-400 p-0" />
                                    <div className="flex gap-2">
                                        <button className="text-cyber-cyan hover:text-white transition-colors"><Edit3 size={16} /></button>
                                        <button className="text-green-500 hover:text-white transition-colors"><Save size={16} /></button>
                                        <button 
                                            onClick={() => removePromo(preset.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <textarea defaultValue={preset.description} rows={2} className="w-full bg-gray-900/50 border border-gray-700 text-white text-xs p-2 rounded-sm resize-none outline-none focus:border-gray-500 mb-2" />
                                
                                <div className="flex items-center gap-2 bg-gray-900 w-fit px-2 py-1 rounded-sm border border-gray-700">
                                    <span className="text-gray-200 text-[10px] uppercase font-bold">DURATION:</span>
                                    <input type="number" defaultValue={preset.duration} className="w-8 bg-transparent text-white text-[10px] text-center outline-none font-mono" />
                                    <span className="text-gray-200 text-[10px]">min</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
        <div className="flex justify-end p-6 bg-black/50 border-t border-gray-800">
            <button className="bg-cyber-cyan text-black font-black uppercase tracking-widest px-8 py-3 hover:bg-white transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.3)] rounded-sm text-sm">
                <Save size={16} />
                Save Venue Profile
            </button>
        </div>
      </div>
    </div>
  );
};