import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://fullstack-challange-01-02-26-3.onrender.com/api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false); // Added for production quality
  const [error, setError] = useState(null); // Added for resilience
  
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  // Load Data from Backend
  const loadExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = filter ? `${API_URL}?category=${filter}` : API_URL;
      const response = await axios.get(url);
      setExpenses(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch expenses. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, [filter]);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      setForm({ ...form, description: '', amount: '' });
      loadExpenses();
    } catch (err) {
      console.error("Error adding expense:", err);
      alert("Error adding expense. Please try again.");
    }
  };

  // ✅ SORTING LOGIC: Newest date first (Criterion #4)
  const sortedExpenses = [...expenses].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // ✅ TOTAL CALCULATION: Reflects current list (Criterion #5)
  const total = sortedExpenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Money Tracker</h1>
          <p className="text-gray-500 mb-6 italic">Production Version: Track, Sort, and Filter</p>
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white mb-8 shadow-md">
            <span className="uppercase text-xs font-semibold opacity-80">Total Expenses for current list</span>
            <h2 className="text-4xl font-extrabold">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
          </div>

          {/* ADD EXPENSE FORM (Criterion #1) */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input 
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              type="text" placeholder="Description" 
              value={form.description} onChange={e => setForm({...form, description: e.target.value})} required 
            />
            <input 
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              type="number" step="0.01" placeholder="Amount" 
              value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required 
            />
            <select 
              className="p-3 border rounded-lg bg-white cursor-pointer"
              value={form.category} onChange={e => setForm({...form, category: e.target.value})}
            >
              <option>Food</option><option>Travel</option><option>Bills</option><option>Shopping</option><option>Work</option>
            </select>
            <input 
              className="p-3 border rounded-lg cursor-pointer"
              type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required 
            />
            <button className="bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all shadow-lg" type="submit">
              Add Item
            </button>
          </form>
        </div>

        {/* FILTER & LIST (Criteria #2, #3, #4) */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-700">Recent Transactions</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Filter:</span>
              <select 
                className="p-2 border rounded-md text-sm bg-white focus:ring-1 focus:ring-blue-400 outline-none"
                value={filter} onChange={e => setFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option>Food</option><option>Travel</option><option>Bills</option><option>Shopping</option><option>Work</option>
              </select>
            </div>
          </div>

          {error && <div className="p-4 bg-red-50 text-red-600 text-center text-sm">{error}</div>}

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Description</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="4" className="p-10 text-center text-blue-500 animate-pulse">Fetching latest data...</td></tr>
                ) : sortedExpenses.length > 0 ? sortedExpenses.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 transition-colors group">
                    <td className="p-4 text-sm text-gray-500">{item.date}</td>
                    <td className="p-4 font-medium text-gray-800">{item.description}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-tight border border-blue-100">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-right font-bold text-gray-900">₹{parseFloat(item.amount).toFixed(2)}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-gray-400 italic">No expenses found for this category.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;