import React, { useState, useEffect } from 'react';
import { Bell, User, Zap, ShieldAlert, Ticket, Plus, Minus, CheckCircle, Lock, AlertTriangle, MapPin, X, QrCode, Clock, Gift, Coins } from 'lucide-react';
import { Promo } from '../types';

interface FanAppSimulationProps {
  activePromo?: Promo | null;
}

export const FanAppSimulation: React.FC<FanAppSimulationProps> = ({ activePromo }) => {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [guests, setGuests] = useState(1);
  const [duration, setDuration] = useState(15);
  const [guestName, setGuestName] = useState('');
  
  // Ticket State
  const [showTicket, setShowTicket] = useState(false);
  const [ticketType, setTicketType] = useState<'RESERVATION' | 'PROMO'>('RESERVATION');
  const [timeLeft, setTimeLeft] = useState(0);

  // Overlay State (Managed internally to allow closing without losing the promo prop context immediately if needed)
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (activePromo) {
        setShowOverlay(true);
        // Reset simulation states when a new promo arrives
        setShowTicket(false);
        setReservationOpen(false);
    }
  }, [activePromo]);

  // Cost Logic: 1 MC per person per 15 minute block
  const totalCost = guests * (duration / 15);

  // Timer Logic
  useEffect(() => {
    let interval: any;
    if (showTicket && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showTicket, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleConfirmReservation = () => {
      setTicketType('RESERVATION');
      setTimeLeft(duration * 60);
      setReservationOpen(false);
      setShowTicket(true);
  };

  const handleClaimPromo = () => {
      setShowOverlay(false); // Close the overlay
      setTicketType('PROMO');
      setTimeLeft(30 * 60); // 30 minutes default for promo
      setShowTicket(true);
  };

  const handleStartReservation = () => {
      setShowOverlay(false); // Close the overlay
      setReservationOpen(true);
  };

  const handleDurationChange = (change: number) => {
      const newDuration = duration + change;
      if (newDuration >= 15 && newDuration <= 120) {
          setDuration(newDuration);
      }
  };

  // Dynamic Styles based on Ticket Type
  const isPromoTicket = ticketType === 'PROMO';
  const themeColorClass = isPromoTicket ? 'bg-cyber-cyan' : 'bg-yellow-500';
  const textColorClass = isPromoTicket ? 'text-cyber-cyan' : 'text-yellow-500';
  const shadowClass = isPromoTicket ? 'shadow-[0_0_50px_rgba(0,243,255,0.4)]' : 'shadow-[0_0_50px_rgba(234,179,8,0.4)]';
  const glowTextClass = isPromoTicket ? 'drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]' : 'drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]';
  const gradientClass = isPromoTicket ? 'via-cyber-cyan' : 'via-yellow-500';

  // Determine Overlay Type (Yellow vs Blue) based on activePromo
  const isYellowPromo = activePromo?.type === 'ACCESS' || activePromo?.title.toLowerCase().includes('spot');
  const overlayBorderColor = isYellowPromo ? 'border-yellow-500' : 'border-cyber-cyan';
  const overlayShadow = isYellowPromo ? 'shadow-[0_0_50px_rgba(234,179,8,0.3)]' : 'shadow-[0_0_50px_rgba(0,243,255,0.3)]';
  const overlayHeaderBg = isYellowPromo ? 'bg-yellow-500' : 'bg-cyber-cyan';
  const overlayHeaderShadow = isYellowPromo ? 'shadow-[0_0_20px_rgba(234,179,8,0.4)]' : 'shadow-neon-cyan';
  const overlayBtnBg = isYellowPromo ? 'bg-yellow-500' : 'bg-cyber-cyan';
  const overlayBtnShadow = isYellowPromo ? 'shadow-[0_0_20px_rgba(234,179,8,0.6)]' : 'shadow-[0_0_20px_rgba(0,243,255,0.6)]';

  return (
    <div className="flex justify-center items-center h-full animate-fadeIn py-4 relative bg-transparent">
      
      {/* Phone Frame */}
      <div className="relative w-[375px] h-[812px] bg-black border-[14px] border-[#1a1a1a] rounded-[3rem] shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col ring-1 ring-gray-800">
        
        {/* ACTIVE TICKET SCREEN (Result of action) */}
        {showTicket && (
            <div className="absolute inset-0 z-[60] bg-black flex flex-col animate-fadeIn">
                {/* Ticket Header */}
                <div className={`${themeColorClass} p-6 pt-12 pb-8 rounded-b-3xl ${shadowClass} relative overflow-hidden transition-colors duration-300`}>
                    <div className="absolute inset-0 bg-black/10" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px', opacity: 0.2}}></div>
                    
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                {isPromoTicket ? <Gift className="text-black" size={24} /> : <Ticket className="text-black" size={24} />}
                                <span className="text-black font-black uppercase tracking-widest text-sm">
                                    {isPromoTicket ? 'Offer Claimed' : 'Access Granted'}
                                </span>
                            </div>
                            <h2 className="text-4xl font-black text-black leading-none uppercase italic">
                                {isPromoTicket ? <>FLASH<br/>COUPON</> : <>PRIORITY<br/>PASS</>}
                            </h2>
                        </div>
                        <button 
                            onClick={() => setShowTicket(false)} 
                            className="bg-black/20 hover:bg-black/30 text-black p-2 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Ticket Body */}
                <div className="flex-1 p-6 relative">
                    {/* Animated Border */}
                    <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent ${gradientClass} to-transparent opacity-50`}></div>

                    {/* Countdown */}
                    <div className="mt-8 mb-10 text-center">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Ticket Expires In</p>
                        <div className={`text-7xl font-black text-white font-mono tracking-tighter tabular-nums ${glowTextClass}`}>
                            {formatTime(timeLeft)}
                        </div>
                         <div className={`flex justify-center items-center gap-2 mt-2 ${textColorClass} font-bold text-xs uppercase animate-pulse`}>
                            <Clock size={12} /> Live Count
                         </div>
                    </div>

                    {/* Details Grid */}
                    <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 space-y-6 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-10">
                            {isPromoTicket ? <Zap size={100} className="text-white rotate-12" /> : <Ticket size={100} className="text-white rotate-12" />}
                        </div>

                        {/* Row 1 */}
                        <div>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                                {isPromoTicket ? 'Target Requirement' : 'Main Guest'}
                            </p>
                            <p className="text-white font-bold text-xl uppercase tracking-wide">
                                {isPromoTicket ? (activePromo?.targetAudience || 'Names starting with "M"') : (guestName || 'GUEST')}
                            </p>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                                    {isPromoTicket ? 'Offer Item' : 'Party Size'}
                                </p>
                                <div className={`flex items-center gap-2 text-white font-bold`}>
                                    {isPromoTicket ? <Gift size={16} className={textColorClass} /> : <User size={16} className={textColorClass} />}
                                    <span className="text-lg">{isPromoTicket ? '1 Free Drink' : `${guests} People`}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                                    {isPromoTicket ? 'Value' : 'Total Paid'}
                                </p>
                                <div className="flex items-center gap-2 text-white font-bold">
                                    <span className="text-lg">{isPromoTicket ? 'FREE' : `${totalCost} MC`}</span>
                                </div>
                            </div>
                        </div>

                        {/* Row 3 - Venue */}
                         <div>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Venue Access</p>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full bg-opacity-20 ${isPromoTicket ? 'bg-cyber-cyan' : 'bg-yellow-500'}`}>
                                    <MapPin size={18} className={textColorClass} />
                                </div>
                                <div>
                                    <p className="text-white font-black uppercase leading-none">
                                        {isPromoTicket ? 'The Turbo Paddock' : 'Pit Stop Pub'}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        {isPromoTicket ? 'San Francisco' : 'Santa Clara - Sunnyvale'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code */}
                    <div className="mt-8 flex flex-col items-center">
                        <div className={`bg-white p-4 rounded-xl ${isPromoTicket ? 'shadow-[0_0_30px_rgba(0,243,255,0.2)]' : 'shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}>
                            <QrCode size={120} className="text-black" />
                        </div>
                        <p className="text-gray-500 text-[10px] font-mono mt-3 uppercase">Scan at bar for redemption</p>
                    </div>
                </div>
            </div>
        )}

        {/* RESERVATION MODAL (Yellow) - Only if not showing ticket */}
        {reservationOpen && !showTicket && (
            <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md flex items-end sm:items-center justify-center animate-fadeIn p-4">
                <div className="w-full bg-[#0a0a0a] border-2 border-yellow-500 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.3)]">
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-800 bg-yellow-500/10">
                    <div className="flex items-center gap-3 text-white font-black uppercase tracking-wider text-base">
                    <Ticket className="text-yellow-400" size={20} />
                    RESERVE SPOT
                    </div>
                    <button onClick={() => setReservationOpen(false)} className="text-white hover:text-yellow-400 transition-colors bg-gray-800 p-1 rounded-full">
                    <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Cost */}
                    <div className="text-center py-4 bg-gray-900/50 rounded-lg border border-gray-800">
                        <p className="text-white text-xs font-bold uppercase tracking-widest mb-1">Total Cost</p>
                        <div className="flex justify-center items-baseline gap-2">
                            <span className="text-7xl font-black text-white tracking-tighter drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                                {totalCost}
                            </span>
                            <span className="text-yellow-400 font-bold text-2xl">MC</span>
                        </div>
                    </div>

                    {/* Duration Control */}
                    <div>
                        <div className="flex justify-between mb-2 px-1">
                            <span className="text-xs text-white font-bold uppercase tracking-wider">Duration</span>
                            <span className="text-xs text-yellow-400 font-bold uppercase tracking-wider">{duration} MIN</span>
                        </div>
                        <div className="flex items-center justify-between bg-[#151515] rounded border border-gray-700 p-2">
                            <button 
                                onClick={() => handleDurationChange(-15)}
                                className={`w-12 h-12 flex items-center justify-center bg-gray-800 text-white border border-gray-600 rounded hover:bg-gray-700 hover:border-white transition-colors ${duration <= 15 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={duration <= 15}
                            >
                                <Minus size={20} />
                            </button>
                            <span className="text-white font-bold text-xl">{duration}m Hold</span>
                            <button 
                                onClick={() => handleDurationChange(15)}
                                className="w-12 h-12 flex items-center justify-center bg-gray-800 text-white border border-gray-600 rounded hover:bg-gray-700 hover:border-white transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                        <p className="text-right text-[10px] text-white mt-1.5 font-bold tracking-wide">RATE: 1 MC / 15 min</p>
                    </div>

                    {/* Party Size Control */}
                    <div>
                        <div className="flex justify-between mb-2 px-1">
                            <span className="text-xs text-white font-bold uppercase tracking-wider">Party Size</span>
                            <span className="text-xs text-yellow-400 font-bold uppercase tracking-wider">{guests} PEOPLE</span>
                        </div>
                        <div className="flex items-center justify-between bg-[#151515] rounded border border-gray-700 p-2">
                            <button 
                                onClick={() => setGuests(Math.max(1, guests - 1))} 
                                className="w-12 h-12 flex items-center justify-center bg-gray-800 text-white border border-gray-600 rounded hover:bg-gray-700 hover:border-white transition-colors"
                            >
                                <Minus size={20} />
                            </button>
                            <span className="text-white font-bold text-xl">{guests} Guests</span>
                            <button 
                                onClick={() => setGuests(Math.min(10, guests + 1))} 
                                className="w-12 h-12 flex items-center justify-center bg-gray-800 text-white border border-gray-600 rounded hover:bg-gray-700 hover:border-white transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                        <p className="text-right text-[10px] text-white mt-1.5 font-bold tracking-wide">RATE: 1 MC / Person</p>
                    </div>

                    {/* Name Input */}
                    <div>
                        <label className="text-xs text-white font-bold uppercase mb-2 block tracking-wider">Main Guest Name</label>
                        <input 
                            type="text" 
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="ENTER FULL NAME" 
                            className="w-full bg-[#151515] border border-gray-700 rounded p-4 text-white text-base outline-none focus:border-yellow-400 transition-colors placeholder-gray-500 font-bold uppercase" 
                        />
                    </div>

                    {/* Confirm Button */}
                    <button onClick={handleConfirmReservation} className="w-full bg-yellow-400 hover:bg-white text-black font-black uppercase py-4 rounded shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center justify-center gap-2 mt-4 transition-all active:scale-95 text-lg tracking-wide">
                        <Lock size={20} /> CONFIRM RESERVATION
                    </button>
                </div>
                </div>
            </div>
        )}

        {/* ACTIVE PROMO OVERLAY (Triggered by EXECUTE in Dashboard) */}
        {showOverlay && activePromo && (
            <div className="absolute inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-fadeIn">
                <div className={`w-full bg-black border-2 ${overlayBorderColor} ${overlayShadow} rounded-lg overflow-hidden relative`}>
                    
                    {/* Header */}
                    <div className={`${overlayHeaderBg} p-4 flex justify-between items-center ${overlayHeaderShadow} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/20 animate-pulse-fast"></div>
                        <div className="flex items-center gap-2 relative z-10">
                            {isYellowPromo ? <Ticket size={20} className="text-black" /> : <Zap size={20} className="fill-black text-black" />}
                            <span className="text-black font-black text-base uppercase tracking-widest">
                                {isYellowPromo ? 'Spot Release' : 'Flash Promo'}
                            </span>
                        </div>
                        <span className={`bg-black ${isYellowPromo ? 'text-yellow-500' : 'text-cyber-cyan'} px-2 py-0.5 rounded text-xs font-black uppercase relative z-10 animate-pulse`}>
                            LIVE NOW
                        </span>
                        <button onClick={() => setShowOverlay(false)} className="bg-black/20 hover:bg-black/30 text-black p-1 rounded-full transition-colors relative z-10">
                            <X size={16} />
                        </button>
                    </div>
                    
                    <div className="p-8 text-center bg-gradient-to-b from-gray-900 to-black relative">
                        {/* Glowing Icon */}
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-opacity-10 border border-opacity-30 ${isYellowPromo ? 'bg-yellow-500 border-yellow-500' : 'bg-cyber-cyan border-cyber-cyan'}`}>
                            {isYellowPromo 
                                ? <Coins size={48} className="text-yellow-500" />
                                : <Zap size={48} className="text-cyber-cyan fill-current" />
                            }
                        </div>
                        
                        {/* Headline */}
                        <h2 className="text-4xl font-black text-white italic uppercase leading-none mb-2 drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
                            {isYellowPromo ? 'SKIP THE LINE!' : (activePromo.title.split(':')[0] || '1 FREE DRINK')}
                        </h2>
                        
                        {/* Subtext */}
                        <div className="mb-8">
                            {isYellowPromo ? (
                                <>
                                    <p className="text-gray-300 text-sm font-medium mb-1">5 Spots available for</p>
                                    <p className="text-yellow-500 font-black text-lg uppercase tracking-wide">1 Meritocracy Coin</p>
                                </>
                            ) : (
                                <>
                                     <p className="text-white text-xs font-mono uppercase tracking-widest mb-1 font-bold">Target Audience</p>
                                     <p className="text-cyber-cyan font-bold text-lg uppercase tracking-wide border-b border-cyber-cyan/30 inline-block pb-1">
                                        {activePromo.targetAudience || 'All Users'}
                                     </p>
                                </>
                            )}
                        </div>

                        {/* Timer */}
                        <div className="text-white text-sm font-bold uppercase tracking-widest mb-6 flex justify-center items-center gap-2 bg-gray-800/50 py-2 rounded">
                             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                            Ends in {activePromo.durationMinutes}m 00s
                        </div>

                        {/* Action Button */}
                        <button 
                            onClick={isYellowPromo ? handleStartReservation : handleClaimPromo}
                            className={`w-full ${overlayBtnBg} hover:bg-white text-black font-black uppercase py-4 rounded ${overlayBtnShadow} transition-all flex justify-center items-center gap-3 mb-6 group transform hover:scale-105`}
                        >
                            {isYellowPromo ? <Lock size={20} /> : <Zap size={20} className="fill-black" />}
                            <span className="text-xl tracking-wide">
                                {isYellowPromo ? 'RESERVE NOW' : 'CLAIM OFFER'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Dynamic Island / Notch Area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-40 bg-[#1a1a1a] rounded-b-2xl z-30 flex justify-center items-end pb-1">
            <div className="w-16 h-1 bg-gray-800 rounded-full"></div>
        </div>

        {/* App Header */}
        <div className="bg-black/80 backdrop-blur-md text-white px-5 pt-14 pb-4 flex justify-between items-center z-20 sticky top-0 border-b border-gray-800">
             <div className="flex flex-col">
                <h2 className="font-black italic tracking-tighter text-lg leading-none mb-1">THE FUN FAN</h2>
                <div className="flex items-center gap-2 text-[11px] font-medium tracking-wide">
                    <span className="text-cyber-cyan font-bold">REPORTER</span>
                    <span className="text-gray-500 text-[8px]">●</span>
                    <span className="text-gray-300">Group Chat</span>
                </div>
             </div>
             <div className="relative p-2 rounded-full hover:bg-gray-800 transition-colors">
                <Bell size={20} className="text-gray-200" />
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-cyber-pink rounded-full border border-black"></span>
             </div>
        </div>

        {/* Feed Content */}
        <div className="flex-1 overflow-y-auto bg-black p-4 space-y-6 relative scrollbar-hide pb-32">
             
             {/* 1. Joglar Report Item (Purple Button) */}
             <div className="bg-[#121217] rounded-2xl p-4 border border-gray-800/50 shadow-md">
                <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                             <User size={18} className="text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-white font-bold text-sm">Joglar Report</p>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold">2m ago • Verified Fan</p>
                    </div>
                </div>
                
                <p className="text-white text-sm mb-4 leading-normal font-medium pl-1">
                   Valet needed: <span className="text-pink-500 font-bold">250 MC!</span> Anyone available?
                </p>
                
                <button className="w-full bg-[#9333ea] hover:bg-[#a855f7] text-white font-bold text-xs uppercase py-3 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 tracking-wide">
                   <CheckCircle size={14} /> Accept Job
                </button>
             </div>

             {/* 2. Emergency Alert (Red) */}
             <div className="bg-[#1a0505] border border-red-900/50 rounded-2xl p-4 flex items-start gap-4 shadow-lg shadow-red-900/10">
                <div className="bg-red-500/10 p-2 rounded-lg border border-red-500/20 shrink-0">
                    <ShieldAlert className="text-red-500" size={20} />
                </div>
                <div>
                    <h4 className="text-red-500 font-bold text-xs uppercase tracking-wider mb-1">
                        Emergency Alert
                    </h4>
                    <p className="text-white text-sm font-medium leading-relaxed">GATE 5 CLOSED due to accident. Please divert to Gate 2 immediately.</p>
                </div>
             </div>

             {/* 3. Meritocracy Spot Release (Yellow) */}
             <div className="bg-[#0a0a0a] border-2 border-yellow-500/50 rounded-2xl overflow-hidden shadow-lg shadow-yellow-500/10">
                 <div className="bg-yellow-500/10 px-4 py-3 flex justify-between items-center border-b border-yellow-500/20">
                    <div className="flex items-center gap-2">
                         <Ticket className="text-yellow-400" size={18} />
                         <span className="text-yellow-400 font-black uppercase text-sm italic tracking-wider">Spot Release</span>
                    </div>
                    <div className="bg-yellow-400 text-black px-2 py-0.5 rounded text-[10px] font-black uppercase">15m Left</div>
                 </div>
                 
                 <div className="p-5">
                     <h3 className="text-white font-black text-xl mb-1 uppercase italic">Skip the line!</h3>
                     <p className="text-gray-300 text-sm mb-5 font-medium">5 Spots available for <span className="text-white font-bold">1 Meritocracy Coin</span>.</p>
                     
                     <div className="flex items-center justify-between bg-[#151515] rounded-lg p-3 mb-5 border border-gray-700">
                         <span className="text-xs text-white font-bold uppercase tracking-wider">Status</span>
                         <span className="text-yellow-400 text-xs font-black tracking-widest animate-pulse">>>> STANDBY</span>
                     </div>

                     <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setReservationOpen(true);
                        }}
                        className="w-full bg-yellow-400 hover:bg-white text-black font-black uppercase text-base py-4 rounded-lg shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all tracking-wide flex items-center justify-center gap-2"
                     >
                        <Lock size={18} /> Reserve Now
                     </button>

                     {/* Updated Footer with Location - YELLOW CARD - HIGH CONTRAST */}
                     <div className="bg-gray-900 border border-yellow-500/30 rounded-lg p-4 flex items-center gap-4 mt-6">
                        <div className="bg-yellow-500/20 p-2.5 rounded-full shrink-0">
                            <MapPin size={24} className="text-yellow-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mb-0.5">Venue Location</span>
                            <span className="text-white font-black text-lg uppercase leading-none mb-0.5">Pit Stop Pub</span>
                            <span className="text-white font-bold text-xs">Santa Clara - Sunnyvale</span>
                        </div>
                     </div>
                 </div>
             </div>

             {/* 4. Flash Promo (Blue/Cyan) */}
             <div className="bg-[#050505] border-2 border-cyber-cyan/50 rounded-2xl p-4 shadow-[0_0_30px_rgba(0,243,255,0.1)] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                     <Zap size={80} className="text-cyber-cyan -rotate-12 translate-x-4 -translate-y-4" />
                 </div>
                 
                 <div className="flex items-center gap-3 mb-4 relative z-10">
                    <span className="bg-cyber-cyan text-black text-[10px] font-black uppercase px-2 py-1 rounded">Flash Promo</span>
                    <span className="text-cyber-cyan text-[10px] font-bold uppercase tracking-widest animate-pulse">Live Now</span>
                 </div>

                 <h3 className="text-white font-black text-3xl italic uppercase mb-1 relative z-10 leading-none">1 FREE DRINK</h3>
                 <p className="text-white text-xs font-mono font-bold mb-2 relative z-10">Target: Names starting with "M"</p>
                 <p className="text-cyber-cyan text-xs font-black uppercase tracking-widest mb-5 relative z-10">Valid for the next 30 minutes</p>

                 <div className="flex gap-2 relative z-10 mb-6">
                     <button 
                        onClick={handleClaimPromo}
                        className="flex-1 bg-cyber-cyan hover:bg-white text-black font-black uppercase text-sm py-3.5 rounded shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all"
                     >
                        Claim Now
                     </button>
                     <div className="bg-gray-900 border border-gray-600 text-cyber-cyan font-mono font-bold text-sm flex items-center justify-center px-4 rounded">
                        29:59
                     </div>
                 </div>
                 
                 {/* Updated Footer with Location - BLUE CARD - HIGH CONTRAST */}
                 <div className="bg-gray-900 border border-cyber-cyan/30 rounded-lg p-4 flex items-center gap-4 relative z-10">
                     <div className="bg-cyber-cyan/20 p-2.5 rounded-full shrink-0">
                         <MapPin size={24} className="text-cyber-cyan" />
                     </div>
                     <div className="flex flex-col">
                         <span className="text-[10px] text-cyber-cyan font-bold uppercase tracking-widest mb-0.5">Venue Location</span>
                         <span className="text-white font-black text-lg uppercase leading-none mb-0.5">The Turbo Paddock</span>
                         <span className="text-white font-bold text-xs">San Francisco</span>
                     </div>
                 </div>
             </div>
        </div>
        
        {/* Bottom Navigation */}
        <div className="h-[84px] bg-black/95 backdrop-blur-xl border-t border-gray-800 flex justify-between items-start px-8 pt-4 z-20 absolute bottom-0 w-full rounded-b-[2.5rem]">
             <button className="flex flex-col items-center gap-1.5 text-cyber-cyan group">
                <div className="relative">
                    <Zap size={22} className="fill-current drop-shadow-[0_0_8px_rgba(0,243,255,0.5)] group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest">Feed</span>
             </button>
             <button className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors">
                <AlertTriangle size={22} />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Report</span>
             </button>
             <button className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors">
                <Ticket size={22} />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Market</span>
             </button>
             <button className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors">
                <User size={22} />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Profile</span>
             </button>
        </div>
      </div>
    </div>
  );
};