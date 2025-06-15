
import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { FileText, Settings, Eye, Monitor } from 'lucide-react';

const Logging = () => {
  const basicLoggingCode = `import { Bot, AppConfig, CustomContext, logger } from '@wasserstoff/mangi-tg-bot';

const config: AppConfig = {
  botToken: 'YOUR_BOT_TOKEN',
  redisUrl: 'YOUR_REDIS_URL',
  isDev: true, // 🔧 Controls logging behavior
};

const bot = new Bot(config);
const botManager = bot.getBotManager();

botManager.handleCommand('demo', async (ctx: CustomContext) => {
  // Different log levels available
  ctx.logger.debug('🔍 Debug: Processing demo command');
  ctx.logger.info('ℹ️ Info: User requested demo');
  ctx.logger.warn('⚠️ Warning: Demo is for testing only');
  ctx.logger.error('❌ Error: This is how errors look');
  
  await ctx.reply('Demo command processed! Check your console logs.');
});

// Global logger is also available
logger.info('🚀 Bot initialized successfully');`;

  const developmentLogsCode = `/* 🔧 Development Mode (isDev: true) - Detailed Logging:

2024-01-15 10:30:45.123 [DEBUG] 🔍 Debug: Processing demo command
2024-01-15 10:30:45.124 [INFO]  ℹ️ Info: User requested demo  
2024-01-15 10:30:45.125 [WARN]  ⚠️ Warning: Demo is for testing only
2024-01-15 10:30:45.126 [ERROR] ❌ Error: This is how errors look
2024-01-15 10:30:45.127 [DEBUG] 📤 Sending message to chat 123456789
2024-01-15 10:30:45.130 [DEBUG] 🔄 Session state: { user: { theme: 'dark' } }
2024-01-15 10:30:45.135 [DEBUG] ✅ Message sent successfully

Features:
✅ Colorized output for better readability
✅ Precise timestamps with milliseconds  
✅ All log levels shown (debug, info, warn, error)
✅ Session state logging
✅ Command processing details
✅ Redis operations logging
✅ Request/response tracking
*/`;

  const productionLogsCode = `/* 🏭 Production Mode (isDev: false) - Minimal Logging:

2024-01-15 10:30:45 [INFO]  ℹ️ Info: User requested demo
2024-01-15 10:30:45 [WARN]  ⚠️ Warning: Demo is for testing only  
2024-01-15 10:30:45 [ERROR] ❌ Error: This is how errors look
2024-01-15 10:30:45 [ERROR] 🚨 Critical: Database connection failed

Features:
✅ Clean, minimal output optimized for log aggregation
✅ No debug messages (filtered out)
✅ Essential timestamps only
✅ Focus on warnings and errors
✅ Performance optimized
✅ Log rotation friendly
❌ No colorization (better for log files)
❌ No verbose session details
*/`;

  const loggerUsageCode = `// Using the logger in different scenarios

botManager.handleCommand('profile', async (ctx: CustomContext) => {
  ctx.logger.info(\`👤 User \${ctx.from.id} requested profile\`);
  
  try {
    const profile = ctx.session.getCustom('profile');
    
    if (!profile) {
      ctx.logger.debug('🔍 No profile found, creating default');
      ctx.session.setCustom('profile', { created: new Date() });
    }
    
    ctx.logger.debug('📊 Profile data:', profile);
    await ctx.reply('Profile loaded successfully!');
    
  } catch (error) {
    ctx.logger.error('💥 Failed to load profile:', error);
    await ctx.reply('Sorry, there was an error loading your profile.');
  }
});

// Global logger for application events
logger.info('🔧 Starting bot initialization');
logger.debug('🔗 Connecting to Redis...');
logger.warn('⚠️ Using development configuration');
logger.error('🚨 Critical system error occurred');`;

  const customLoggerCode = `// Creating custom logger instances
import { createSdkLogger } from '@wasserstoff/mangi-tg-bot';

// Create specialized loggers for different components
const dbLogger = createSdkLogger(config.isDev, 'DATABASE');
const authLogger = createSdkLogger(config.isDev, 'AUTH');
const apiLogger = createSdkLogger(config.isDev, 'API');

// Usage in your code
dbLogger.info('📊 Database query executed');
authLogger.warn('🔐 Authentication attempt from new IP');
apiLogger.error('🌐 External API call failed');

// Conditional logging based on environment
if (config.isDev) {
  logger.debug('🔧 Development mode: Full logging enabled');
} else {
  logger.info('🏭 Production mode: Minimal logging active');
}`;

  const logLevels = [
    {
      level: 'debug',
      color: 'gray',
      icon: '🔍',
      title: 'Debug',
      description: 'Detailed development information',
      when: 'Development only',
      example: 'Variable values, function entry/exit, state changes'
    },
    {
      level: 'info',
      color: 'blue',
      icon: 'ℹ️',
      title: 'Info', 
      description: 'General information about bot operation',
      when: 'Development & Production',
      example: 'User actions, successful operations, status updates'
    },
    {
      level: 'warn',
      color: 'yellow',
      icon: '⚠️',
      title: 'Warning',
      description: 'Something unexpected but not critical',
      when: 'Development & Production',
      example: 'Deprecated features, configuration issues, retries'
    },
    {
      level: 'error',
      color: 'red',
      icon: '❌',
      title: 'Error',
      description: 'Critical issues that need attention',
      when: 'Development & Production',
      example: 'API failures, database errors, crashes'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      gray: 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700',
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
    };
    return colors[color as keyof typeof colors];
  };

  const getTextColor = (color: string) => {
    const colors = {
      gray: 'text-gray-900 dark:text-gray-100',
      blue: 'text-blue-900 dark:text-blue-100',
      yellow: 'text-yellow-900 dark:text-yellow-100',
      red: 'text-red-900 dark:text-red-100'
    };
    return colors[color as keyof typeof colors];
  };

  const getSubTextColor = (color: string) => {
    const colors = {
      gray: 'text-gray-700 dark:text-gray-300',
      blue: 'text-blue-800 dark:text-blue-200',
      yellow: 'text-yellow-800 dark:text-yellow-200',
      red: 'text-red-800 dark:text-red-200'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <div className="flex items-center mb-4">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Professional Logging System
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Built-in logging system powered by Pino that automatically adapts to development and production environments. 
            Debug easily in development, optimize for production.
          </p>
        </div>

        {/* Overview */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Adaptive Logging Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center mb-3">
                <Settings className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                <h3 className="font-semibold text-green-900 dark:text-green-100">Development Mode</h3>
              </div>
              <ul className="space-y-2 text-green-800 dark:text-green-200 text-sm">
                <li>🎨 Colorized, detailed output</li>
                <li>🔍 All log levels (debug, info, warn, error)</li>
                <li>⏰ Precise timestamps with milliseconds</li>
                <li>📊 Session state and variable logging</li>
                <li>🔄 Request/response tracking</li>
              </ul>
            </div>
            
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center mb-3">
                <Monitor className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">Production Mode</h3>
              </div>
              <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                <li>🏭 Clean, minimal output</li>
                <li>⚡ Performance optimized</li>
                <li>📋 Essential logs only (info, warn, error)</li>
                <li>📁 Log aggregation friendly</li>
                <li>🔒 No sensitive debug information</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Log Levels */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Log Levels Explained
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The logging system supports four levels of logging, each serving a different purpose:
          </p>
          
          <div className="space-y-4">
            {logLevels.map((level) => (
              <div key={level.level} className={`p-4 border rounded-lg ${getColorClasses(level.color)}`}>
                <div className="flex items-start">
                  <span className="text-2xl mr-3 mt-1">{level.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-semibold ${getTextColor(level.color)}`}>
                        {level.title} Level
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded ${getColorClasses(level.color)} ${getSubTextColor(level.color)}`}>
                        {level.when}
                      </span>
                    </div>
                    <p className={`${getSubTextColor(level.color)} mb-2`}>
                      {level.description}
                    </p>
                    <p className={`text-xs ${getSubTextColor(level.color)}`}>
                      <strong>Examples:</strong> {level.example}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Basic Usage */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Basic Logging Usage
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The logging system is automatically available in your context and as a global logger:
          </p>
          <CodeBlock code={basicLoggingCode} title="Basic Logging Example" />
        </section>

        {/* Development vs Production */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Development vs Production Output
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <Eye className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                Development Mode Output
              </h3>
              <CodeBlock code={developmentLogsCode} />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <Monitor className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                Production Mode Output
              </h3>
              <CodeBlock code={productionLogsCode} />
            </div>
          </div>
        </section>

        {/* Practical Usage */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Practical Logging Examples
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Here are real-world examples of how to use logging effectively in your bot:
          </p>
          <CodeBlock code={loggerUsageCode} title="Practical Logging Examples" />
        </section>

        {/* Custom Loggers */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Custom Logger Instances
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You can create specialized logger instances for different parts of your application:
          </p>
          <CodeBlock code={customLoggerCode} title="Custom Logger Creation" />
        </section>

        {/* Configuration */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Configuration Reference
          </h2>
          <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    <code>isDev</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <code>boolean</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                    Controls logging mode: true for development (verbose), false for production (minimal)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              💡 Environment Detection
            </h4>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              Set <code>isDev: process.env.NODE_ENV !== 'production'</code> to automatically 
              switch between development and production logging based on your environment.
            </p>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Logging Best Practices
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                🎯 Use Appropriate Log Levels
              </h4>
              <p className="text-green-800 dark:text-green-200 text-sm">
                Use <code>debug</code> for development details, <code>info</code> for user actions, 
                <code>warn</code> for recoverable issues, and <code>error</code> for critical problems.
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                📊 Include Context in Messages
              </h4>
              <p className="text-green-800 dark:text-green-200 text-sm">
                Include relevant information like user IDs, chat IDs, or operation names to make logs searchable and useful.
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                🔒 Never Log Sensitive Data
              </h4>
              <p className="text-green-800 dark:text-green-200 text-sm">
                Avoid logging passwords, tokens, personal information, or other sensitive data, 
                especially in production environments.
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                ⚡ Be Mindful of Performance
              </h4>
              <p className="text-green-800 dark:text-green-200 text-sm">
                Excessive logging can impact performance. The SDK automatically optimizes this, 
                but avoid logging in tight loops or frequent operations.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Logging;
