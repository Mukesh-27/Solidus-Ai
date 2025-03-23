import { motion, AnimatePresence } from 'framer-motion'

export default function OutputDisplay({ output, isRunning, executionTime }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success': return 'text-green-600 dark:text-green-400'
      case 'error': return 'text-red-600 dark:text-red-400'
      case 'warning': return 'text-yellow-600 dark:text-yellow-400'
      case 'info': return 'text-blue-600 dark:text-blue-400'
      default: return 'text-gray-400 dark:text-gray-500'
    }
  }

  return (
    <div className="h-full bg-white dark:bg-[#1e1e2e] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="px-4 py-3 bg-gray-50 dark:bg-[#252540] border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Console Output</span>
          </div>
          {executionTime && !isRunning && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Executed in {executionTime}ms
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 h-[calc(100%-3rem)] overflow-auto font-mono text-sm">
        <AnimatePresence mode="wait">
          {isRunning ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400"
            >
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Executing code...</span>
            </motion.div>
          ) : output ? (
            <motion.div
              key="output"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {output.lines?.map((line, idx) => (
                <motion.div 
                  key={idx} 
                  className={`${getStatusColor(line.type)} flex items-start`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {line.prefix && (
                    <span className="text-gray-500 dark:text-gray-400 mr-2 font-bold">
                      {line.prefix}
                    </span>
                  )}
                  <span className="font-mono">{line.content}</span>
                </motion.div>
              ))}
              {output.message && (
                <motion.div 
                  className={`mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-800/50 ${getStatusColor(output.status)}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (output.lines?.length || 0) * 0.1 }}
                >
                  {output.status === 'error' ? '❌ ' : output.status === 'success' ? '✅ ' : ''}
                  {output.message}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 dark:text-gray-500 italic"
            >
              Run your code to see output here...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}