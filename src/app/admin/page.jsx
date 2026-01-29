"use client";
import React, { useState, useEffect } from "react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- 1. LOGIN LOGIC ---
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setIsLoggedIn(true);
        fetchData();
      } else {
        alert("Wrong Username or Password!");
      }
    } catch (err) {
      alert("Login server error!");
    }
  };

  // --- 2. FETCH DATA FROM MONGODB ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/registrations");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  // --- 3. EXPORT TO EXCEL (CSV) ---
  const downloadCSV = () => {
    if (data.length === 0) return alert("No data to export!");
    
    const headers = ["Team Name", "Leader Name", "Email", "Phone", "College", "Events", "Amount", "UTR", "Status"];
    const rows = data.map(user => [
      user.teamName,
      user.leader?.name || "N/A",
      user.leader?.email || "N/A",
      user.leader?.phone || "N/A",
      `"${user.leader?.college || "N/A"}"`,
      `"${user.selectedEvents?.join(", ") || "None"}"`,
      user.totalAmount,
      user.transactionId,
      user.status
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `RoboRumble_Data_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  // --- LOGIN SCREEN RENDER ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <form onSubmit={handleLogin} className="bg-[#0a101f] p-8 rounded-2xl border border-[#00ff9f]/30 w-full max-w-sm shadow-[0_0_50px_rgba(0,255,159,0.1)]">
          <h1 className="text-2xl font-bold text-[#00ff9f] mb-6 text-center tracking-widest uppercase">Admin Secure Access</h1>
          <div className="space-y-4">
            <input 
              type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}
              className="w-full bg-black border border-slate-700 p-3 rounded-lg text-white outline-none focus:border-[#00ff9f] transition-all"
            />
            <input 
              type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}
              className="w-full bg-black border border-slate-700 p-3 rounded-lg text-white outline-none focus:border-[#00ff9f] transition-all"
            />
            <button className="w-full bg-[#00ff9f] text-[#002a1b] font-black py-3 rounded-lg hover:brightness-110 shadow-[0_0_20px_rgba(0,255,159,0.3)] transition-all">
              ENTER DASHBOARD
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- MAIN DASHBOARD RENDER ---
  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 pt-28">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#00ff9f] uppercase tracking-tighter">Registrations Control</h1>
          <p className="text-gray-500 text-sm">Total Participants: {data.length}</p>
        </div>
        
        <div className="flex gap-4">
            <button onClick={fetchData} className="bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-lg text-sm font-bold border border-slate-700 transition-all">
               Refresh Data
            </button>
            <button 
              onClick={downloadCSV}
              className="bg-[#00ff9f] text-[#002a1b] px-6 py-2 rounded-lg font-black uppercase text-sm shadow-[0_0_15px_rgba(0,255,159,0.2)] hover:scale-105 transition-all"
            >
              Export CSV
            </button>
        </div>
      </div>
      
      {/* Table Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#00ff9f] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#00ff9f] font-mono animate-pulse">Accessing MongoDB Cluster...</p>
        </div>
      ) : (
          <div className="overflow-x-auto bg-[#0a101f] border border-slate-800 rounded-xl shadow-2xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-800 text-[#00ff9f] text-xs uppercase tracking-[0.2em] bg-black/40">
                        <th className="p-5 font-black">Team Details</th>
                        <th className="p-5 font-black">Leader / Contact</th>
                        <th className="p-5 font-black">Events</th>
                        <th className="p-4 font-black">Payment Proof</th>
                        <th className="p-5 font-black">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr><td colSpan="5" className="p-10 text-center text-gray-500 italic">No registrations found yet.</td></tr>
                    ) : (
                        data.map((user) => (
                            <tr key={user._id} className="border-b border-slate-900 hover:bg-white/[0.02] transition-colors group">
                                <td className="p-5">
                                    <p className="font-black text-lg text-white group-hover:text-[#00ff9f] transition-colors">{user.teamName}</p>
                                    <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-widest">{user._id.slice(-8)}</p>
                                </td>
                                <td className="p-5">
                                    <p className="font-bold text-gray-200">{user.leader?.name}</p>
                                    <p className="text-xs text-[#00ff9f] font-mono">{user.leader?.phone}</p>
                                    <p className="text-[10px] text-gray-400 truncate max-w-[150px]">{user.leader?.email}</p>
                                </td>
                                <td className="p-5">
                                    <div className="flex flex-wrap gap-1">
                                        {user.selectedEvents?.map((ev, idx) => (
                                            <span key={idx} className="bg-slate-800 text-[9px] px-2 py-0.5 rounded text-gray-300 border border-slate-700">
                                                {ev}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="mt-2 font-bold text-sm text-white">Total: ₹{user.totalAmount}</p>
                                </td>
                                <td className="p-5">
                                    <p className="text-xs font-mono text-yellow-400 mb-2">UTR: {user.transactionId}</p>
                                    {user.screenshotUrl ? (
                                        <a 
                                            href={user.screenshotUrl} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="inline-block bg-white/5 border border-white/10 text-[10px] px-3 py-1.5 rounded uppercase font-bold hover:bg-[#00ff9f] hover:text-black transition-all"
                                        >
                                            View Image
                                        </a>
                                    ) : (
                                        <span className="text-red-500 text-[10px] font-bold uppercase">No Proof</span>
                                    )}
                                </td>
                                <td className="p-5">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full animate-pulse ${user.status === 'Pending' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${user.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                                            {user.status}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
          </div>
      )}

      {/* Footer Info */}
      <p className="text-center mt-10 text-gray-600 text-[10px] uppercase tracking-[0.3em]">
        Powered by RoboRumble CMS - Authorized Personnel Only
      </p>
    </div>
  );
}