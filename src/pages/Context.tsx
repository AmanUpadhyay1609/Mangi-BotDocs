import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { Code, Shield, CheckCircle, ExternalLink } from 'lucide-react';

const Context = () => {
  const basicContextCode = `botManager.handleCommand('whoami', async (ctx: CustomContext) => {
  // ✅ Safe access - no need for ctx.from! or null checks
  const userId = ctx.from.id;           // Always available
  const username = ctx.from.username;   // Might be undefined
  const chatId = ctx.chat.id;           // Always available
  const chatType = ctx.chat.type;       // 'private', 'group', 'supergroup', 'channel'
  
  // Session is always available too
  const userTheme = ctx.session.getCustom('theme') || 'default';
  
  await ctx.api.sendMessage(
    chatId,
    \`👤 User ID: \${userId}\\n\` +
    \`🏷️ Username: \${username || 'No username'}\\n\` +
    \`💬 Chat Type: \${chatType}\\n\` +
    \`🎨 Theme: \${userTheme}\`
  );
});`;

  const contextPropertiesCode = `// Key properties available in CustomContext:

interface CustomContext {
  // 🔗 Telegram API client (same as Grammy)
  api: Api;                    // Send messages, edit, delete, etc.
  
  // 👤 User information (always present - SDK guarantees it)
  from: {
    id: number;               // User's Telegram ID
    is_bot: boolean;          // Always false for users
    first_name: string;       // User's first name
    last_name?: string;       // User's last name (optional)
    username?: string;        // @username (optional)
    language_code?: string;   // User's language preference
  };
  
  // 💬 Chat information (always present - SDK guarantees it)
  chat: {
    id: number;               // Chat ID (same as from.id for private chats)
    type: 'private' | 'group' | 'supergroup' | 'channel';
    title?: string;           // Group/channel name
    username?: string;        // Public group/channel @username
    description?: string;     // Group/channel description
  };
  
  // 📝 Session management (always present - SDK provides it)
  session: {
    setCustom(key: string, value: any): void;
    getCustom(key: string): any;
    updateCustom(updates: Record<string, any>): boolean;
    deleteCustom(key: string): void;
    save?(callback: Function): void;  // Optional Redis save
  };
  
  // 📋 Logger instance (controlled by isDev setting)
  logger: {
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
  };
  
  // 📨 Message information (when available)
  message?: {
    message_id: number;       // Message ID
    text?: string;           // Message text
    date: number;            // Unix timestamp
    // ... other Telegram message properties
  };
  
  // 🎯 Callback query (for button interactions)
  callback_query?: {
    id: string;              // Query ID
    data?: string;           // Button callback data
    message?: any;           // Original message
  };
  
  // 🔄 Helper methods (same as Grammy)
  reply(text: string, options?: any): Promise<any>;
  replyWithPhoto(photo: any, options?: any): Promise<any>;
  editMessageText(text: string, options?: any): Promise<any>;
  answerCallbackQuery(options?: any): Promise<any>;
  // ... many more Telegram Bot API methods
}`;

  const safeAccessExample = `// ❌ Old way (Grammy without safety):
botManager.handleCommand('unsafe', async (ctx) => {
  // This could crash if ctx.from is undefined!
  const userId = ctx.from?.id;  // Need ? operator
  const chatId = ctx.chat?.id;  // Need ? operator
  
  if (!ctx.session) {
    // Need to handle missing session
    return;
  }
  
  // Lots of defensive coding needed
});

// ✅ New way (Mangi SDK with automatic safety):
botManager.handleCommand('safe', async (ctx: CustomContext) => {
  // SDK guarantees these are always present - no ! or ? needed
  const userId = ctx.from.id;    // Always works
  const chatId = ctx.chat.id;    // Always works
  const theme = ctx.session.getCustom('theme');  // Always works
  
  // Clean, simple code with no defensive checks needed
});`;

  const messageHandlerExample = `// Message handlers work with any text message
botManager.handleMessage(false, async (ctx: CustomContext) => {
  // First parameter: false = no JWT required, true = JWT required
  
  if (!ctx.message?.text) {
    return; // Not a text message
  }
  
  const userMessage = ctx.message.text.toLowerCase();
  
  if (userMessage.includes('hello')) {
    await ctx.reply(\`Hi \${ctx.from.first_name}! 👋\`);
  } else if (userMessage.includes('help')) {
    await ctx.reply('I can help you! Try sending /start');
  } else {
    // Log the message for debugging
    ctx.logger.debug('Received message:', userMessage);
    await ctx.reply('I heard you, but I don\\'t understand. Try /help');
  }
});`;

  const callbackHandlerExample = `// Callback handlers work with button presses
botManager.handleCallback(false, async (ctx: CustomContext) => {
  // First parameter: false = no JWT required, true = JWT required
  
  if (!ctx.callback_query?.data) {
    return; // No callback data
  }
  
  const callbackData = ctx.callback_query.data;
  
  if (callbackData === 'settings') {
    await ctx.editMessageText('⚙️ Settings Menu:\\n- Theme\\n- Language\\n- Notifications');
  } else if (callbackData.startsWith('theme_')) {
    const theme = callbackData.replace('theme_', '');
    ctx.session.setCustom('theme', theme);
    await ctx.answerCallbackQuery({ text: \`Theme changed to \${theme}!\` });
    await ctx.editMessageText(\`✅ Theme set to: \${theme}\`);
  }
});

// Example: Create a button that triggers callbacks
botManager.handleCommand('settings', async (ctx: CustomContext) => {
  await ctx.api.sendMessage(ctx.chat.id, 'Choose your settings:', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🎨 Theme: Dark', callback_data: 'theme_dark' },
          { text: '🎨 Theme: Light', callback_data: 'theme_light' }
        ],
        [
          { text: '⚙️ More Settings', callback_data: 'settings' }
        ]
      ]
    }
  });
});`;

  const grammyComparisonCode = `/* Comparison with Grammy Framework:

📚 Grammy (Base Framework):
- ctx.from might be undefined
- ctx.chat might be undefined  
- No built-in session management
- Manual error handling required
- Basic logging only

🚀 Mangi SDK (Enhanced):
- ctx.from always present (guaranteed)
- ctx.chat always present (guaranteed)
- Built-in session CRUD operations
- Automatic error handling & safety
- Professional logging system
- JWT authentication built-in
- Admin approval system built-in
- Redis session storage built-in

🔗 Grammy Compatibility:
- All Grammy methods work exactly the same
- Same API structure and method names
- Can use Grammy documentation for API reference
- Mangi adds features ON TOP of Grammy
*/`;

  const grammarApiMethods = [
    {
      category: 'Sending Messages',
      methods: [
        'ctx.reply(text, options?)',
        'ctx.replyWithPhoto(photo, options?)',
        'ctx.replyWithVideo(video, options?)',
        'ctx.replyWithDocument(document, options?)',
        'ctx.api.sendMessage(chatId, text, options?)'
      ]
    },
    {
      category: 'Editing Messages',
      methods: [
        'ctx.editMessageText(text, options?)',
        'ctx.editMessageCaption(caption, options?)',
        'ctx.editMessageReplyMarkup(markup?)',
        'ctx.api.editMessageText(...args)'
      ]
    },
    {
      category: 'Callback Queries',
      methods: [
        'ctx.answerCallbackQuery(options?)',
        'ctx.callback_query.data',
        'ctx.callback_query.message'
      ]
    },
    {
      category: 'Chat Actions',
      methods: [
        'ctx.api.sendChatAction(chatId, action)',
        'ctx.api.deleteChatPhoto(chatId)',
        'ctx.api.setChatTitle(chatId, title)',
        'ctx.api.banChatMember(chatId, userId)'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <div className="flex items-center mb-4">
            <Code className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Context (ctx) Documentation
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Understanding the Context object - your gateway to interacting with Telegram users. 
            Built on Grammy framework with enhanced safety and features.
          </p>
        </div>

        {/* What is Context */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            What is Context (ctx)?
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <p className="text-blue-900 dark:text-blue-100 mb-4">
              The context object (ctx) is like a magical toolkit that contains everything you need to interact with a Telegram user. 
              Think of it as a briefcase that holds information about who is talking to your bot, what they said, and tools to respond back.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">👤</span>
                </div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">User Info</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">Who is talking to your bot</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">💬</span>
                </div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Chat Info</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">Where the conversation happens</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🛠️</span>
                </div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">API Tools</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">Methods to send messages and more</p>
              </div>
            </div>
          </div>
        </section>

        {/* Automatic Safety */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Automatic Context Safety
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Unlike basic Grammy, the Mangi SDK guarantees that <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">ctx.from</code>, 
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">ctx.chat</code>, and 
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">ctx.session</code> are always present. 
            No more defensive coding!
          </p>
          
          <div className="mb-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                    No More Null Pointer Exceptions
                  </h4>
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    The SDK's internal middleware ensures that essential context properties are always available. 
                    You can safely access <code>ctx.from.id</code> without worrying about crashes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <CodeBlock code={safeAccessExample} title="Safe vs Unsafe Context Access" />
        </section>

        {/* Basic Usage */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Basic Context Usage
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Here's how to use the most common context properties in your bot commands:
          </p>
          <CodeBlock code={basicContextCode} title="Context Properties Example" />
        </section>

        {/* Complete Context Interface */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Complete Context Interface
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Here's the complete structure of what's available in the CustomContext:
          </p>
          <CodeBlock code={contextPropertiesCode} title="CustomContext Interface" />
        </section>

        {/* Message Handlers */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Message Handlers with Context
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Message handlers let you respond to any text message (not just commands). 
            The first parameter is a boolean indicating whether JWT authentication is required:
          </p>
          <CodeBlock code={messageHandlerExample} title="Message Handler Example" />
        </section>

        {/* Callback Handlers */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Callback Handlers for Buttons
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Callback handlers respond to button presses. They also take a boolean first parameter for JWT requirements:
          </p>
          <CodeBlock code={callbackHandlerExample} title="Callback Handler Example" />
        </section>

        {/* Grammy Integration */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Grammy Framework Integration
          </h2>
          <div className="flex items-center mb-4">
            <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <a 
              href="https://grammy.dev/guide/context.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Grammy Context Documentation
            </a>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The Mangi SDK is built on top of the Grammy framework, which means you can use all Grammy documentation 
            for reference. Here's how they compare:
          </p>
          <CodeBlock code={grammyComparisonCode} title="Grammy vs Mangi SDK" />
        </section>

        {/* Available API Methods */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Available API Methods
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Since Mangi SDK is built on Grammy, you have access to all Telegram Bot API methods. 
            Here are the most commonly used ones:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {grammarApiMethods.map((category) => (
              <div key={category.category} className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.methods.map((method, index) => (
                    <li key={index} className="text-sm">
                      <code className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                        {method}
                      </code>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Context Best Practices
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                    Use Session for User Data
                  </h4>
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    Store user preferences and state in <code>ctx.session</code> instead of global variables. 
                    It's automatically persisted to Redis and isolated per user.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                    Use ctx.logger for Debugging
                  </h4>
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    Use <code>ctx.logger.debug()</code> for development debugging and <code>ctx.logger.info()</code> 
                    for important events. The SDK automatically adjusts log levels based on your <code>isDev</code> setting.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                    Handle Optional Properties
                  </h4>
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    While <code>ctx.from</code> and <code>ctx.chat</code> are guaranteed, some properties like 
                    <code>ctx.from.username</code> or <code>ctx.message?.text</code> might be undefined. 
                    Always check or provide defaults.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Context;
