import { createContext, useContext, useState } from 'react'

const AIContext = createContext()

export function AIProvider({ children }) {
  const [history, setHistory] = useState([])
  const [settings, setSettings] = useState({
    model: 'standard',
    language: 'javascript',
    framework: 'react'
  })
  
  const addToHistory = (prompt, response) => {
    setHistory(prev => [{
      id: Date.now(),
      prompt,
      response,
      timestamp: new Date().toISOString()
    }, ...prev])
  }

  const clearHistory = () => setHistory([])

  return (
    <AIContext.Provider value={{ 
      history, 
      addToHistory, 
      clearHistory,
      settings,
      setSettings 
    }}>
      {children}
    </AIContext.Provider>
  )
}

export const useAI = () => useContext(AIContext)
