export default function LoadingSpinner({ size = 'md', color = 'primary' }) {
  const getSizeClass = () => {
    switch(size) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-6 h-6';
      case 'lg': return 'w-8 h-8';
      default: return 'w-6 h-6';
    }
  };
  
  const getColorClass = () => {
    switch(color) {
      case 'primary': return 'text-blue-600 dark:text-blue-400';
      case 'secondary': return 'text-gray-600 dark:text-gray-400';
      case 'white': return 'text-white';
      default: return 'text-blue-600 dark:text-blue-400';
    }
  };
  
  return (
    <svg className={`animate-spin ${getSizeClass()} ${getColorClass()}`} viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}