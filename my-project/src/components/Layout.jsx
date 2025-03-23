export default function Layout({ children, isDarkMode, setIsDarkMode }) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-black via-blue-950 to-gray-900 transition-colors duration-300`}>
      <nav className="bg-black/50 border-blue-900 border-b backdrop-blur-lg bg-opacity-80 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                AI Code Generator
              </span>
            </h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg text-blue-300 hover:bg-blue-900/30"
              >
                <span className="sr-only">Theme</span>
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="h-screen pt-16">
        {children}
      </main>
    </div>
  )
}