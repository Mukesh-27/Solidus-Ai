import { motion } from 'framer-motion';

export default function StatusPanel({ status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 rounded-lg border bg-card shadow-lg">
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ scale: status === 'running' ? [1, 1.2, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}
        />
        <span className="font-medium capitalize">{status}</span>
      </div>
    </div>
  );
}