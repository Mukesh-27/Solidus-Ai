import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export default function CodeEditor({ value, onChange }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow">
      <div className="border-b px-4 py-2 flex items-center justify-between">
        <h3 className="font-medium">Code Editor</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-primary text-white text-sm">
            Run
          </button>
        </div>
      </div>
      <CodeMirror
        value={value}
        height="400px"
        extensions={[javascript()]}
        onChange={onChange}
        className="text-sm"
      />
    </div>
  );
}