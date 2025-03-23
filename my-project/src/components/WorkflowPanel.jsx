export default function WorkflowPanel() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 flex-1">
      <h2 className="text-lg font-semibold mb-3">Algorithm & Workflow</h2>
      <div className="space-y-4">
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="font-medium">Step 1: Input Validation</h3>
          <p className="text-gray-600 text-sm">Validate and sanitize user input</p>
        </div>
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="font-medium">Step 2: Algorithm Design</h3>
          <p className="text-gray-600 text-sm">Design efficient solution approach</p>
        </div>
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="font-medium">Step 3: Implementation</h3>
          <p className="text-gray-600 text-sm">Convert algorithm to code</p>
        </div>
      </div>
    </div>
  )
} 