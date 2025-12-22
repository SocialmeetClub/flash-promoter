import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Bot } from 'lucide-react';

export const RovoPromptTool: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const promptText = `
You are an expert Atlassian Forge Developer and AI Systems Architect.
I am participating in the "Codegeist 2025: Atlassian Williams Racing Edition" Hackathon.
Our team is building "Flash Promoter" & "Stadium Ops", a B2B Operations Dashboard that connects with "TheFunFanReporter" (User App).

CONTEXT:
Event: "San Francisco - Bay Area Interconnected Party" (Codegeist 2025).
Locations (Connected Venues):
1. The Turbo Paddock (San Francisco)
2. Pit Stop Pub (Santa Clara - Sunnyvale)
3. Apex Club (San Jose)

Core Mechanics:
- "Meritocracy Coins": A digital currency users earn by reporting issues (cleanliness, vibe) and spend to skip lines or buy exclusive access.
- "Door Control": Bouncers use a manual counter to update occupancy in real-time (+1, -1, +5 Group).
- "Flash Promos": Real-time offers (e.g., Free Drink) broadcast to users to incentivize movement to empty venues.

YOUR ROLE:
You are the "VIP AI AGENT" (Role: CONCIERGE/OPS). You act as the autonomous brain for Venue Managers and a Concierge for VIP users.

YOUR TASK:
Create a complete Atlassian Forge app definition (manifest.yml) and the Rovo Agent System Prompt that implements the following 3 Specialized Skills (B2B Actions).

SKILL 1: "Maintenance Dispatch" (Ops)
- Trigger: When a fan reports "Toilet broken" or "Spill" in FunFanReporter.
- Action: Rovo creates a Jira Service Management Ticket with high priority and assigns it to the "Venue Manager".
- Input: { venue_id, issue_type, description, reporter_karma_score }

SKILL 2: "Flash Promo Strategist" (Marketing)
- Trigger: Venue occupancy drops below 40% OR Door Control logs > 10 exits in 5 minutes.
- Action: Rovo analyzes the drop and suggests a "Flash Promo" (e.g., "Flash Hour: First Names 'S'") via a Jira Issue comment or a custom UI modal.
- Input: { venue_id, current_occupancy, capacity, historical_data_trend, manual_door_adjustment }

SKILL 3: "Spot Auctioneer" (Revenue)
- Trigger: Venue is at capacity (Status: At Capacity) but 5 people just left via Door Control.
- Action: Rovo creates a "Meritocracy Spot Release" event allowing 5 users to burn 1 "Meritocracy Coin" to enter immediately.
- Input: { venue_id, spots_available, coin_price_floor, reservation_hold_time_minutes }

OUTPUT REQUIRED:
1. The \`manifest.yml\` file content for a Forge app implementing these function modules as Rovo Actions.
2. The specific \`system_prompt\` for the Rovo Agent to understand its role as a "Venue Ops Commander" and "VIP Concierge".
3. A sample TypeScript function for the \`suggest_flash_promo\` action that calculates if a promo is profitable based on a hardcoded margin logic.

CONSTRAINTS:
- Use the latest Forge CLI formatting.
- Assume Node.js runtime.
- The tone of the agent should be "Efficient, Fast, and Proactive" (Formula 1 Pit Crew style).
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn pb-12">
      <div className="bg-cyber-black border border-cyber-cyan/30 rounded-none p-0 shadow-[0_0_50px_rgba(0,243,255,0.1)] relative overflow-hidden">
        {/* Header */}
        <div className="bg-cyber-slate border-b border-gray-800 p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="p-4 bg-black border border-cyber-cyan text-cyber-cyan shadow-neon-cyan shrink-0">
                <Bot size={40} />
            </div>
            <div>
                <h2 className="text-3xl font-black text-white uppercase tracking-wider mb-2">Rovo Agent <span className="text-cyber-cyan">Deployed</span></h2>
                <p className="text-gray-400 text-lg font-mono">Your AI Agent is defined in <code>manifest.yml</code> and ready to chat.</p>
            </div>
        </div>

        {/* INSTRUCTIONS PANEL */}
        <div className="bg-blue-950/20 border-b border-blue-500/30 p-8">
            <h3 className="text-blue-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <MessageSquare size={20} /> How to activate your Agent
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="bg-black/50 border border-blue-500/20 p-4 rounded relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 bg-red-500/20 text-red-500 text-[10px] font-bold uppercase">Critical</div>
                    <span className="text-blue-500 font-black text-4xl mb-2 block">1</span>
                    <p className="text-gray-300 font-mono text-sm">Run <code>forge register</code> to create your App ID.</p>
                </div>
                <div className="bg-black/50 border border-blue-500/20 p-4 rounded">
                    <span className="text-blue-500 font-black text-4xl mb-2 block">2</span>
                    <p className="text-gray-300 font-mono text-sm">Run <code>forge deploy</code> & <code>forge install</code>.</p>
                </div>
                <div className="bg-black/50 border border-blue-500/20 p-4 rounded">
                    <span className="text-blue-500 font-black text-4xl mb-2 block">3</span>
                    <p className="text-gray-300 font-mono text-sm">Go to Jira/Confluence and click the <strong>Rovo (Chat)</strong> icon.</p>
                </div>
                <div className="bg-black/50 border border-blue-500/20 p-4 rounded">
                    <span className="text-blue-500 font-black text-4xl mb-2 block">4</span>
                    <p className="text-gray-300 font-mono text-sm">Select <strong>"VIP Venue Concierge"</strong> and say "Status Report".</p>
                </div>
            </div>
        </div>

        {/* Code Block Area */}
        <div className="p-8 bg-black relative">
            <div className="bg-[#0a0a0a] rounded-sm border border-gray-800 relative group font-mono text-base text-green-400 leading-relaxed overflow-x-auto shadow-inner p-8">
                <pre className="whitespace-pre-wrap mt-6 pt-2">{promptText}</pre>
                
                <div className="absolute top-6 right-6">
                    <button 
                        onClick={handleCopy}
                        className={`flex items-center gap-3 px-6 py-3 font-bold uppercase tracking-widest text-sm transition-all border ${
                            copied 
                            ? 'bg-green-900/50 border-green-500 text-green-400' 
                            : 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black shadow-neon-cyan'
                        }`}
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? 'Payload Copied' : 'Copy Payload'}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};