
import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { Code, Zap, Database, MessageSquare, Users, Bot, ExternalLink, Info } from 'lucide-react';

const ContextDeepDive = () => {
  const grammyContextCode = `// Grammy Context Object Structure (Base Framework)
interface Context {
  // Core Telegram Objects
  update: Update;           // Raw Telegram update object
  api: Api;                // Telegram Bot API client
  me: UserFromGetMe;       // Bot's own information
  
  // User and Chat (might be undefined!)
  from?: User;             // User who sent the message
  senderChat?: Chat;       // Channel that sent the message
  chat?: Chat;             // Chat where message was sent
  
  // Message Types
  message?: Message;               // Regular message
  editedMessage?: Message;         // Edited message
  channelPost?: Message;           // Channel post
  editedChannelPost?: Message;     // Edited channel post
  
  // Callback Queries and Inline
  callbackQuery?: CallbackQuery;   // Button press data
  inlineQuery?: InlineQuery;       // Inline query
  chosenInlineResult?: ChosenInlineResult;
  
  // Payments and Shipping
  shippingQuery?: ShippingQuery;
  preCheckoutQuery?: PreCheckoutQuery;
  
  // Polls and Chat Members
  poll?: Poll;
  pollAnswer?: PollAnswer;
  myChatMember?: ChatMemberUpdated;
  chatMember?: ChatMemberUpdated;
  
  // Chat Join Requests
  chatJoinRequest?: ChatJoinRequest;
}`;

  const mangiEnhancedCode = `// Mangi SDK Enhanced Context (CustomContext)
interface CustomContext extends Context {
  // 🛡️ GUARANTEED PROPERTIES (never undefined)
  from: User;              // Always present - SDK ensures it
  chat: Chat;              // Always present - SDK ensures it
  session: SessionManager; // Always present - built-in session
  logger: Logger;          // Always present - logging system
  
  // 🔧 Enhanced Session Management
  session: {
    // Direct CRUD operations
    setCustom(key: string, value: any): void;
    getCustom(key: string): any;
    updateCustom(updates: Record<string, any>): boolean;
    deleteCustom(key: string): void;
    
    // Optional Redis integration
    save?(callback?: Function): void;
    
    // Built-in user data
    userId: number;          // Same as from.id
    chatId: number;          // Same as chat.id
    isNew: boolean;          // First time user?
    createdAt: Date;         // Session creation time
    lastActiveAt: Date;      // Last interaction time
  };
  
  // 📊 Professional Logging
  logger: {
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    
    // Contextual logging (includes user/chat info)
    logUserAction(action: string, data?: any): void;
    logError(error: Error, context?: string): void;
  };
  
  // 🔐 JWT Integration
  jwt?: {
    token: string;           // Current JWT token
    payload: any;            // Decoded JWT payload
    isValid: boolean;        // Token validity
    expiresAt: Date;         // Token expiration
  };
}`;

  const contextMethodsCode = `// Context Methods - Telegram Bot API Wrappers

// 📨 Sending Messages
await ctx.reply('Hello!');                    // Reply to current message
await ctx.replyWithPhoto(photoUrl);           // Send photo
await ctx.replyWithDocument(documentUrl);     // Send document
await ctx.replyWithVideo(videoUrl);           // Send video
await ctx.replyWithAudio(audioUrl);           // Send audio
await ctx.replyWithVoice(voiceUrl);           // Send voice message
await ctx.replyWithSticker(stickerId);        // Send sticker
await ctx.replyWithLocation(lat, lng);        // Send location
await ctx.replyWithContact(phone, firstName); // Send contact

// 🎯 Direct API Calls
await ctx.api.sendMessage(chatId, 'Hello!');
await ctx.api.sendPhoto(chatId, photoUrl);
await ctx.api.sendDocument(chatId, documentUrl);

// ✏️ Message Editing
await ctx.editMessageText('New text');
await ctx.editMessageCaption('New caption');
await ctx.editMessageReplyMarkup(newKeyboard);

// 🗑️ Message Management
await ctx.deleteMessage();
await ctx.api.deleteMessage(chatId, messageId);
await ctx.pinChatMessage(messageId);
await ctx.unpinChatMessage(messageId);

// 👥 Chat Management
await ctx.banChatMember(userId);
await ctx.unbanChatMember(userId);
await ctx.restrictChatMember(userId, permissions);
await ctx.promoteChatMember(userId, privileges);
await ctx.setChatTitle('New Title');
await ctx.setChatDescription('New Description');

// 🔔 Callback Query Handling
await ctx.answerCallbackQuery('Done!');
await ctx.answerCallbackQuery({
  text: 'Success!',
  show_alert: true,
  cache_time: 300
});

// 🎮 Inline Query Responses
await ctx.answerInlineQuery(results);
await ctx.answerInlineQuery(results, {
  cache_time: 300,
  is_personal: true,
  next_offset: '50'
});`;

  const sessionDeepDiveCode = `// Session Deep Dive - Advanced Usage

botManager.handleCommand('profile', async (ctx: CustomContext) => {
  // 📊 Session Analytics
  console.log('User session info:');
  console.log('- User ID:', ctx.session.userId);
  console.log('- Chat ID:', ctx.session.chatId);
  console.log('- Is New User:', ctx.session.isNew);
  console.log('- Created:', ctx.session.createdAt);
  console.log('- Last Active:', ctx.session.lastActiveAt);
  
  // 🏪 Complex Data Storage
  const userProfile = {
    preferences: {
      language: 'en',
      notifications: true,
      theme: 'dark'
    },
    stats: {
      commandsUsed: 0,
      messagesReceived: 0,
      lastCommand: null
    },
    customData: {
      favoriteColor: 'blue',
      timezone: 'UTC',
      level: 1
    }
  };
  
  // Store complex objects
  ctx.session.setCustom('profile', userProfile);
  
  // Update specific nested properties
  ctx.session.updateCustom({
    'profile.stats.commandsUsed': 
      (ctx.session.getCustom('profile.stats.commandsUsed') || 0) + 1,
    'profile.stats.lastCommand': 'profile'
  });
  
  // 📈 Usage Statistics
  const stats = ctx.session.getCustom('profile.stats') || {};
  await ctx.reply(
    \`📊 Your Profile Stats:\\n\` +
    \`Commands Used: \${stats.commandsUsed || 0}\\n\` +
    \`Messages: \${stats.messagesReceived || 0}\\n\` +
    \`Level: \${ctx.session.getCustom('profile.customData.level') || 1}\`
  );
});

// 🎯 Session-based State Management
botManager.handleCommand('wizard', async (ctx: CustomContext) => {
  // Multi-step wizard using session state
  const wizardState = ctx.session.getCustom('wizard') || { step: 0 };
  
  switch (wizardState.step) {
    case 0:
      ctx.session.setCustom('wizard', { step: 1 });
      await ctx.reply('🧙‍♂️ Welcome to setup wizard! What\\'s your name?');
      break;
      
    case 1:
      wizardState.name = ctx.message?.text;
      wizardState.step = 2;
      ctx.session.setCustom('wizard', wizardState);
      await ctx.reply(\`Hello \${wizardState.name}! What\\'s your age?\`);
      break;
      
    case 2:
      wizardState.age = parseInt(ctx.message?.text || '0');
      wizardState.step = 0; // Reset
      ctx.session.setCustom('wizard', wizardState);
      ctx.session.deleteCustom('wizard'); // Clean up
      
      await ctx.reply(
        \`✅ Setup complete!\\n\` +
        \`Name: \${wizardState.name}\\n\` +
        \`Age: \${wizardState.age}\`
      );
      break;
  }
});`;

  const loggingDeepDiveCode = `// Advanced Logging with Context

botManager.handleCommand('debug', async (ctx: CustomContext) => {
  // 🐛 Debug Level Logging (only in development)
  ctx.logger.debug('Debug info for user', {
    userId: ctx.from.id,
    username: ctx.from.username,
    chatType: ctx.chat.type,
    messageId: ctx.message?.message_id
  });
  
  // ℹ️ Info Level (always logged)
  ctx.logger.info('User executed debug command', {
    user: ctx.from.first_name,
    command: 'debug'
  });
  
  // ⚠️ Warning Level
  if (!ctx.from.username) {
    ctx.logger.warn('User has no username', {
      userId: ctx.from.id,
      firstName: ctx.from.first_name
    });
  }
  
  // 🚨 Error Level
  try {
    // Simulate some operation
    throw new Error('Simulated error for demo');
  } catch (error) {
    ctx.logger.error('Demo error occurred', error);
    // Log with additional context
    ctx.logger.logError(error as Error, 'debug command execution');
  }
  
  // 📋 User Action Logging
  ctx.logger.logUserAction('debug_command_used', {
    timestamp: new Date(),
    chatId: ctx.chat.id,
    messageText: ctx.message?.text
  });
  
  await ctx.reply('🔍 Debug information logged to console');
});

// 📊 Automatic Action Logging
botManager.handleMessage(false, async (ctx: CustomContext) => {
  // Log every message for analytics
  ctx.logger.logUserAction('message_received', {
    messageType: ctx.message?.text ? 'text' : 'other',
    chatType: ctx.chat.type,
    messageLength: ctx.message?.text?.length || 0
  });
});

// 🎯 Performance Logging
botManager.handleCommand('slow', async (ctx: CustomContext) => {
  const startTime = Date.now();
  
  try {
    // Simulate slow operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    ctx.logger.info('Slow operation completed', {
      duration: \`\${duration}ms\`,
      command: 'slow',
      userId: ctx.from.id
    });
    
    await ctx.reply(\`⏱️ Operation took \${duration}ms\`);
  } catch (error) {
    ctx.logger.logError(error as Error, 'slow command execution');
    await ctx.reply('❌ Operation failed');
  }
});`;

  const advancedPatternsCode = `// Advanced Context Usage Patterns

// 🔄 Middleware Pattern with Context
const userMiddleware = async (ctx: CustomContext, next: () => Promise<void>) => {
  // Pre-processing
  ctx.logger.logUserAction('command_start', {
    command: ctx.message?.text,
    userId: ctx.from.id
  });
  
  const startTime = Date.now();
  
  try {
    await next(); // Execute the actual handler
    
    // Post-processing
    const duration = Date.now() - startTime;
    ctx.logger.info('Command completed', { duration });
  } catch (error) {
    ctx.logger.logError(error as Error, 'command execution');
    await ctx.reply('❌ Something went wrong. Please try again.');
  }
};

// 🎭 Context Decorators
const withAuth = (handler: (ctx: CustomContext) => Promise<void>) => {
  return async (ctx: CustomContext) => {
    if (!ctx.jwt?.isValid) {
      await ctx.reply('🔐 Authentication required. Use /login first.');
      return;
    }
    
    await handler(ctx);
  };
};

// Usage with decorator
botManager.handleCommand('protected', withAuth(async (ctx: CustomContext) => {
  await ctx.reply(\`🛡️ Hello \${ctx.jwt?.payload.username}! This is protected content.\`);
}));

// 🔄 Context State Machine
class ChatStateMachine {
  private states = new Map<string, string>();
  
  getState(ctx: CustomContext): string {
    const key = \`\${ctx.from.id}:\${ctx.chat.id}\`;
    return this.states.get(key) || 'idle';
  }
  
  setState(ctx: CustomContext, state: string): void {
    const key = \`\${ctx.from.id}:\${ctx.chat.id}\`;
    this.states.set(key, state);
    ctx.session.setCustom('currentState', state);
  }
  
  async handle(ctx: CustomContext, handler: Record<string, Function>): Promise<void> {
    const currentState = this.getState(ctx);
    const stateHandler = handler[currentState];
    
    if (stateHandler) {
      await stateHandler(ctx, this);
    } else {
      ctx.logger.warn('No handler for state', { state: currentState });
    }
  }
}

const stateMachine = new ChatStateMachine();

// State-based command handling
botManager.handleMessage(false, async (ctx: CustomContext) => {
  await stateMachine.handle(ctx, {
    idle: async (ctx: CustomContext, sm: ChatStateMachine) => {
      if (ctx.message?.text === '/start_quiz') {
        sm.setState(ctx, 'quiz_q1');
        await ctx.reply('🎯 Quiz started! What\\'s 2+2?');
      }
    },
    
    quiz_q1: async (ctx: CustomContext, sm: ChatStateMachine) => {
      if (ctx.message?.text === '4') {
        sm.setState(ctx, 'quiz_q2');
        await ctx.reply('✅ Correct! What\\'s the capital of France?');
      } else {
        await ctx.reply('❌ Wrong! Try again.');
      }
    },
    
    quiz_q2: async (ctx: CustomContext, sm: ChatStateMachine) => {
      if (ctx.message?.text?.toLowerCase().includes('paris')) {
        sm.setState(ctx, 'idle');
        await ctx.reply('🎉 Quiz completed! Well done!');
      } else {
        await ctx.reply('❌ Wrong! Try again.');
      }
    }
  });
});`;

  const contextBestPracticesCode = `// Context Best Practices & Performance Tips

// ✅ DO: Use session for user-specific data
botManager.handleCommand('settings', async (ctx: CustomContext) => {
  const userSettings = ctx.session.getCustom('settings') || {
    theme: 'light',
    language: 'en',
    notifications: true
  };
  
  // Display current settings
  await ctx.reply(\`⚙️ Current Settings:\\n\${JSON.stringify(userSettings, null, 2)}\`);
});

// ❌ DON'T: Use global variables for user data
let globalUserData = {}; // This will cause issues with multiple users!

// ✅ DO: Check for optional properties
botManager.handleCommand('userinfo', async (ctx: CustomContext) => {
  const username = ctx.from.username || 'No username';
  const lastName = ctx.from.last_name || '';
  const messageText = ctx.message?.text || 'No text';
  
  await ctx.reply(\`👤 User: \${ctx.from.first_name} \${lastName} (@\${username})\`);
});

// ❌ DON'T: Assume properties exist without checking
// const username = ctx.from.username.toLowerCase(); // May crash!

// ✅ DO: Use proper error handling with context
botManager.handleCommand('risky', async (ctx: CustomContext) => {
  try {
    // Risky operation
    const result = await someAsyncOperation();
    await ctx.reply(\`✅ Success: \${result}\`);
  } catch (error) {
    ctx.logger.logError(error as Error, 'risky command');
    await ctx.reply('❌ Operation failed. Please try again later.');
  }
});

// ✅ DO: Batch session updates for performance
botManager.handleCommand('batch', async (ctx: CustomContext) => {
  // Instead of multiple setCustom calls
  ctx.session.updateCustom({
    'stats.commandsUsed': (ctx.session.getCustom('stats.commandsUsed') || 0) + 1,
    'stats.lastCommand': 'batch',
    'stats.lastUsed': new Date().toISOString(),
    'user.lastActive': Date.now()
  });
});

// ✅ DO: Use context for rich responses
botManager.handleCommand('profile', async (ctx: CustomContext) => {
  const profile = ctx.session.getCustom('profile') || {};
  const isPrivateChat = ctx.chat.type === 'private';
  
  const response = [
    \`👤 Profile for \${ctx.from.first_name}\`,
    \`📱 User ID: \${ctx.from.id}\`,
    isPrivateChat ? \`💬 Private chat\` : \`👥 Group: \${ctx.chat.title}\`,
    \`⏰ Member since: \${ctx.session.createdAt.toLocaleDateString()}\`,
    \`🎯 Commands used: \${profile.stats?.commandsUsed || 0}\`
  ].filter(Boolean).join('\\n');
  
  await ctx.reply(response);
});

// ✅ DO: Clean up session data when needed
botManager.handleCommand('reset', async (ctx: CustomContext) => {
  // Clean up temporary data
  ctx.session.deleteCustom('wizard');
  ctx.session.deleteCustom('tempData');
  ctx.session.deleteCustom('cache');
  
  ctx.logger.logUserAction('session_reset', { userId: ctx.from.id });
  await ctx.reply('🗑️ Session data cleared!');
});`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <div className="flex items-center mb-4">
            <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Context Deep Dive
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Master the Context object - explore advanced patterns, session management, logging, 
            and performance optimization techniques in the Mangi SDK.
          </p>
        </div>

        {/* Understanding Grammy Context */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Understanding Grammy Context Foundation
          </h2>
          <div className="mb-6">
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
              The Mangi SDK extends Grammy's context with additional safety guarantees and features. 
              Here's the base Grammy context structure:
            </p>
          </div>
          <CodeBlock code={grammyContextCode} title="Grammy Context Interface" />
        </section>

        {/* Mangi Enhanced Context */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Mangi SDK Enhanced Context
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The Mangi SDK transforms the Grammy context into a more powerful and safer interface:
          </p>
          <CodeBlock code={mangiEnhancedCode} title="Mangi CustomContext Interface" />
        </section>

        {/* Context Methods */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Complete Context Methods Reference
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Here's a comprehensive list of available context methods for interacting with the Telegram Bot API:
          </p>
          <CodeBlock code={contextMethodsCode} title="Context Methods Overview" />
        </section>

        {/* Session Deep Dive */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Advanced Session Management
          </h2>
          <div className="mb-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start">
                <Database className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Persistent User Data
                  </h4>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    Sessions automatically persist to Redis (if configured) and provide atomic operations 
                    for complex data structures. Perfect for user preferences, state machines, and analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <CodeBlock code={sessionDeepDiveCode} title="Advanced Session Patterns" />
        </section>

        {/* Logging Deep Dive */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Professional Logging Patterns
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The context logger provides structured logging with automatic context enrichment:
          </p>
          <CodeBlock code={loggingDeepDiveCode} title="Advanced Logging Examples" />
        </section>

        {/* Advanced Patterns */}
        <section>
          <h2 className="text-2xl font-semibent text-gray-900 dark:text-white mb-6">
            Advanced Context Patterns
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Explore sophisticated patterns for building complex bot interactions:
          </p>
          <CodeBlock code={advancedPatternsCode} title="Advanced Context Patterns" />
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Context Best Practices & Performance
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Follow these patterns to build maintainable and performant bots:
          </p>
          <CodeBlock code={contextBestPracticesCode} title="Context Best Practices" />
        </section>

        {/* Context Lifecycle */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Context Lifecycle & Memory Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Context Creation</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Created for each incoming update</li>
                <li>• Session loaded from Redis/memory</li>
                <li>• Logger initialized with user context</li>
                <li>• JWT validated if present</li>
                <li>• Middleware chain executed</li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Context Cleanup</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Session automatically saved</li>
                <li>• Logs flushed to storage</li>
                <li>• Memory references cleared</li>
                <li>• Error states logged</li>
                <li>• Metrics updated</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Performance Tips */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Performance Optimization Tips
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    Session Optimization
                  </h4>
                  <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                    <li>• Use <code>updateCustom()</code> for batch updates instead of multiple <code>setCustom()</code> calls</li>
                    <li>• Clean up temporary session data with <code>deleteCustom()</code></li>
                    <li>• Store only serializable data in sessions</li>
                    <li>• Use session TTL for temporary data</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Logging Performance
                  </h4>
                  <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                    <li>• Use appropriate log levels (debug only in development)</li>
                    <li>• Structure log data as objects for better searchability</li>
                    <li>• Avoid logging sensitive information</li>
                    <li>• Use <code>logUserAction()</code> for business events</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                    API Call Optimization
                  </h4>
                  <ul className="text-purple-800 dark:text-purple-200 text-sm space-y-1">
                    <li>• Use <code>ctx.reply()</code> instead of <code>ctx.api.sendMessage()</code> when possible</li>
                    <li>• Batch multiple API calls when appropriate</li>
                    <li>• Handle rate limits gracefully</li>
                    <li>• Cache frequently accessed data in sessions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContextDeepDive;
