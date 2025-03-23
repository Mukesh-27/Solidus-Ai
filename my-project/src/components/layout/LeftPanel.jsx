import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function LeftPanel({ isProcessing, setIsProcessing }) {
  const [prompt, setPrompt] = useState('')
  const [activeSection, setActiveSection] = useState('input')
  
  return (
    <div className="flex flex-col h-full">
      {/* Section Tabs */}
      <div className="flex items-center px-2 pt-2 border-b border-gray-200/70 dark:border-gray-800/70 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <SidebarTab 
          active={activeSection === 'input'} 
          onClick={() => setActiveSection('input')}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
        >
          Input
        </SidebarTab>
        <SidebarTab 
          active={activeSection === 'history'} 
          onClick={() => setActiveSection('history')}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        >
          History
        </SidebarTab>
      </div>
      
      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/20">
        <AnimatePresence mode="wait">
          {activeSection === 'input' ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 space-y-4"
            >
              <div className="space-y-2">
                <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Describe Your Task
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Explain what you want to build or the problem you need to solve.
                </p>
              </div>

              <div className="bg-white/80 dark:bg-[#242938]/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/70 dark:border-gray-800/70 overflow-hidden">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Create a React component that fetches user data from an API and displays it in a responsive grid..."
                  className="w-full h-40 p-4 text-sm text-gray-700 dark:text-gray-200 bg-transparent resize-none focus:outline-none"
                />
                
                <div className="p-3 bg-gray-50 dark:bg-[#1e2235] border-t border-gray-200/70 dark:border-gray-700/70 flex justify-between items-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {prompt.length > 0 ? `${prompt.length} characters` : "Start typing..."}
                  </div>
                  
                  <motion.button
                    onClick={() => setIsProcessing(true)}
                    disabled={isProcessing || prompt.length < 3}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                      isProcessing || prompt.length < 3
                        ? "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                    whileHover={isProcessing || prompt.length < 3 ? {} : { scale: 1.02 }}
                    whileTap={isProcessing || prompt.length < 3 ? {} : { scale: 0.98 }}
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Generate Solution"
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Configuration Options */}
              <div className="bg-white dark:bg-[#242938] rounded-xl shadow-sm border border-gray-200/70 dark:border-gray-800/70 p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Configuration Options
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Programming Language
                    </div>
                    
                    <select className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                      <option>JavaScript</option>
                      <option>TypeScript</option>
                      <option>Python</option>
                      <option>Java</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Framework
                    </div>
                    
                    <select className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                      <option>React</option>
                      <option>Vue</option>
                      <option>Angular</option>
                      <option>None</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      AI Model
                    </div>
                    
                    <select className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                      <option>Standard</option>
                      <option>Advanced</option>
                      <option>Specialized</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4"
            >
              <div className="space-y-3">
                <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Recent Projects
                </h2>
                
                {[1, 2, 3].map(i => (
                  <div 
                    key={i}
                    className="p-3 bg-white dark:bg-[#242938] rounded-lg border border-gray-200/70 dark:border-gray-800/70 hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer"
                  >
                    <div className="font-medium text-sm text-gray-800 dark:text-gray-200">
                      {["User Authentication API", "Product Catalog Component", "Data Visualization Dashboard"][i-1]}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Created {["2 hours", "yesterday", "3 days"][i-1]} ago
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function SidebarTab({ children, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 text-sm rounded-t-lg mx-0.5 
        ${active
          ? 'bg-white dark:bg-[#242938] border-t border-l border-r border-gray-200/70 dark:border-gray-800/70 text-indigo-600 dark:text-indigo-400 font-medium -mb-px'
          : 'bg-gray-50 dark:bg-[#1e2235] border border-transparent hover:bg-gray-100 dark:hover:bg-[#1a1e2d] text-gray-600 dark:text-gray-400'
        }`}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </button>
  )
}