import { useState } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder login logic
    if (password === '2448766') { // Actual implementation will use JWT and server-side verification
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/secretary-admin/dashboard');
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-serif p-4"
    >
        <div className="w-full max-w-md bg-white p-8 border border-gray-300 shadow-sm">
            <h1 className="text-3xl font-black mb-2 uppercase tracking-tight">Archive Control Center</h1>
            <p className="text-gray-500 mb-6 italic text-sm">Authorized editorial access only.</p>
            <form onSubmit={handleLogin}>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-none mb-4"
                    placeholder="Enter Password"
                />
                <button type="submit" className="w-full p-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors font-bold uppercase tracking-widest text-sm">
                    Login
                </button>
            </form>
        </div>
    </motion.div>
  );
}
