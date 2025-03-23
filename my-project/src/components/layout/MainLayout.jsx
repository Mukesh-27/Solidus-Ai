import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MainLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-[#121622] overflow-hidden">
      {/* Header Bar */}
      <header className={`z-20 bg-white dark:bg-[#1a1f2e] border-b border-gray-200/80 dark:border-gray-800/80 transition-shadow ${
        isScrolled ? 'shadow-md' : ''
      }`}>
        <div className="px-4 h-14 flex items-center justify-between">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold mr-2">
                S
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                Solidus
              </h1>
            </div>
          </div>
          
          {/* Navigation Tabs (Desktop) */}
          <div className="hidden md:flex items-center space-x-1">
            <NavTab active>Dashboard</NavTab>
            <NavTab>Projects</NavTab>
            <NavTab>Templates</NavTab>
            <NavTab>Settings</NavTab>
          </div>
          
          {/* User & Actions */}
          <div className="flex items-center space-x-2">
            <button className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium">
              JS
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: isMobileMenuOpen ? 0 : -300 }}
        className="md:hidden fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#1a1f2e] z-40 shadow-xl overflow-y-auto"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold mr-2">
              S
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Solidus
            </h1>
          </div>
        </div>
        
        <div className="p-4 space-y-1">
          <MobileNavItem active>Dashboard</MobileNavItem>
          <MobileNavItem>Projects</MobileNavItem>
          <MobileNavItem>Templates</MobileNavItem>
          <MobileNavItem>Settings</MobileNavItem>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.div 
          initial={false}
          animate={{ width: isSidebarCollapsed ? '64px' : '280px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="hidden md:block relative border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1f2e] h-full overflow-y-auto"
        >
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-[#1a1f2e] border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-10"
          >
            <motion.span
              animate={{ rotate: isSidebarCollapsed ? 0 : 180 }}
              className="text-gray-500 dark:text-gray-400"
            >
              ◀
            </motion.span>
          </button>
          
          <div className="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
            {children.sidebar}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-[#121622]">
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
            {children.main}
          </div>
        </div>
      </div>
    </div>
  )
}

function NavTab({ children, active }) {
  return (
    <button className={`px-3 py-2 text-sm font-medium rounded-md relative
      ${active 
        ? 'text-indigo-600 dark:text-indigo-400' 
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
    >
      {children}
      {active && (
        <motion.div 
          layoutId="navIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  )
}

function MobileNavItem({ children, active }) {
  return (
    <button className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md
      ${active 
        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
    >
      {children}
    </button>
  )
}