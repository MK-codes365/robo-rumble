"use client";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/registrations")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  // Function to download CSV
  const downloadCSV = () => {
    const headers = ["Team Name", "Leader Name", "Email", "Phone", "Events", "Amount", "UTR Status"];
    const rows = data.map(user => [
      user.teamName,
      user.leader.name,
      user.leader.email,
      user.leader.phone,
      user.selectedEvents.join(", "),
      user.totalAmount,
      user.transactionId
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "RoboRumble_Registrations.csv");
    document.body.appendChild(link);
    link.click();
  };

  if (loading) return <div className="text-white text-center mt-20">Loading Database...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 pt-28">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#00ff9f]">Admin Dashboard</h1>
        <button 
          onClick={downloadCSV}
          className="bg-[#00ff9f] text-black px-6 py-2 rounded-lg font-bold hover:brightness-110 transition-all"
        >
          Export to Excel (CSV)
        </button>
      </div>

      <div className="overflow-x-auto bg-[#0a101f] border border-slate-800 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[#00ff9f] uppercase text-xs tracking-widest">
              <th className="p-4">Team</th>
              <th className="p-4">Leader</th>
              <th className="p-4">Events</th>
              <th className="p-4">UTR / Transaction</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id} className="border-b border-slate-900 hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold">{user.teamName}</td>
                <td className="p-4">
                  <p>{user.leader.name}</p>
                  <p className="text-xs text-gray-500">{user.leader.phone}</p>
                </td>
                <td className="p-4 text-sm text-gray-400">{user.selectedEvents.join(", ")}</td>
                <td className="p-4 font-mono text-xs">{user.transactionId}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-[10px] font-bold uppercase">
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}