
import React from 'react';
import { Menu, Sun, Moon, Github } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isDark, onThemeToggle }) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-gray-200 dark:border-gray-700">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth touch-target"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo for mobile and tablet */}
        <div className="lg:hidden ml-3 flex items-center min-w-0 flex-1">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            Mangi TG Bot SDK
          </h1>
        </div>

        {/* Spacer for desktop */}
        <div className="hidden lg:flex flex-1" />

        {/* Right side buttons */}
        <div className="flex items-center space-x-2">
          {/* Theme toggle */}
          <button
            onClick={onThemeToggle}
            className="p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth touch-target hover-scale"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com/AmanUpadhyay1609/-wasserstoff-mangi-tg-bot"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth touch-target hover-scale"
            aria-label="GitHub repository"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
