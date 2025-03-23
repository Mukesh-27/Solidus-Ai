import { useState, useEffect } from 'react'
import MainLayout from "./components/layout/MainLayout"
import LeftPanel from "./components/layout/LeftPanel"
import RightPanel from "./components/layout/RightPanel"
import ThemeToggle from './components/common/ThemeToggle'
import ExecutionPanel from './components/code/ExecutionPanel'
import WorkflowSteps from './components/workflow/WorkflowSteps'
import Algorithm from './components/workflow/Algorith'
import Flowchart from './components/workflow/Flowchat'
import LoadingSpinner from './components/common/LoadingSpinner'

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [algorithm, setAlgorithm] = useState(null)
  const [flowchart, setFlowchart] = useState(null)
  const [generatedCode, setGeneratedCode] = useState(null)

  // Simulate AI processing workflow
  useEffect(() => {
    if (isProcessing) {
      // Reset states
      setCurrentStep(0)
      setAlgorithm(null)
      setFlowchart(null)
      setGeneratedCode(null)
      
      // Step 1: Analyze problem
      const timer1 = setTimeout(() => {
        setCurrentStep(1)
      }, 1500)
      
      // Step 2: Generate algorithm
      const timer2 = setTimeout(() => {
        setCurrentStep(2)
        setAlgorithm({
          steps: [
            "Parse input string to extract username and email",
            "Validate email format using regex",
            "Create user object with parsed data",
            "Store user in database",
            "Return success response with user ID"
          ]
        })
      }, 3000)
      
      // Step 3: Create flowchart
      const timer3 = setTimeout(() => {
        setCurrentStep(3)
        setFlowchart({
          id: 'flow-1',
          nodes: ['start', 'process', 'decision', 'end']
        })
      }, 4500)
      
      // Step 4: Generate code
      const timer4 = setTimeout(() => {
        setCurrentStep(4)
        setGeneratedCode(`// User registration function
function registerUser(userData) {
  const { username, email } = userData;
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  
  // Create user object
  const user = {
    id: generateId(),
    username,
    email,
    createdAt: new Date()
  };
  
  // Save to database (mock implementation)
  saveToDatabase(user);
  
  return {
    success: true,
    userId: user.id
  };
}`)
      }, 6000)
      
      // Complete
      const timer5 = setTimeout(() => {
        setIsProcessing(false)
      }, 7500)
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(timer4)
        clearTimeout(timer5)
      }
    }
  }, [isProcessing])

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="dark:bg-gray-900 min-h-screen">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Solidus AI Code Assistant
            </h1>
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <MainLayout>
            {{
              sidebar: (
                <LeftPanel 
                  isProcessing={isProcessing} 
                  setIsProcessing={setIsProcessing} 
                />
              ),
              main: (
                <div className="flex flex-col h-full gap-6">
                  <div className="flex-none">
                    <WorkflowSteps 
                      currentStep={currentStep} 
                      isProcessing={isProcessing} 
                    />
                  </div>
                  
                  {algorithm && (
                    <div className="flex-none">
                      <Algorithm algorithm={algorithm} />
                    </div>
                  )}
                  
                  {flowchart && (
                    <div className="flex-none">
                      <Flowchart flowData={flowchart} />
                    </div>
                  )}
                  
                  <div className="flex-1 min-h-[400px]">
                    {generatedCode ? (
                      <RightPanel initialCode={generatedCode} />
                    ) : (
                      <div className="h-full flex items-center justify-center bg-white dark:bg-[#1e1e2e] rounded-lg border border-gray-200 dark:border-gray-800">
                        {isProcessing ? (
                          <div className="text-center">
                            <LoadingSpinner size="lg" />
                            <p className="mt-4 text-gray-500 dark:text-gray-400">Generating code...</p>
                          </div>
                        ) : (
                          <div className="text-center max-w-md px-4">
                            <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                              No Code Generated Yet
                            </h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                              Describe your programming problem and the AI will generate a solution for you.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            }}
          </MainLayout>
        </main>
        
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Solidus AI Assistant • Built with React & TailwindCSS
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}