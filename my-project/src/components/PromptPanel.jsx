import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function PromptPanel({ isDarkMode, icon, onGenerate, setWorkflowStep, setGeneratedCode, setAlgorithm, setLanguage }) {
  const [prompt, setPrompt] = useState('')
  const [language, setLocalLanguage] = useState('python') // Renamed to avoid confusion
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)

  // Update parent component's language state when local language changes
  useEffect(() => {
    setLanguage(language)
  }, [language])

  const handleLanguageChange = (e) => {
    setLocalLanguage(e.target.value)
  }

  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' }
  ]

  const sendPromptToBackend = async (promptText, selectedLanguage) => {
    try {
      console.log('📤 Sending prompt to display:', promptText, 'Language:', selectedLanguage)
      setWorkflowStep(0) // Start workflow

      // First, display the prompt in index.html
      const formData = new URLSearchParams();
      formData.append('prompt', promptText);
      formData.append('language', selectedLanguage);
      
      const displayResponse = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      });

      if (!displayResponse.ok) {
        const errorData = await displayResponse.json();
        throw new Error(errorData.error || 'Failed to display prompt');
      }

      // Wait a moment to ensure the prompt is displayed
      await new Promise(resolve => setTimeout(resolve, 500));

      // Then proceed with AI processing
      const response = await fetch('http://localhost:5000/api/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: promptText,
          language: selectedLanguage 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process prompt with AI');
      }

      const data = await response.json();
      console.log('📥 Received response from backend:', data);
      
      if (!data.algorithm || !data.code) {
        throw new Error('Invalid response from server');
      }
      
      // Update workflow steps as data is received
      setWorkflowStep(1); // Algorithm received
      setAlgorithm(data.algorithm);
      
      setTimeout(() => {
        setWorkflowStep(2); // Code generation
        console.log('💻 Setting generated code:', data.code);
        setGeneratedCode(data.code);
        setTimeout(() => {
          setWorkflowStep(3); // Complete
        }, 500);
      }, 1000);

      return data;
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message || 'An unexpected error occurred');
      throw err;
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setError(null);
    setGeneratedCode('');
    setAlgorithm('');
    setWorkflowStep(0);
    
    try {
      console.log('🚀 Starting generation process...');
      const response = await sendPromptToBackend(prompt, language);
      console.log('✨ Generation completed successfully!');
      
      if (onGenerate) {
        onGenerate(response);
      }
    } catch (err) {
      console.error('💥 Generation failed:', err);
      setError(err.message || 'An error occurred while processing your request');
      setWorkflowStep(0);
    } finally {
      setIsGenerating(false);
      console.log('🏁 Process finished');
    }
  };
  
  return (
    <div className="h-full rounded-xl bg-black/50 p-4 backdrop-blur-lg border border-blue-900 shadow-lg flex flex-col font-inter">
      <h2 className="text-base font-semibold mb-3 text-white tracking-wide flex items-center gap-2">
        {icon}
        AI Prompt
      </h2>
      <div className="flex-1 flex flex-col">
        {/* Language Selection Dropdown */}
        <div className="mb-3">
          <select
            value={language}
            onChange={handleLanguageChange}
            disabled={isGenerating}
            className="w-full p-2 text-sm rounded-lg bg-blue-950/50 text-white border-blue-900 border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value} className="bg-blue-900">
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to create..."
          disabled={isGenerating}
          className="flex-1 w-full p-2 text-sm rounded-lg bg-blue-950/50 text-white placeholder-blue-300 border-blue-900 border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none custom-scrollbar font-inter leading-relaxed disabled:opacity-50"
        />
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-2"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          whileHover={{ scale: isGenerating ? 1 : 1.02 }}
          whileTap={{ scale: isGenerating ? 1 : 0.98 }}
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className={`mt-3 w-full py-1.5 px-3 text-sm rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 tracking-wide flex items-center justify-center gap-2
            ${isGenerating ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-xl'}`}
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
              Generating...
            </>
          ) : (
            'Generate Code ✨'
          )}
        </motion.button>
      </div>
    </div>
  )
} 