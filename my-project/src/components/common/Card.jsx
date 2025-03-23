export default function Card({ 
  children, 
  title, 
  icon, 
  className = ''
}) {
  return (
    <div className={`bg-white dark:bg-[#1e1e2e] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm ${className}`}>
      {title && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-[#252540] border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h3>
          </div>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}