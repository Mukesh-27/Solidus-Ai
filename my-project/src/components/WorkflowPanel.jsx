import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export default function WorkflowPanel({ isDarkMode, icon, isGenerating, currentStep, algorithm }) {
  const [parsedAlgorithm, setParsedAlgorithm] = useState('')

  useEffect(() => {
    // Reset content when new algorithm is coming
    setParsedAlgorithm('')
    
    if (algorithm) {
      setParsedAlgorithm(algorithm)
    }
  }, [algorithm])

  return (
    <div className="h-full rounded-xl bg-black/50 p-4 backdrop-blur-lg border border-blue-900 shadow-lg flex flex-col font-inter">
      <h2 className="text-base font-semibold mb-3 text-white tracking-wide flex items-center gap-2">
        {icon}
        Algorithm
      </h2>
      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
        {parsedAlgorithm && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 rounded-lg bg-gradient-to-b from-blue-900/20 to-blue-950/30 border border-blue-900/50"
          >
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  h3: ({node, ...props}) => (
                    <h3 className="text-blue-400 font-semibold mt-4 mb-2" {...props} />
                  ),
                  h4: ({node, ...props}) => (
                    <h4 className="text-blue-300 font-bold mt-4 mb-2" {...props} />
                  ),
                  ul: ({node, ...props}) => (
                    <ul className="list-disc list-inside space-y-1 mt-2" {...props} />
                  ),
                  li: ({node, ...props}) => (
                    <li className="text-gray-300" {...props} />
                  ),
                  p: ({node, children, ...props}) => {
                    // Check if the paragraph starts with specific keywords
                    const text = children?.toString() || '';
                    const keywords = ['Input:', 'Output:', 'Example:', 'Execution:', 'Algorithm:', 'Steps:', 'Note:', 'Time Complexity:', 'Space Complexity:'];
                    
                    for (const keyword of keywords) {
                      if (text.startsWith(keyword)) {
                        return (
                          <p className="mb-3" {...props}>
                            <span className="text-blue-300 font-bold">{keyword}</span>
                            {text.slice(keyword.length)}
                          </p>
                        );
                      }
                    }
                    return <p className="mb-3 text-gray-300" {...props}>{children}</p>;
                  },
                  hr: ({node, ...props}) => (
                    <hr className="my-4 border-blue-900/30" {...props} />
                  ),
                  code: ({node, inline, ...props}) => (
                    inline ? 
                      <code className="px-2 py-1 rounded bg-blue-950 text-blue-300 font-mono text-sm border border-blue-800/50" {...props} /> :
                      <code className="block p-3 my-3 rounded-lg bg-blue-950 text-blue-300 font-mono text-sm border border-blue-800/50" {...props} />
                  ),
                  pre: ({node, ...props}) => (
                    <pre className="bg-transparent border-none p-0 m-0" {...props} />
                  ),
                  em: ({node, ...props}) => (
                    <em className="text-blue-300 not-italic font-semibold" {...props} />
                  ),
                  strong: ({node, ...props}) => (
                    <strong className="text-blue-200 font-bold" {...props} />
                  )
                }}
              >
                {parsedAlgorithm}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 