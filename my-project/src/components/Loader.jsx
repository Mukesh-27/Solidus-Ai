import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-blue-950 to-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          {/* Code Block Animation */}
          <div className="w-16 h-16 mb-4 relative">
            <motion.div
              animate={{
                borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 40% 60% / 60% 60% 40% 40%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-75"
            />
            {/* Code Symbol */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-jetbrains">
              {'</>'}
            </div>
          </div>
          
          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-400 font-medium tracking-wider font-inter"
          >
            Initializing AI...
          </motion.div>
          
          {/* Loading Dots */}
          <div className="flex gap-1 mt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 rounded-full bg-blue-500"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 