import { motion } from 'framer-motion';

export default function AIOutput({ messages }) {
  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <h3 className="font-medium border-b pb-2">AI Output</h3>
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${
              message.type === 'ai' ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <div className={`p-3 rounded-lg max-w-[80%] ${
              message.type === 'ai' 
                ? 'bg-primary/10 text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {message.content}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}