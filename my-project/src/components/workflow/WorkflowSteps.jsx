import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  { id: 1, title: 'Analyze Problem', description: 'Understanding the requirements' },
  { id: 2, title: 'Generate Algorithm', description: 'Creating solution approach' },
  { id: 3, title: 'Write Code', description: 'Implementing the solution' },
  { id: 4, title: 'Test Solution', description: 'Verifying correctness' },
  { id: 5, title: 'Optimize', description: 'Improving performance' },
]

export default function WorkflowSteps({ currentStep = 0, isProcessing = false }) {
  return (
    <div className="p-4 bg-white dark:bg-[#1e1e2e] rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        AI Solution Workflow
      </h3>
      
      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute top-5 left-3 right-3 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
        <div 
          className="absolute top-5 left-3 h-0.5 bg-blue-500"
          style={{ width: `${Math.max(0, (currentStep / (steps.length - 1)) * 100)}%` }}
        ></div>
        
        {/* Steps */}
        <div className="flex justify-between items-start mb-2 relative">
          {steps.map((step, index) => {
            const isActive = currentStep === index;
            const isComplete = currentStep > index;
            
            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <motion.div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center
                    ${isComplete 
                      ? 'bg-blue-500 text-white' 
                      : isActive 
                        ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 text-blue-500 dark:text-blue-400' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'}`}
                  animate={{ scale: isActive && isProcessing ? [1, 1.1, 1] : 1 }}
                  transition={{ repeat: isActive && isProcessing ? Infinity : 0, duration: 1 }}
                >
                  {isComplete ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-xs">{step.id}</span>
                  )}
                </motion.div>
                <div className="text-center mt-2">
                  <div className={`text-xs font-medium
                    ${isComplete 
                      ? 'text-blue-500' 
                      : isActive 
                        ? 'text-gray-900 dark:text-gray-100' 
                        : 'text-gray-400 dark:text-gray-500'}`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 max-w-[80px] truncate">
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Current Step Details */}
      <AnimatePresence mode="wait">
        {currentStep < steps.length && (
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-3 bg-gray-50 dark:bg-[#252540] rounded-md border border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-start">
              <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center
                ${isProcessing 
                  ? 'bg-blue-100 dark:bg-blue-900/30' 
                  : 'bg-green-100 dark:bg-green-900/30'}`}>
                {isProcessing ? (
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                ) : (
                  <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {steps[currentStep].title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {isProcessing ? 'In progress...' : 'Completed'}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}