
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Book, 
  Shield, 
  Users, 
  Database, 
  FileText, 
  Settings, 
  Code,
  Home,
  ChevronRight,
  Zap,
  Bot,
  Network,
  MessageCircle
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Getting Started', href: '/getting-started', icon: Book },
  { 
    name: 'Core Features',
    icon: Settings,
    children: [
      { name: 'JWT Authentication', href: '/jwt-auth', icon: Shield },
      { name: 'Admin Approval', href: '/admin-approval', icon: Users },
      { name: 'Session CRUD', href: '/session-crud', icon: Database },
      { name: 'Context (ctx)', href: '/context', icon: Code },
      { name: 'Logging System', href: '/logging', icon: FileText },
    ]
  },
  { 
    name: 'Advanced',
    icon: Zap,
    children: [
      { name: 'Context Deep Dive', href: '/context-deep-dive', icon: Code },
      { name: 'Telegram Bot Architecture', href: '/telegram-architecture', icon: Bot },
    ]
  },
  { name: 'Examples', href: '/examples', icon: Code },
  { name: 'Contact Us', href: '/contact', icon: MessageCircle },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['Core Features']);

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const renderNavItem = (item: any, depth = 0) => {
    const isActive = location.pathname === item.href;
    const isExpanded = expandedItems.includes(item.name);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.name} className="animate-fade-in">
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.name)}
            className={`w-full flex items-center px-2 sm:px-3 py-3 text-sm font-medium rounded-lg transition-smooth touch-target ${
              depth > 0 ? 'ml-3 sm:ml-4' : ''
            } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.01]`}
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            <span className="flex-1 text-left min-w-0 truncate text-base sm:text-sm">{item.name}</span>
            <ChevronRight 
              className={`h-4 w-4 flex-shrink-0 transition-all duration-200 ${
                isExpanded ? 'rotate-90' : ''
              }`} 
            />
          </button>
        ) : (
          <Link
            to={item.href}
            onClick={onClose}
            className={`flex items-center px-2 sm:px-3 py-3 text-sm font-medium rounded-lg transition-smooth touch-target ${
              depth > 0 ? 'ml-3 sm:ml-4' : ''
            } ${
              isActive
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 scale-[1.02]'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.01]'
            }`}
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            <span className="min-w-0 truncate text-base sm:text-sm">{item.name}</span>
          </Link>
        )}
        
        {hasChildren && (
          <div className={`mt-1 space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            {item.children.map((child: any) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-50 w-80 sm:w-72 lg:w-64 xl:w-72 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center h-16 sm:h-16 px-4 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center min-w-0">
              <img 
                src="https://res.cloudinary.com/amanupadhyay1211/image/upload/e_background_removal/f_png,e_improve,e_sharpen/v1749712536/673ab229-f750-464c-abdb-a6df084be6d9_e7oukd.jpg" 
                alt="Mangi Bot" 
                className="w-8 h-8 sm:w-8 sm:h-8 rounded-lg flex-shrink-0 transition-transform hover:scale-110"
              />
              <div className="ml-3 min-w-0">
                <h1 className="text-lg sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                  Mangi TG Bot
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">SDK Documentation</p>
              </div>
            </div>
          </div>

          {/* Navigation with ScrollArea */}
          <ScrollArea className="flex-1">
            <nav className="px-3 sm:px-4 py-4 sm:py-6 space-y-2">
              {navigation.map(item => renderNavItem(item))}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p>
                <a
                  href="https://www.npmjs.com/package/@wasserstoff/mangi-tg-bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline transition-smooth"
                >
                  Version 1.2.13
                </a>
              </p>
              <p className="mt-1">
                <a 
                  href="https://github.com/AmanUpadhyay1609/-wasserstoff-mangi-tg-bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline transition-smooth"
                >
                  GitHub Repository
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
