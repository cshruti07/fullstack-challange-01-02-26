import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Replace the old localhost URL with your Render link
const API_URL = "https://fullstack-challange-01-02-26-3.onrender.com/api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('');
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0] // Default to today: YYYY-MM-DD
  });

  // Load Data from Backend
  const loadExpenses = async () => {
    try {
      const url = filter ? `${API_URL}?category=${filter}` : API_URL;
      const response = await axios.get(url);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, [filter]);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form as-is (date is already YYYY-MM-DD)
      await axios.post(API_URL, form);
      
      // Reset form fields
      setForm({ ...form, description: '', amount: '' });
      
      // Refresh the table immediately
      loadExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Status: " + error.response?.status);
    }
  };

  const total = expenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Money Tracker</h1>
          <p className="text-gray-500 mb-6">Manage your daily expenses efficiently</p>
          
          <div className="bg-blue-600 rounded-xl p-6 text-white mb-8">
            <span className="uppercase text-xs font-semibold opacity-70">Total Balance Used</span>
            <h2 className="text-4xl font-bold">${total.toFixed(2)}</h2>
          </div>

          {/* ADD EXPENSE FORM */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input 
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              type="text" placeholder="Description" 
              value={form.description} onChange={e => setForm({...form, description: e.target.value})} required 
            />
            <input 
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              type="number" step="0.01" placeholder="Amount" 
              value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required 
            />
            <select 
              className="p-3 border rounded-lg bg-white"
              value={form.category} onChange={e => setForm({...form, category: e.target.value})}
            >
              <option>Food</option><option>Travel</option><option>Bills</option><option>Shopping</option>
            </select>
            <input 
              className="p-3 border rounded-lg"
              type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required 
            />
            <button className="bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg" type="submit">
              Add Expense
            </button>
          </form>
        </div>

        {/* FILTER & LIST */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-gray-700">Recent Transactions</h3>
            <select 
              className="p-2 border rounded-md text-sm bg-white"
              value={filter} onChange={e => setFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option>Food</option><option>Travel</option><option>Bills</option><option>Shopping</option>
            </select>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm uppercase">
                <th className="p-4">Date</th>
                <th className="p-4">Description</th>
                <th className="p-4">Category</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.length > 0 ? expenses.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50 transition">
                  <td className="p-4 text-sm text-gray-600">{item.date}</td>
                  <td className="p-4 font-semibold text-gray-800">{item.description}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold text-gray-900">${item.amount}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-gray-400">No expenses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;