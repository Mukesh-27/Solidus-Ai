import { useState, useEffect } from 'react'
import MainLayout from "../layout/MainLayout";
import LeftPanel from "../layout/LeftPanel";
import RightPanel from "../layout/RightPanel";
import ThemeToggle from '../common/ThemeToggle'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  
  // Simulate workflow progression when processing starts
  useEffect(() => {
    let interval;
    if (isProcessing) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          if (nextStep > 4) {
            setIsProcessing(false);
            return prev;
          }
          return nextStep;
        });
      }, 2000);
    } else {
      // Reset when not processing
      if (currentStep === 5) {
        // Keep final step visible for a while
        setTimeout(() => setCurrentStep(0), 3000);
      }
    }
    
    return () => clearInterval(interval);
  }, [isProcessing, currentStep]);

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
      
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>AI processing your request...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <MainLayout>
        {{
          sidebar: (
            <LeftPanel 
              isProcessing={isProcessing} 
              setIsProcessing={setIsProcessing}
              currentStep={currentStep}
            />
          ),
          main: (
            <RightPanel 
              isProcessing={isProcessing}
            />
          )
        }}
      </MainLayout>
    </div>
  )
}