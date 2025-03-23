import { motion } from 'framer-motion';

const stages = [
  { id: 1, title: 'User Input', icon: '📝' },
  { id: 2, title: 'Workflow Generation', icon: '🔄' },
  { id: 3, title: 'Code Execution', icon: '▶️' },
  { id: 4, title: 'Error Detection', icon: '🔍' },
  { id: 5, title: 'Debugging', icon: '🐛' },
  { id: 6, title: 'Refinement', icon: '✨' },
];

export default function WorkflowVisualizer({ currentStage }) {
  return (
    <div className="my-8">
      <div className="flex justify-between items-center relative">
        <div className="absolute h-1 bg-gray-200 left-0 right-0 top-1/2 -translate-y-1/2 z-0" />
        {stages.map((stage, index) => (
          <motion.div
            key={stage.id}
            className={`relative z-10 flex flex-col items-center gap-2 cursor-pointer
              ${currentStage >= stage.id ? 'text-primary' : 'text-gray-400'}`}
            whileHover={{ scale: 1.1 }}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center
              ${currentStage >= stage.id ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              {stage.icon}
            </div>
            <span className="text-sm font-medium">{stage.title}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}