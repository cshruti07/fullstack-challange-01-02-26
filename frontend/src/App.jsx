import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:8080/api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ description: '', amount: '', category: 'Food', date: '' });
  const [filter, setFilter] = useState('');

  // 1. Fetch Expenses (Requirement: List Expenses)
  const fetchExpenses = async () => {
    const url = filter ? `${API_URL}?category=${filter}` : API_URL;
    const res = await axios.get(url);
    setExpenses(res.data);
  };

  useEffect(() => { fetchExpenses(); }, [filter]);

  // 2. Add Expense (Requirement: Create Expense)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, formData);
    setFormData({ description: '', amount: '', category: 'Food', date: '' });
    fetchExpenses();
  };

  // 3. Calculate Total (Requirement: Totals)
  const total = expenses.reduce((sum, item) => sum + parseFloat(item.amount), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Money Tracker</h1>

        {/* --- FORM --- */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <input className="border p-2 rounded" type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          <input className="border p-2 rounded" type="number" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} required />
          <select className="border p-2 rounded" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
            <option>Food</option><option>Travel</option><option>Bills</option><option>Other</option>
          </select>
          <input className="border p-2 rounded" type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
          <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition" type="submit">Add Expense</button>
        </form>

        {/* --- SUMMARY & FILTER --- */}
        <div className="flex justify-between items-center mb-4 border-t pt-4">
          <div className="text-xl font-semibold">Total: ${total.toFixed(2)}</div>
          <select className="border p-2 rounded" onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Categories</option><option>Food</option><option>Travel</option><option>Bills</option>
          </select>
        </div>

        {/* --- LIST --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 border-b">Date</th><th className="p-3 border-b">Description</th><th className="p-3 border-b">Category</th><th className="p-3 border-b text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{new Date(exp.date).toLocaleDateString()}</td>
                  <td className="p-3 border-b">{exp.description}</td>
                  <td className="p-3 border-b"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{exp.category}</span></td>
                  <td className="p-3 border-b text-right font-medium">${exp.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;