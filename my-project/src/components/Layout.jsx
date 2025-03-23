import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <nav className="border-b p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-primary">Solidus AI Demo</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}