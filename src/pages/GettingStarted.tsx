import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { CheckCircle, AlertCircle } from 'lucide-react';

const GettingStarted = () => {
  const installationCode = `npm install @wasserstoff/mangi-tg-bot`;

  const basicBotCode = `import { Bot, AppConfig, CustomContext, logger } from '@wasserstoff/mangi-tg-bot';

const config: AppConfig = {
  botToken: 'YOUR_BOT_TOKEN',
  botMode: 'polling',
  botAllowedUpdates: ['message', 'callback_query'],
  redisUrl: 'YOUR_REDIS_URL',
  isDev: true,
  useAuth: 'none' // No authentication for basic setup
};

async function createBasicBot() {
  logger.info('Starting basic bot:', config);
  const bot = new Bot(config);
  await bot.initialize();
  const botManager = bot.getBotManager();

  // Handle the /start command
  botManager.handleCommand('start', async (ctx: CustomContext) => {
    await ctx.api.sendMessage(
      ctx.chat.id,
      'Welcome to your first Mangi TG Bot! 🎉'
    );
  });

  // Handle the /help command
  botManager.handleCommand('help', async (ctx: CustomContext) => {
    await ctx.api.sendMessage(
      ctx.chat.id,
      'Available commands:\\n/start - Start the bot\\n/help - Show this help message'
    );
  });

  // Set up command menu
  botManager.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'help', description: 'Show help information' }
  ]);

  logger.info('Bot is now running!');
}

createBasicBot().catch(console.error);`;

  const prerequisites = [
    {
      title: 'Node.js',
      description: 'Version 14 or higher',
      status: 'required'
    },
    {
      title: 'Redis',
      description: 'For session and approval state storage',
      status: 'required'
    },
    {
      title: 'Telegram Bot Token',
      description: 'Get one from @BotFather on Telegram',
      status: 'required'
    },
    {
      title: 'TypeScript Knowledge',
      description: 'Basic understanding recommended',
      status: 'recommended'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Getting Started
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Learn how to set up and create your first Telegram bot with the Mangi TG Bot SDK.
          </p>
        </div>

        {/* Prerequisites */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Prerequisites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prerequisites.map((item, index) => (
              <div key={index} className="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex-shrink-0 mr-3">
                  {item.status === 'required' ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Installation */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Installation
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Install the Mangi TG Bot SDK using npm:
          </p>
          <CodeBlock code={installationCode} language="bash" title="Terminal" />
        </section>

        {/* Getting Bot Token */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Getting Your Bot Token
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              To create a Telegram bot, you need to get a bot token from BotFather:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
              <li>Open Telegram and search for <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">@BotFather</code></li>
              <li>Send <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">/newbot</code> command</li>
              <li>Follow the instructions to choose a name and username for your bot</li>
              <li>Copy the bot token (it looks like <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">123456789:ABC-DEF1234ghIkl-zyx57W2v1u123ew11</code>)</li>
            </ol>
          </div>
        </section>

        {/* Basic Bot Example */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Your First Bot
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Here's a complete example of a basic bot that responds to commands:
          </p>
          <CodeBlock code={basicBotCode} title="basic-bot.ts" />
        </section>

        {/* Environment Setup */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Environment Configuration
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For production use, store your credentials in environment variables:
          </p>
          <CodeBlock 
            code={`# .env file
BOT_TOKEN=your_bot_token_here
REDIS_URL=redis://localhost:6379
NODE_ENV=development`}
            language="bash"
            title=".env"
          />
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Then update your configuration:
          </p>
          <CodeBlock 
            code={`const config: AppConfig = {
  botToken: process.env.BOT_TOKEN!,
  redisUrl: process.env.REDIS_URL!,
  isDev: process.env.NODE_ENV !== 'production',
  // ... other options
};`}
            title="Updated configuration"
          />
        </section>

        {/* Running the Bot */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Running Your Bot
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Compile and run your TypeScript bot:
            </p>
            <CodeBlock 
              code={`# Compile TypeScript
npx tsc basic-bot.ts

# Run the bot
node basic-bot.js`}
              language="bash"
              title="Terminal"
            />
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-green-800 dark:text-green-200 text-sm">
                <strong>Success!</strong> If everything is set up correctly, you should see log messages indicating that your bot is running.
                Try sending <code>/start</code> to your bot on Telegram!
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Next Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Add Authentication
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Secure your bot with JWT authentication or admin approval systems.
              </p>
            </div>
            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Session Management
              </h3>
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                Learn how to store and manage user data with session CRUD operations.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GettingStarted;
