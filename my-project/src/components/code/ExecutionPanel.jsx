import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodeEditor from './CodeEditor'
import OutputDisplay from './OutputDisplay'

export default function ExecutionPanel() {
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState(null)
  const [executionTime, setExecutionTime] = useState(null)
  
  const handleRunCode = (code, language) => {
    setIsRunning(true)
    setOutput(null)
    const startTime = performance.now()
    
    // Simulate code execution with enhanced output
    setTimeout(() => {
      const endTime = performance.now()
      setExecutionTime((endTime - startTime).toFixed(2))
      
      if (code.includes('error') || code.includes('throw')) {
        setOutput({
          status: 'error',
          message: 'Execution failed with errors',
          lines: [
            { type: 'info', prefix: '>', content: 'Starting execution...' },
            { type: 'error', prefix: '✖', content: 'Uncaught Error: Something went wrong!' },
            { type: 'error', prefix: ' ', content: 'at line 3, column 12' },
            { type: 'error', prefix: ' ', content: 'in function greet()' }
          ]
        })
      } else {
        setOutput({
          status: 'success',
          message: 'Code executed successfully',
          lines: [
            { type: 'info', prefix: '>', content: 'Starting execution...' },
            { type: 'info', prefix: '>', content: 'Hello, World!' },
            { type: 'success', prefix: '✓', content: 'Code executed successfully' },
            { type: 'info', prefix: 'i', content: `Execution time: ${executionTime}ms` }
          ]
        })
      }
      
      setIsRunning(false)
    }, 1500)
  }
  
  return (
    <div className="flex flex-col h-full space-y-4">
      <motion.div 
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CodeEditor 
          initialCode="// Welcome to the AI code sandbox\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));"
          onRun={handleRunCode}
        />
      </motion.div>
      <motion.div 
        className="h-1/3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <OutputDisplay 
          output={output} 
          isRunning={isRunning}
          executionTime={executionTime}
        />
      </motion.div>
    </div>
  )
}