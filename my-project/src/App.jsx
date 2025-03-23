import { useState } from 'react'
import Layout from './Components/Layout'
import CodeEditor from './Components/CodeEditor'
import WorkflowVisualizer from './Components/WorkflowVisualizer'
import AIOutput from './Components/AiOutput'
import StatusPanel from './Components/StatusPanel'
import './App.css'

export default function App() {
  const [code, setCode] = useState('// Write your code here')
  const [currentStage, setCurrentStage] = useState(1)
  const [status, setStatus] = useState('idle')
  const [messages, setMessages] = useState([
    { type: 'ai', content: 'Hello! I\'m ready to help you with your code.' }
  ])

  const simulateAIProcess = async () => {
    setStatus('running')
    for (let i = 1; i <= 6; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCurrentStage(i)
    }
    setStatus('completed')
    setMessages(prev => [...prev, {
      type: 'ai',
      content: 'Analysis complete! Your code looks good.'
    }])
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <CodeEditor
            value={code}
            onChange={setCode}
          />
        </div>
        <div>
          <AIOutput messages={messages} />
        </div>
      </div>
      <WorkflowVisualizer currentStage={currentStage} />
      <StatusPanel status={status} />
      
      <div className="fixed bottom-4 left-4">
        <button
          onClick={simulateAIProcess}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Run AI Analysis
        </button>
      </div>
    </Layout>
  )
}
