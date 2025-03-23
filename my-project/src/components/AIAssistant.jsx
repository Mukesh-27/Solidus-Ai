import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(true)

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const typingDots = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        animate={pulseAnimation}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ opacity: 0.2 }}
          />
          <motion.span 
            className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-2xl relative z-10">🤖</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="relative">
              <motion.div
                className="absolute -top-10 -right-6 w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full opacity-10 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 flex items-center justify-center"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <span className="text-sm">🤖</span>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    How can I help you with your code today?
                  </p>
                  
                  {isTyping && (
                    <motion.div 
                      className="flex gap-1 mt-2"
                      initial="initial"
                      animate="animate"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          variants={typingDots}
                          className="w-2 h-2 rounded-full bg-emerald-500"
                          style={{ display: 'inline-block' }}
                          transition={{ delay: i * 0.2 }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Type your question..."
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-sm"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 