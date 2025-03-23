import { useState } from 'react'

export default function PromptPanel() {
  const [prompt, setPrompt] = useState('')

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 flex flex-col h-[300px]">
      <h2 className="text-lg font-semibold mb-3">Programming Prompt</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your programming prompt here..."
        className="flex-1 resize-none border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Generate Solution
      </button>
    </div>
  )
} 