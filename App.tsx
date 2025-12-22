import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { PromoManager } from './components/PromoManager';
import { RovoPromptTool } from './components/RovoPromptTool';
import { FanAppSimulation } from './components/FanAppSimulation';
import { AddVenueForm } from './components/AddVenueForm';
import { InternalChat } from './components/InternalChat';
import { MOCK_VENUES, INITIAL_PROMOS } from './services/mockData';
import { LayoutDashboard, Megaphone, Bot, Flag, Menu, X, Cpu, Smartphone, PlusCircle, MessageSquare } from 'lucide-react';
import { Venue, View, Promo } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [venues, setVenues] = useState<Venue[]>(MOCK_VENUES);
  const [targetVenueId, setTargetVenueId] = useState<string | null>(null);
  
  // This state is the "Link" between the Manager Dashboard and the Fan App
  const [simulatedPromo, setSimulatedPromo] = useState<Promo | null>(null);

  const handleTriggerPromo = (venueId: string) => {
    setTargetVenueId(venueId);
    setCurrentView(View.PROMOS);
  };

  const handleExecutePromo = (promo: Promo) => {
      // 1. Set the specific promo data to be passed
      setSimulatedPromo(promo);
      // 2. Switch the view to the simulation immediately
      setCurrentView(View.SIMULATION);
  };

  const handleUpdateOccupancy = (venueId: string, change: number) => {
    setVenues(prev => prev.map(v => {
      if (v.id === venueId) {
        const newOccupancy = Math.max(0, Math.min(v.capacity + 20, v.currentOccupancy + change));
        const newStatus = newOccupancy >= v.capacity ? 'At Capacity' : (v.status === 'Closed' ? 'Closed' : 'Open');
        return { ...v, currentOccupancy: newOccupancy, status: newStatus };
      }
      return v;
    }));
  };

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard venues={venues} onTriggerPromo={handleTriggerPromo} onUpdateOccupancy={handleUpdateOccupancy} />;
      case View.ADD_VENUE:
        return <AddVenueForm />;
      case View.PROMOS:
        return <PromoManager venues={venues} initialPromos={INITIAL_PROMOS} activeVenueId={targetVenueId} onNavigateToSim={handleExecutePromo} />;
      case View.ROVO_AGENT:
        return <RovoPromptTool />;
      case View.SIMULATION:
        // Pass the linked promo data
        return <FanAppSimulation activePromo={simulatedPromo} />;
      case View.INTERNAL_CHAT:
        return <InternalChat />;
      default:
        return <Dashboard venues={venues} onTriggerPromo={handleTriggerPromo} onUpdateOccupancy={handleUpdateOccupancy} />;
    }
  };

  const NavItem = ({ view, label, icon: Icon }: { view: View; label: string; icon: any }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setMobileMenuOpen(false);
        // If manually clicking the menu, clear the active promo so it shows the default state
        if (view === View.SIMULATION) setSimulatedPromo(null);
      }}
      className={`flex items-center gap-4 px-6 py-4 rounded-none border-l-4 w-full transition-all duration-300 group ${
        currentView === view 
          ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan shadow-[inset_10px_0_20px_-10px_rgba(0,243,255,0.3)]' 
          : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5 hover:border-gray-600'
      }`}
    >
      <Icon size={24} className={`transition-transform duration-300 ${currentView === view ? "animate-pulse" : "group-hover:scale-110"}`} />
      <span className="font-bold tracking-wider text-sm lg:text-base uppercase text-left">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-cyber-black flex text-gray-100 font-sans selection:bg-cyber-pink selection:text-white overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 border-r border-gray-800 bg-cyber-dark fixed h-full z-10 shadow-[5px_0_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 mb-10 px-6 pt-8">
            <div className="w-10 h-10 bg-cyber-cyan shadow-neon-cyan flex items-center justify-center rounded-sm">
                <Cpu className="text-black" size={24} />
            </div>
            <div>
                <h1 className="font-black text-2xl tracking-tighter text-white italic leading-none">FLASH<span className="text-cyber-cyan">PROMOTER</span></h1>
                <p className="text-xs text-cyber-pink font-mono tracking-[0.2em] uppercase glow mt-1">V.9.0 Beta</p>
            </div>
        </div>
        
        <nav className="space-y-1 flex-1 overflow-y-auto scrollbar-hide">
          <NavItem view={View.DASHBOARD} label="Live Operations" icon={LayoutDashboard} />
          <NavItem view={View.ADD_VENUE} label="Add Venue" icon={PlusCircle} />
          <NavItem view={View.PROMOS} label="Flash Promos" icon={Megaphone} />
          <NavItem view={View.ROVO_AGENT} label="Rovo Agent Build" icon={Bot} />
          <div className="my-4 border-t border-gray-800 mx-6"></div>
          <NavItem view={View.SIMULATION} label="TheFunFanReporter" icon={Smartphone} />
          <NavItem view={View.INTERNAL_CHAT} label="Team Chat" icon={MessageSquare} />
        </nav>

        <div className="mt-auto p-6 bg-gradient-to-r from-cyber-slate to-transparent border-t border-gray-800">
            <div className="flex items-center gap-2 mb-2">
                <Flag size={18} className="text-cyber-pink" />
                <span className="text-sm font-bold text-cyber-cyan font-mono">RACE DAY MODE</span>
            </div>
            <p className="text-xs text-gray-400 font-mono leading-relaxed">San Francisco - Bay Area Interconnected Party<br/>Codegeist 2025</p>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed w-full bg-cyber-dark border-b border-gray-800 z-20 px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyber-cyan shadow-neon-cyan flex items-center justify-center rounded-sm">
                 <Cpu className="text-black" size={18} />
            </div>
            <h1 className="font-black text-xl italic tracking-tighter">FLASH<span className="text-cyber-cyan">PROMOTER</span></h1>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-cyber-cyan hover:text-white transition-colors">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-cyber-black/95 backdrop-blur-xl z-20 pt-24 px-8 animate-fadeIn">
             <nav className="space-y-6">
                <NavItem view={View.DASHBOARD} label="Live Operations" icon={LayoutDashboard} />
                <NavItem view={View.ADD_VENUE} label="Add Venue" icon={PlusCircle} />
                <NavItem view={View.PROMOS} label="Flash Promos" icon={Megaphone} />
                <NavItem view={View.ROVO_AGENT} label="Rovo Agent Build" icon={Bot} />
                <NavItem view={View.SIMULATION} label="TheFunFanReporter" icon={Smartphone} />
                <NavItem view={View.INTERNAL_CHAT} label="Team Chat" icon={MessageSquare} />
            </nav>
            <button 
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-6 text-white p-2"
            >
                <X size={32} />
            </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-6 md:p-10 pt-24 md:pt-10 overflow-y-auto h-screen bg-cyber-black bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-cyber-black to-cyber-black">
        <header className="flex flex-col md:flex-row md:justify-between md:items-start mb-10 gap-6 border-b border-gray-800 pb-6">
            <div>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-3 drop-shadow-md">
                    {currentView === View.DASHBOARD && <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Venue Command Center</span>}
                    {currentView === View.ADD_VENUE && <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Onboard Partner</span>}
                    {currentView === View.PROMOS && <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-500">Flash Promo Dispatch</span>}
                    {currentView === View.ROVO_AGENT && <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink to-purple-500">AI Agent Configuration</span>}
                    {currentView === View.SIMULATION && <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyber-cyan">TheFunFanReporter</span>}
                    {currentView === View.INTERNAL_CHAT && <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Secure Internal Comms</span>}
                </h2>
                <p className="text-gray-300 text-base md:text-lg font-mono">
                    {currentView === View.DASHBOARD && '> Monitoring Real-time telemetry from TheFunFanReporter'}
                    {currentView === View.ADD_VENUE && '> Configure new venue parameters and preset logic'}
                    {currentView === View.PROMOS && '> Initiating crowd control protocols via limited-time offers'}
                    {currentView === View.ROVO_AGENT && '> Bootstrapping Atlassian Rovo neural interface'}
                    {currentView === View.SIMULATION && '> Emulating "TheFunFanReporter" client view'}
                    {currentView === View.INTERNAL_CHAT && '> Encrypted channel for Venue Ops & Owners'}
                </p>
            </div>
            <div className="hidden md:block">
                 <div className="flex items-center gap-3 text-base font-mono text-cyber-cyan bg-cyber-cyan/5 px-4 py-2 rounded border border-cyber-cyan/30 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                    <span className="w-2 h-2 rounded-full bg-cyber-cyan shadow-neon-cyan animate-pulse"></span>
                    SYSTEM ONLINE
                 </div>
            </div>
        </header>
        
        {renderContent()}
      </main>
    </div>
  );
};

export default App;