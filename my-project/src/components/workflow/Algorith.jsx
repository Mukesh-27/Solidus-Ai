import { motion } from 'framer-motion'

export default function Algorithm({ algorithm }) {
  if (!algorithm) return null;
  
  return (
    <div className="bg-white dark:bg-[#1e1e2e] rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 dark:bg-[#252540] border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated Algorithm</h3>
        </div>
      </div>
      
      <div className="p-4">
        <ol className="space-y-2 list-decimal list-inside text-sm text-gray-700 dark:text-gray-300">
          {algorithm.steps.map((step, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {step}
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  )
}