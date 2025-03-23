import { motion } from 'framer-motion'
import Editor from "@monaco-editor/react"
import { useState, useEffect } from 'react'

export default function CodePanel({ isDarkMode, icon, isGenerating, generatedCode, language = 'python' }) {
  const defaultCode = '# Your AI-generated code will appear here\n'
  const [displayedCode, setDisplayedCode] = useState(defaultCode)
  const [editorLanguage, setEditorLanguage] = useState(language)

  // Map language values to Monaco editor language IDs
  const languageMap = {
    'python': 'python',
    'javascript': 'javascript',
    'java': 'java',
    'cpp': 'cpp'
  }

  useEffect(() => {
    // Update editor language when the language prop changes
    setEditorLanguage(languageMap[language] || language)
  }, [language])

  useEffect(() => {
    console.log('🔄 CodePanel received new code:', generatedCode)

    if (generatedCode && !isGenerating) {
      // Prevent object conversion to string
      if (typeof generatedCode === 'object') {
        console.error('❌ Received object instead of string:', generatedCode)
        return
      }

      // Clean the code by removing any leading 'n' or newlines
      const cleanedCode = generatedCode.replace(/^n?\n?/, '')

      // Set the code directly without animation if it's the same
      if (displayedCode === cleanedCode) {
        return
      }

      // Animate code appearance character by character
      let currentIndex = 0
      const codeLength = cleanedCode.length
      const interval = setInterval(() => {
        if (currentIndex <= codeLength) {
          setDisplayedCode(cleanedCode.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, 20)

      return () => clearInterval(interval)
    } else if (isGenerating) {
      setDisplayedCode('// Generating code...\n')
    }
  }, [generatedCode, isGenerating])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full rounded-xl bg-black/50 p-4 backdrop-blur-lg border border-blue-900 shadow-lg font-display"
    >
      <h2 className="text-base font-semibold mb-3 text-white tracking-wide flex items-center gap-2">
        {icon}
        Generated Code
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 ml-2">
          {language}
        </span>
        {isGenerating && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full ml-2"
          />
        )}
      </h2>
      <div className="h-[calc(100%-2.75rem)] rounded-lg overflow-hidden border border-blue-900/50">
        <Editor
          height="100%"
          language={editorLanguage}
          value={displayedCode}
          theme={isDarkMode ? "vs-dark" : "light"}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', monospace",
            fontLigatures: true,
            letterSpacing: 0.5,
            lineHeight: 1.6,
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            readOnly: true,
            renderWhitespace: "selection",
            smoothScrolling: true,
            cursorStyle: "line",
            contextmenu: false,
            formatOnPaste: true,
            automaticLayout: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
              verticalSliderSize: 8,
              horizontalSliderSize: 8,
            }
          }}
          loading={
            <div className="h-full w-full flex items-center justify-center text-blue-400">
              Loading editor...
            </div>
          }
        />
      </div>
    </motion.div>
  )
} 