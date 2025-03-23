import './App.css'
import Layout from './components/Layout'
import CodePanel from './components/CodePanel'
import PromptPanel from './components/PromptPanel'
import WorkflowPanel from './components/WorkflowPanel'

export default function App() {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-4rem)]">
        {/* Left Panel */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <PromptPanel />
          <WorkflowPanel />
        </div>
        
        {/* Right Panel */}
        <div className="lg:w-1/2">
          <CodePanel />
        </div>
      </div>
    </Layout>
  )
}
