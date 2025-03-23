import { motion, AnimatePresence } from 'framer-motion'
import { FiCpu, FiCode, FiTerminal, FiBox, FiCheckCircle } from 'react-icons/fi'

export default function GenerationAnimation({ isGenerating }) {
  const steps = [
    { id: 1, title: 'Analyzing Prompt', icon: FiTerminal, delay: 0 },
    { id: 2, title: 'AI Agents Processing', icon: FiBox, delay: 1 },
    { id: 3, title: 'Generating Algorithm', icon: FiCpu, delay: 2 },
    { id: 4, title: 'Writing Code', icon: FiCode, delay: 3 },
  ]

  return (
    <AnimatePresence>
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="relative w-[400px] bg-black/50 rounded-xl border border-blue-800/50 p-6 font-display"
          >
            {/* Neural Network Animation */}
            <div className="relative w-full h-24 mb-6">
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              {/* Neural Network Nodes */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Steps Animation */}
            <div className="space-y-3">
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: step.delay * 0.5 }}
                  className="bg-blue-950/50 border border-blue-800/50 rounded-lg p-3 flex items-center gap-3"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: step.delay * 0.5,
                    }}
                    className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"
                  >
                    <step.icon className="w-4 h-4" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-sm text-blue-300 font-medium tracking-wide">
                      {step.title}
                    </h3>
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 2,
                        delay: step.delay * 0.5,
                        ease: "easeInOut"
                      }}
                      className="h-0.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mt-2"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Binary Rain Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none font-mono">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -20, x: Math.random() * 400 }}
                  animate={{ y: 400 }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 2
                  }}
                  className="absolute text-blue-500/20"
                >
                  {Math.random() > 0.5 ? "1" : "0"}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 