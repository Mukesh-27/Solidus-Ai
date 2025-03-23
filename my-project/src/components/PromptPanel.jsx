import { useState } from 'react'

export default function PromptPanel() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const handleSubmit = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      })

      const data = await response.json()
      setResponse(data)
      console.log('Response from backend:', data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 flex flex-col h-[300px]">
      <h2 className="text-lg font-semibold mb-3">Programming Prompt</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your programming prompt here..."
        className="flex-1 resize-none border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <button 
        onClick={handleSubmit}
        disabled={isLoading}
        className={`mt-3 px-4 py-2 rounded-lg transition-colors ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isLoading ? 'Generating...' : 'Generate Solution'}
      </button>
      
      {response && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">{response.message}</p>
        </div>
      )}
    </div>
  )
} 