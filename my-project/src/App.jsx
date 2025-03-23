import { useState, useEffect } from 'react'
import './App.css'
import Layout from './components/Layout'
import CodePanel from './components/CodePanel'
import PromptPanel from './components/PromptPanel'
import WorkflowPanel from './components/WorkflowPanel'
import AIAssistant from './components/AIAssistant'
import Loader from './components/Loader'
import { ResizableBox } from 'react-resizable'
import { FiCode, FiTerminal, FiCpu } from 'react-icons/fi'
import { motion } from 'framer-motion'
import GenerationAnimation from './components/GenerationAnimation'

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [generatedCode, setGeneratedCode] = useState('')
  const [algorithm, setAlgorithm] = useState('')
  const [language, setLanguage] = useState('python')

  // Calculate initial width based on viewport
  const [initialWidth, setInitialWidth] = useState(0)

  useEffect(() => {
    // Set initial width to half of the viewport width minus padding
    const calculateWidth = () => {
      const viewportWidth = window.innerWidth
      const padding = 32 // 2rem (16px * 2) for p-4 on both sides
      setInitialWidth(Math.floor((viewportWidth - padding) / 2))
    }

    calculateWidth()
    window.addEventListener('resize', calculateWidth)
    return () => window.removeEventListener('resize', calculateWidth)
  }, [])

  useEffect(() => {
    // Simulate initialization time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleGenerate = async (prompt) => {
    setIsGenerating(true)
    setCurrentStep(0)
    setGeneratedCode('') // Clear any previous code
    try {
      // Let the PromptPanel handle the API calls and code generation
      // The code will be set via setGeneratedCode prop
      await new Promise(resolve => setTimeout(resolve, 2000)) // Generation animation
      
    } finally {
      setIsGenerating(false)
      setCurrentStep(4) // Complete
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
      <GenerationAnimation isGenerating={isGenerating} />
      {/* Enhanced Background Animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-900/30 to-purple-900/30 blur-3xl -left-1/4 -top-1/4"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-800/20 to-indigo-800/20 blur-3xl right-0 top-1/2"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                x: [null, Math.random() * window.innerWidth],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
            />
          ))}
        </div>

        {/* Glowing Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-black/50" />
      </div>
      
      <div className="fixed inset-0 pt-16 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex h-full"
        >
          {/* Left Panel - Now with dynamic initial width */}
          <ResizableBox
            width={initialWidth}
            height={Infinity}
            minConstraints={[320, Infinity]}
            maxConstraints={[800, Infinity]}
            className="h-[calc(100vh-4rem)]"
            handle={
              <div className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-blue-500/20 transition-colors duration-200">
                <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-blue-500/20 via-blue-500/40 to-blue-500/20"></div>
              </div>
            }
            resizeHandles={['e']}
            axis="x"
          >
            <div className="h-full flex flex-col gap-4 p-4">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="h-1/2 min-h-0"
              >
                <PromptPanel 
                  isDarkMode={isDarkMode} 
                  icon={<FiTerminal className="w-5 h-5" />}
                  onGenerate={handleGenerate}
                  setWorkflowStep={setCurrentStep}
                  setGeneratedCode={setGeneratedCode}
                  setAlgorithm={setAlgorithm}
                  setLanguage={setLanguage}
                />
              </motion.div>
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="h-1/2 min-h-0"
              >
                <WorkflowPanel 
                  isDarkMode={isDarkMode} 
                  icon={<FiCpu className="w-5 h-5" />}
                  isGenerating={isGenerating}
                  currentStep={currentStep}
                  algorithm={algorithm}
                />
              </motion.div>
            </div>
          </ResizableBox>
          
          {/* Right Panel - Will take remaining space */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1 h-[calc(100vh-4rem)] p-4 min-w-[400px]"
          >
            <CodePanel 
              isDarkMode={isDarkMode}
              icon={<FiCode className="w-5 h-5" />}
              isGenerating={isGenerating}
              generatedCode={generatedCode}
              language={language}
            />
          </motion.div>
        </motion.div>
      </div>
      <AIAssistant isDarkMode={isDarkMode} />
    </Layout>
  )
}
