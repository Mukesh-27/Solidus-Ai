import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'

export default function CodePanel() {
  const defaultCode = '// Your AI-generated code will appear here\n'

  return (
    <div className="bg-white rounded-lg shadow-sm border h-full">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Generated Code</h2>
      </div>
      <div className="p-4">
        <CodeMirror
          value={defaultCode}
          height="calc(100vh - 16rem)"
          theme="light"
          extensions={javascript()}
          editable={false}
        />
      </div>
    </div>
  )
} 