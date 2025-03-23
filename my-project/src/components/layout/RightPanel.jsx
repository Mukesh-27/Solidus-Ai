import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RightPanel() {
  const [activeTab, setActiveTab] = useState('code')
  const [isRunning, setIsRunning] = useState(false)
  const [code, setCode] = useState('// Generated code will appear here\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconst result = greet("World");\nconsole.log(result);')
  const [selectedFile, setSelectedFile] = useState('main.js')
  
  // Mock files for file explorer
  const files = [
    { id: 'main', name: 'main.js', icon: 'js' },
    { id: 'utils', name: 'utils.js', icon: 'js' },
    { id: 'styles', name: 'styles.css', icon: 'css' }
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="p-3 bg-white dark:bg-[#242938] border-b border-gray-200/70 dark:border-gray-800/70 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex space-x-1.5 mr-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          <FileMenu files={files} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-1.5 rounded text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button className="p-1.5 rounded text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-2 pt-2 bg-gray-50 dark:bg-[#1e2235] border-b border-gray-200/70 dark:border-gray-800/70">
        <TabButton 
          active={activeTab === 'code'} 
          onClick={() => setActiveTab('code')}
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          Editor
        </TabButton>
        <TabButton 
          active={activeTab === 'output'} 
          onClick={() => setActiveTab('output')}
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          Output
        </TabButton>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === 'code' ? (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col"
            >
              {/* Line Numbers + Code */}
              <div className="flex-1 overflow-auto bg-white dark:bg-[#242938] font-mono text-sm">
                <div className="flex">
                  {/* Line Numbers */}
                  <div className="text-right pr-4 py-4 select-none bg-gray-50 dark:bg-[#1e2235] text-gray-400 dark:text-gray-600 border-r border-gray-200/70 dark:border-gray-800/70">
                    {code.split('\n').map((_, i) => (
                      <div key={i} className="leading-6 px-2.5">{i + 1}</div>
                    ))}
                  </div>
                  
                  {/* Code Editor */}
                  <div className="flex-1 p-4">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full leading-6 text-gray-800 dark:text-gray-200 bg-transparent resize-none focus:outline-none"
                      spellCheck="false"
                    />
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="p-3 bg-gray-50 dark:bg-[#1e2235] border-t border-gray-200/70 dark:border-gray-800/70 flex justify-between items-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {code.split('\n').length} lines | JavaScript
                </div>
                
                <motion.button
                  onClick={() => {
                    setIsRunning(true);
                    setActiveTab('output');
                    setTimeout(() => setIsRunning(false), 1500);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <div className="flex items-center space-x-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Run Code</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="output"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col"
            >
              <div className="flex-1 overflow-auto bg-white dark:bg-[#242938] p-4">
                <div className="p-4 bg-gray-50 dark:bg-[#1e2235] rounded-lg border border-gray-200/70 dark:border-gray-800/70 font-mono text-sm">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 border-b border-gray-200/70 dark:border-gray-800/70 pb-2 mb-3">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Console Output</span>
                  </div>
                  
                  {isRunning ? (
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Running code...</span>
                    </div>
                  ) : (
                    <div className="text-green-600 dark:text-green-400">
                      > Hello, World!
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-[#1e2235] border-t border-gray-200/70 dark:border-gray-800/70 flex justify-between items-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Execution completed in 0.05s
                </div>
                
                <motion.button
                  onClick={() => setActiveTab('code')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Back to Editor
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Tab Button Component
function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 text-sm border-t border-l border-r rounded-t-lg mr-1
        ${active
          ? 'bg-white dark:bg-[#242938] border-gray-200/70 dark:border-gray-800/70 text-indigo-600 dark:text-indigo-400 font-medium'
          : 'bg-gray-50 dark:bg-[#1e2235] border-transparent hover:bg-gray-100 dark:hover:bg-[#1a1e2d] text-gray-600 dark:text-gray-400'
        }`}
    >
      {children}
    </button>
  )
}

// File Menu Component
function FileMenu({ files, selectedFile, setSelectedFile }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const getFileIcon = (icon) => {
    switch(icon) {
      case 'js':
        return <span className="text-yellow-400">JS</span>
      case 'css':
        return <span className="text-blue-400">CSS</span>
      default:
        return <span className="text-gray-400">F</span>
    }
  }
  
  const currentFile = files.find(f => f.name === selectedFile) || files[0]
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-2 py-1 text-sm rounded border border-gray-200/50 dark:border-gray-800/50 text-gray-700 dark:text-gray-300"
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 flex items-center justify-center text-xs">
            {getFileIcon(currentFile.icon)}
          </div>
          <span>{currentFile.name}</span>
        </div>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-48 bg-white dark:bg-[#242938] rounded-md shadow-lg border border-gray-200/70 dark:border-gray-800/70 z-10">
          <div className="py-1">
            {files.map(file => (
              <button
                key={file.id}
                onClick={() => {
                  setSelectedFile(file.name)
                  setIsOpen(false)
                }}
                className={`flex items-center w-full px-3 py-2 text-sm text-left
                  ${file.name === selectedFile 
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
              >
                <div className="w-4 h-4 flex items-center justify-center text-xs mr-2">
                  {getFileIcon(file.icon)}
                </div>
                {file.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}