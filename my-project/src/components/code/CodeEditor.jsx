import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CodeEditor({ initialCode = "// Write your code here...", onRun }) {
  const [code, setCode] = useState(initialCode)
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [isSaving, setIsSaving] = useState(false)
  
  const languages = [
    { id: 'javascript', label: 'JavaScript', extension: '.js', color: 'text-yellow-400' },
    { id: 'typescript', label: 'TypeScript', extension: '.ts', color: 'text-blue-400' },
    { id: 'python', label: 'Python', extension: '.py', color: 'text-green-400' },
  ]

  // Auto-save effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSaving(true)
      // Simulate saving
      setTimeout(() => setIsSaving(false), 800)
    }, 1000)
    return () => clearTimeout(timer)
  }, [code])

  const lines = code.split('\n')

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1e1e2e] rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      {/* Enhanced Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-[#252540] border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
          </div>
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="text-xs bg-gray-100 dark:bg-[#2b2b50] px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-3">
          {isSaving && (
            <span className="text-xs text-gray-400 dark:text-gray-500 animate-fade-in">
              Saving...
            </span>
          )}
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <span className={languages.find(l => l.id === selectedLanguage).color}>●</span>
            <span className="ml-1">main{languages.find(l => l.id === selectedLanguage).extension}</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Editor Body */}
      <div className="flex-1 overflow-auto">
        <div className="flex h-full font-mono text-sm">
          {/* Line Numbers with enhanced styling */}
          <div className="select-none px-2 py-4 text-right bg-gray-50 dark:bg-[#252540] text-gray-400 dark:text-gray-600 border-r border-gray-200 dark:border-gray-800">
            {lines.map((_, i) => (
              <div key={i} className="px-2 leading-6 hover:text-indigo-400 transition-colors">{i + 1}</div>
            ))}
          </div>
          
          {/* Code with syntax highlighting (simplified version) */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 px-4 py-4 bg-white dark:bg-[#1e1e2e] text-gray-800 dark:text-gray-200 resize-none outline-none leading-6 focus:ring-1 focus:ring-indigo-500/20"
            spellCheck="false"
          />
        </div>
      </div>
      
      {/* Enhanced Editor Footer */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-[#252540] border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <span>{lines.length} lines</span>
          <span>|</span>
          <span className={languages.find(l => l.id === selectedLanguage).color}>
            {languages.find(l => l.id === selectedLanguage).label}
          </span>
        </div>
        <motion.button
          onClick={() => onRun && onRun(code, selectedLanguage)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm hover:shadow transition-all"
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Run Code
        </motion.button>
      </div>
    </div>
  )
}