import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CodeEditor({ initialCode = "// Write your code here...", onRun }) {
  const [code, setCode] = useState(initialCode)
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  
  const languages = [
    { id: 'javascript', label: 'JavaScript', extension: '.js' },
    { id: 'typescript', label: 'TypeScript', extension: '.ts' },
    { id: 'python', label: 'Python', extension: '.py' },
  ]

  const lines = code.split('\n')

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1e1e2e] rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-[#252540] border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="text-xs bg-gray-100 dark:bg-[#2b2b50] px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.label}</option>
            ))}
          </select>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          main{languages.find(l => l.id === selectedLanguage).extension}
        </div>
      </div>
      
      {/* Editor Body */}
      <div className="flex-1 overflow-auto">
        <div className="flex h-full font-mono text-sm">
          {/* Line Numbers */}
          <div className="select-none px-2 py-4 text-right bg-gray-50 dark:bg-[#252540] text-gray-400 dark:text-gray-600 border-r border-gray-200 dark:border-gray-800">
            {lines.map((_, i) => (
              <div key={i} className="px-2 leading-6">{i + 1}</div>
            ))}
          </div>
          
          {/* Code */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 px-4 py-4 bg-white dark:bg-[#1e1e2e] text-gray-800 dark:text-gray-200 resize-none outline-none leading-6"
            spellCheck="false"
          />
        </div>
      </div>
      
      {/* Editor Footer */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-[#252540] border-t border-gray-200 dark:border-gray-800">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {lines.length} lines | {selectedLanguage}
        </div>
        <motion.button
          onClick={() => onRun && onRun(code, selectedLanguage)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
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