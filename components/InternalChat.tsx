import React, { useState } from 'react';
import { Shield, DollarSign, Briefcase, Megaphone, Terminal, Lock, MessageSquare, Bot, Trash2 } from 'lucide-react';

export const InternalChat: React.FC = () => {
  const roles = [
    { name: 'Admin 1 (God Mode)', role: 'ROOT ACCESS', icon: Lock, color: 'text-gray-200' },
    { name: 'Admin (Level 2+)', role: 'OPERATIONS', icon: Shield, color: 'text-red-400' },
    { name: 'Event Sponsor', role: 'FINANCIER', icon: DollarSign, color: 'text-yellow-400' },
    { name: 'Venue Owner', role: 'PROPERTY', icon: Briefcase, color: 'text-orange-400' },
    { name: 'Venue Manager', role: 'LOGISTICS', icon: Briefcase, color: 'text-orange-300' },
    { name: 'Venue Promoter', role: 'MARKETING', icon: Megaphone, color: 'text-orange-200' },
    { name: 'Dev Team', role: 'ENGINEERING', icon: Terminal, color: 'text-green-400' },
    { name: 'VIP AI AGENT', role: 'CONCIERGE', icon: Bot, color: 'text-cyber-pink' },
  ];

  const initialMessages = [
    { id: 1, user: 'Venue Owner', role: 'PROPERTY', text: 'Occupancy at Pit Stop Pub is critical. We need to clear the queue.', time: '10:42 PM' },
    { id: 2, user: 'Venue Manager', role: 'LOGISTICS', text: 'Security says we are holding at 150. Cannot admit more without clearing flow.', time: '10:43 PM' },
    { id: 3, user: 'Venue Promoter', role: 'MARKETING', text: 'I can trigger a Spot Release. 5 spots for 1 Meritocracy Coin each? Might relieve pressure.', time: '10:44 PM' },
    { id: 4, user: 'Event Sponsor', role: 'FINANCIER', text: 'Approved. It drives coin usage. Do it.', time: '10:45 PM' },
    { id: 5, user: 'Admin (Level 2+)', role: 'OPERATIONS', text: 'Monitoring situation. If density persists, I will override with a gate diversion alert.', time: '10:46 PM' },
    { id: 6, user: 'VIP AI AGENT', role: 'CONCIERGE', text: 'Analyzing traffic flow. Suggesting diversion to The Turbo Paddock (San Francisco) which has 23% load.', time: '10:46 PM' },
  ];

  const [chatMessages, setChatMessages] = useState(initialMessages);

  const handleDeleteMessage = (id: number) => {
    setChatMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <div className="flex h-[calc(100vh-200px)] min-h-[500px] border border-gray-700 bg-cyber-slate animate-fadeIn rounded-sm overflow-hidden">
      {/* Sidebar Roles */}
      <div className="w-80 border-r border-gray-700 bg-black/80 p-0 overflow-y-auto hidden lg:block">
        <div className="p-5 border-b border-gray-700 bg-gray-900 sticky top-0 z-10">
            <h3 className="text-white font-black uppercase tracking-widest text-base flex items-center gap-2">
                <Shield size={20} className="text-red-500" /> Secure Personnel
            </h3>
        </div>
        <div className="p-3 space-y-2">
            {roles.map((role, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded hover:bg-white/10 cursor-pointer group transition-colors border border-transparent hover:border-gray-600">
                    <div className={`p-2 rounded bg-gray-800 border border-gray-600 group-hover:border-gray-400 ${role.color}`}>
                        <role.icon size={20} />
                    </div>
                    <div>
                        <p className="text-base font-bold text-white tracking-wide">{role.name}</p>
                        <p className="text-xs font-mono text-gray-200 uppercase tracking-wider font-bold">{role.role}</p>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                </div>
            ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-cyber-black relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(#555 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
          
          <div className="p-5 border-b border-gray-700 bg-gray-900 flex justify-between items-center z-10 sticky top-0">
              <h3 className="text-cyber-cyan font-mono font-bold uppercase flex items-center gap-3 text-lg">
                  <MessageSquare size={20} /> Ops Channel: General
              </h3>
              <span className="text-sm text-green-400 font-mono font-bold animate-pulse flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  ENCRYPTED CONNECTION
              </span>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 z-10">
              {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-5 group relative pr-10">
                      <div className="w-12 h-12 rounded bg-gray-800 flex items-center justify-center shrink-0 font-bold text-lg text-gray-200 border border-gray-600 shadow-lg">
                          {msg.user.charAt(0)}
                      </div>
                      <div className="flex-1">
                          <div className="flex items-baseline gap-3 mb-2">
                              <span className={`text-base font-bold tracking-wide group-hover:text-cyber-cyan transition-colors ${msg.user === 'VIP AI AGENT' ? 'text-cyber-pink shadow-neon-pink' : 'text-white'}`}>{msg.user}</span>
                              <span className="text-xs font-mono text-gray-200 font-bold uppercase border border-gray-600 bg-gray-800 px-2 py-0.5 rounded">{msg.role}</span>
                              <span className="text-xs text-gray-200 font-medium">{msg.time}</span>
                          </div>
                          <p className="text-white text-lg leading-relaxed font-medium">{msg.text}</p>
                      </div>
                      
                      {/* Delete Icon - Visible on Hover */}
                      <button 
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="absolute right-0 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-500 p-2"
                        title="Delete Message"
                      >
                        <Trash2 size={18} />
                      </button>
                  </div>
              ))}
          </div>

          <div className="p-6 border-t border-gray-700 bg-gray-900 z-10 sticky bottom-0">
              <div className="relative">
                  <input type="text" placeholder="Type message to Ops Channel..." className="w-full bg-black border border-gray-600 text-white p-5 pr-14 rounded-lg focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan outline-none font-mono text-base placeholder-gray-400 shadow-inner" />
                  <button className="absolute right-4 top-4 text-gray-200 hover:text-cyber-cyan transition-colors">
                      <Terminal size={24} />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};