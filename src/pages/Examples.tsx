
import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { Code, Layers, Zap } from 'lucide-react';

const Examples = () => {
  const basicBotExample = `import { Bot, AppConfig, CustomContext, logger } from '@wasserstoff/mangi-tg-bot';

const config: AppConfig = {
  botToken: 'YOUR_BOT_TOKEN',
  botMode: 'polling',
  botAllowedUpdates: ['message', 'callback_query'],
  redisUrl: 'YOUR_REDIS_URL',
  isDev: true,
  useAuth: 'none',
};

async function createBasicBot() {
  const bot = new Bot(config);
  await bot.initialize();
  const botManager = bot.getBotManager();

  // Welcome command
  botManager.handleCommand('start', async (ctx: CustomContext) => {
    await ctx.reply('🎉 Welcome! I\\'m your new bot assistant.');
  });

  // Echo any message
  botManager.handleMessage(false, async (ctx: CustomContext) => {
    if (ctx.message?.text && !ctx.message.text.startsWith('/')) {
      await ctx.reply(\`You said: "\${ctx.message.text}"\`);
    }
  });

  logger.info('Basic bot started!');
}

createBasicBot().catch(console.error);`;

  const jwtAuthExample = `import { Bot, AppConfig, CustomContext, logger } from '@wasserstoff/mangi-tg-bot';

const config: AppConfig = {
  botToken: 'YOUR_BOT_TOKEN',
  redisUrl: 'YOUR_REDIS_URL',
  isDev: true,
  useAuth: 'fully', // All routes require JWT
  jwtSecret: 'your_super_secret_key_here',
};

async function createSecureBot() {
  const bot = new Bot(config);
  await bot.initialize();
  const botManager = bot.getBotManager();

  // Only authenticated users can access
  botManager.handleCommand('start', async (ctx: CustomContext) => {
    await ctx.reply('🔐 Welcome authenticated user!');
  });

  botManager.handleCommand('profile', async (ctx: CustomContext) => {
    await ctx.reply(\`👤 Your ID: \${ctx.from.id}\\n🆔 Chat ID: \${ctx.chat.id}\`);
  });

  botManager.handleCommand('secure', async (ctx: CustomContext) => {
    await ctx.reply('🛡️ This is a protected endpoint!');
  });

  logger.info('Secure JWT bot started!');
}

createSecureBot().catch(console.error);`;

  const adminApprovalExample = `import { Bot, AppConfig, CustomContext, logger } from '@wasserstoff/mangi-tg-bot';

const config: AppConfig = {
  botToken: 'YOUR_BOT_TOKEN',
  redisUrl: 'YOUR_REDIS_URL',
  isDev: true,
  useAuth: 'none',
  adminAuthentication: true,
  adminChatIds: [123456789, 987654321], // Replace with your admin IDs
};

async function createApprovalBot() {
  const bot = new Bot(config);
  await bot.initialize();
  const botManager = bot.getBotManager();

  // Only approved users can access
  botManager.handleCommand('start', async (ctx: CustomContext) => {
    await ctx.reply('✅ Welcome approved member!');
  });

  botManager.handleCommand('exclusive', async (ctx: CustomContext) => {
    await ctx.reply('🌟 This is exclusive content for approved users only!');
  });

  // Admin-only command
  botManager.handleCommand('admin', async (ctx: CustomContext) => {
    if (!config.adminChatIds.includes(ctx.from.id)) {
      await ctx.reply('❌ Admin only command.');
      return;
    }
    await ctx.reply('👑 Welcome admin! You have special privileges.');
  });

  logger.info('Admin approval bot started!');
}

createApprovalBot().catch(console.error);`;

  const sessionCrudExample = `import { Bot, AppConfig, CustomContext, logger } from '@wasserstoff/mangi-tg-bot';

const config: AppConfig = {
  botToken: 'YOUR_BOT_TOKEN',
  redisUrl: 'YOUR_REDIS_URL',
  isDev: true,
  useAuth: 'none',
};

async function createSessionBot() {
  const bot = new Bot(config);
  await bot.initialize();
  const botManager = bot.getBotManager();

  // User profile management
  botManager.handleCommand('profile', async (ctx: CustomContext) => {
    const profile = ctx.session.getCustom('profile');
    if (!profile) {
      await ctx.reply('📝 No profile found. Use /setname to create one!');
      return;
    }
    
    await ctx.reply(
      \`👤 Your Profile:\\n\` +
      \`Name: \${profile.name || 'Not set'}\\n\` +
      \`Age: \${profile.age || 'Not set'}\\n\` +
      \`Theme: \${ctx.session.getCustom('theme') || 'default'}\`
    );
  });

  botManager.handleCommand('setname', async (ctx: CustomContext) => {
    const args = ctx.message?.text?.split(' ').slice(1);
    if (!args?.length) {
      await ctx.reply('Usage: /setname <your name>');
      return;
    }
    
    const name = args.join(' ');
    ctx.session.setCustom('profile.name', name);
    await ctx.reply(\`✅ Name set to: \${name}\`);
  });

  botManager.handleCommand('setage', async (ctx: CustomContext) => {
    const args = ctx.message?.text?.split(' ').slice(1);
    if (!args?.length) {
      await ctx.reply('Usage: /setage <your age>');
      return;
    }
    
    const age = parseInt(args[0]);
    if (isNaN(age) || age < 1 || age > 150) {
      await ctx.reply('❌ Please enter a valid age (1-150)');
      return;
    }
    
    ctx.session.setCustom('profile.age', age);
    await ctx.reply(\`✅ Age set to: \${age}\`);
  });

  botManager.handleCommand('theme', async (ctx: CustomContext) => {
    const args = ctx.message?.text?.split(' ').slice(1);
    if (!args?.length) {
      const current = ctx.session.getCustom('theme') || 'default';
      await ctx.reply(\`Current theme: \${current}\\nUsage: /theme <dark|light|auto>\`);
      return;
    }
    
    const theme = args[0].toLowerCase();
    if (!['dark', 'light', 'auto'].includes(theme)) {
      await ctx.reply('❌ Invalid theme. Use: dark, light, or auto');
      return;
    }
    
    ctx.session.setCustom('theme', theme);
    await ctx.reply(\`🎨 Theme changed to: \${theme}\`);
  });

  logger.info('Session CRUD bot started!');
}

createSessionBot().catch(console.error);`;

  const combinedExample = `import { Bot, AppConfig, CustomContext, logger } from '@wasserstoff/mangi-tg-bot';

const config: AppConfig = {
  botToken: 'YOUR_BOT_TOKEN',
  redisUrl: 'YOUR_REDIS_URL',
  isDev: true,
  useAuth: 'fully', // JWT required
  jwtSecret: 'your_jwt_secret_here',
  adminAuthentication: true, // Also require admin approval
  adminChatIds: [123456789],
};

async function createFullFeaturedBot() {
  const bot = new Bot(config);
  await bot.initialize();
  const botManager = bot.getBotManager();

  // Set up command menu
  botManager.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'profile', description: 'View your profile' },
    { command: 'settings', description: 'Bot settings' },
    { command: 'help', description: 'Get help' },
  ]);

  // Welcome (requires JWT + admin approval)
  botManager.handleCommand('start', async (ctx: CustomContext) => {
    ctx.logger.info(\`User \${ctx.from.id} started the bot\`);
    
    const visits = ctx.session.getCustom('visits') || 0;
    ctx.session.setCustom('visits', visits + 1);
    
    await ctx.reply(
      \`🎉 Welcome back! You're authenticated and approved.\\n\` +
      \`📊 Total visits: \${visits + 1}\`
    );
  });

  // Profile with session data
  botManager.handleCommand('profile', async (ctx: CustomContext) => {
    const profile = ctx.session.getCustom('profile') || {};
    const theme = ctx.session.getCustom('theme') || 'default';
    
    await ctx.reply(
      \`👤 Profile:\\n\` +
      \`ID: \${ctx.from.id}\\n\` +
      \`Name: \${profile.name || 'Not set'}\\n\` +
      \`Theme: \${theme}\\n\` +
      \`Visits: \${ctx.session.getCustom('visits') || 0}\`
    );
  });

  // Interactive settings with buttons
  botManager.handleCommand('settings', async (ctx: CustomContext) => {
    await ctx.api.sendMessage(ctx.chat.id, '⚙️ Choose a setting:', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🎨 Dark Theme', callback_data: 'theme_dark' },
            { text: '🎨 Light Theme', callback_data: 'theme_light' }
          ],
          [
            { text: '📊 View Stats', callback_data: 'stats' },
            { text: '🗑️ Clear Data', callback_data: 'clear' }
          ]
        ]
      }
    });
  });

  // Handle button callbacks
  botManager.handleCallback(true, async (ctx: CustomContext) => {
    const data = ctx.callback_query?.data;
    if (!data) return;

    if (data.startsWith('theme_')) {
      const theme = data.replace('theme_', '');
      ctx.session.setCustom('theme', theme);
      await ctx.answerCallbackQuery({ text: \`Theme changed to \${theme}!\` });
      await ctx.editMessageText(\`✅ Theme set to: \${theme}\`);
      
    } else if (data === 'stats') {
      const visits = ctx.session.getCustom('visits') || 0;
      const profile = ctx.session.getCustom('profile') || {};
      await ctx.editMessageText(
        \`📊 Your Stats:\\n\` +
        \`Visits: \${visits}\\n\` +
        \`Profile: \${profile.name ? 'Set' : 'Not set'}\`
      );
      
    } else if (data === 'clear') {
      ctx.session.deleteCustom('profile');
      ctx.session.setCustom('visits', 0);
      await ctx.answerCallbackQuery({ text: 'Data cleared!' });
      await ctx.editMessageText('🗑️ All your data has been cleared.');
    }
  });

  // Admin-only features
  botManager.handleCommand('admin', async (ctx: CustomContext) => {
    if (!config.adminChatIds.includes(ctx.from.id)) {
      await ctx.reply('❌ Admin only command.');
      return;
    }
    
    await ctx.reply(
      \`👑 Admin Panel:\\n\` +
      \`/broadcast <message> - Send to all users\\n\` +
      \`/stats - Bot statistics\`
    );
  });

  logger.info('🚀 Full-featured bot with all security layers started!');
}

createFullFeaturedBot().catch(console.error);`;

  const examples = [
    {
      title: 'Basic Echo Bot',
      description: 'Simple bot that echoes user messages',
      icon: Zap,
      code: basicBotExample,
      features: ['Message handling', 'Basic commands', 'No authentication']
    },
    {
      title: 'JWT Authenticated Bot',
      description: 'Secure bot requiring JWT tokens for all features',
      icon: Layers,
      code: jwtAuthExample,
      features: ['JWT authentication', 'Protected routes', 'Secure endpoints']
    },
    {
      title: 'Admin Approval Bot',
      description: 'Bot with admin approval system for new users',
      icon: Code,
      code: adminApprovalExample,
      features: ['Admin approval', 'User management', 'Controlled access']
    },
    {
      title: 'Session Management Bot',
      description: 'Advanced bot using session CRUD operations',
      icon: Layers,
      code: sessionCrudExample,
      features: ['Session CRUD', 'User profiles', 'Data persistence']
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
              Complete Examples
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Ready-to-use examples showcasing different features of the Mangi TG Bot SDK. 
            Copy, paste, and customize these examples for your own projects.
          </p>
        </div>

        {/* Individual Examples */}
        {examples.map((example, index) => (
          <section key={index}>
            <div className="flex items-center mb-4">
              <example.icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {example.title}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {example.description}
            </p>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features:</h3>
              <div className="flex flex-wrap gap-2">
                {example.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            <CodeBlock code={example.code} title={`${example.title} Implementation`} />
          </section>
        ))}

        {/* Full-Featured Example */}
        <section>
          <div className="flex items-center mb-4">
            <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Complete Full-Featured Bot
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This comprehensive example combines all SDK features: JWT authentication, admin approval, 
            session management, interactive buttons, logging, and more.
          </p>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features:</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'JWT Authentication',
                'Admin Approval',
                'Session CRUD',
                'Interactive Buttons',
                'Professional Logging',
                'Command Menu',
                'User Statistics',
                'Theme System'
              ].map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          
          <CodeBlock code={combinedExample} title="Complete Full-Featured Bot" />
          
          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
              🚀 Production Ready
            </h4>
            <p className="text-purple-800 dark:text-purple-200 text-sm">
              This example demonstrates enterprise-level security and features. Users need both valid JWT tokens 
              AND admin approval to access the bot. It includes session management, interactive UI, 
              and comprehensive logging.
            </p>
          </div>
        </section>

        {/* Quick Start Guide */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Running These Examples
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                1. Prerequisites
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Node.js (v14 or higher)</li>
                <li>• Redis server running</li>
                <li>• Telegram bot token from @BotFather</li>
                <li>• Your Telegram chat ID (for admin examples)</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                2. Setup Steps
              </h3>
              <CodeBlock 
                code={`# Install the SDK
npm install @wasserstoff/mangi-tg-bot

# Replace YOUR_BOT_TOKEN with your actual bot token
# Replace YOUR_REDIS_URL with your Redis connection string
# Replace admin chat IDs with your Telegram user ID

# Run the example
npx tsc your-bot.ts && node your-bot.js`}
                language="bash"
              />
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">
                3. Testing Your Bot
              </h3>
              <p className="text-sm text-green-800 dark:text-green-200">
                Once running, search for your bot on Telegram and send <code>/start</code>. 
                For authenticated examples, you'll need to implement token generation or use the admin approval flow.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Examples;
