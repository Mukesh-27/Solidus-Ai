import { useState } from 'react'
import CodeEditor from './CodeEditor'
import OutputDisplay from './OutputDisplay'

export default function ExecutionPanel() {
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState(null)
  
  const handleRunCode = (code, language) => {
    setIsRunning(true)
    setOutput(null)
    
    // Simulate code execution
    setTimeout(() => {
      // Example outputs
      let result;
      
      if (code.includes('error') || code.includes('throw')) {
        result = {
          status: 'error',
          message: 'Uncaught Error: Something went wrong!',
          lines: [
            { type: 'error', prefix: '>', content: 'Uncaught Error: Something went wrong!' },
            { type: 'error', prefix: ' ', content: 'at line 3, column 12' },
          ]
        };
      } else {
        result = {
          status: 'success',
          message: 'Code executed successfully!',
          lines: [
            { type: 'info', prefix: '>', content: 'Hello, World!' },
            { type: 'success', prefix: '>', content: 'Code executed successfully!' },
          ]
        };
      }
      
      setOutput(result);
      setIsRunning(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex-1">
        <CodeEditor 
          initialCode="// Welcome to the AI code sandbox\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));"
          onRun={handleRunCode}
        />
      </div>
      <div className="h-1/3">
        <OutputDisplay output={output} isRunning={isRunning} />
      </div>
    </div>
  )
}