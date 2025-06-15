
import React, { useState, useEffect } from 'react';

const InteractiveMascot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Hi there! I'm Mangi, your Telegram Bot SDK mascot! 👋",
    "I help developers build powerful Telegram bots with ease! 🤖",
    "With JWT auth, admin approval, and session management built-in! 🛡️",
    "Let's build something amazing together! ✨"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const messageTimer = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 4000);
      return () => clearInterval(messageTimer);
    }
  }, [isVisible, messages.length]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] w-full">
      {/* Animated background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-teal-900/20 rounded-3xl animate-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Interactive Mascot */}
      <div className={`relative z-10 transition-all duration-1000 w-full flex flex-col items-center ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
      }`}>
        {/* Speech bubble - positioned above the mascot */}
        <div className={`mb-8 sm:mb-12 lg:mb-16 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="relative rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-xl border max-w-xs sm:max-w-sm lg:max-w-md transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <p className="text-sm sm:text-base lg:text-lg font-medium text-center leading-relaxed transition-colors duration-300 text-gray-800 dark:text-gray-200">
              {messages[currentMessage]}
            </p>
            
            {/* Speech bubble tail pointing down */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent transition-colors duration-300 border-t-white dark:border-t-gray-800"></div>
            </div>
          </div>
        </div>

        {/* Mascot Image - full width on all devices */}
        <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="relative transform transition-all duration-300 w-full animate-bounce" style={{ animationDuration: '3s' }}>
            <img
              src="https://res.cloudinary.com/amanupadhyay1211/image/upload/e_background_removal/f_png,e_improve,e_sharpen/v1749712536/673ab229-f750-464c-abdb-a6df084be6d9_e7oukd.jpg"
              alt="Mangi - Telegram Bot SDK Mascot"
              className="w-full h-auto drop-shadow-2xl"
            />
            
            {/* Glowing effect */}
            <div className="absolute inset-0 rounded-full blur-xl transition-all duration-300 -z-10 bg-gradient-to-r from-blue-400/20 to-cyan-400/20"></div>
          </div>
        </div>

        {/* Floating action indicators */}
        <div className="mt-8 flex space-x-2">
          {messages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentMessage 
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMascot;
