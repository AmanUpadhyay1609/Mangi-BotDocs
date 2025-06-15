import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { Shield, Key, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const JwtAuth = () => {
  const fullAuthCode = `import { Bot, AppConfig, CustomContext, logger } from '@wasserstoff/mangi-tg-bot';

const config: AppConfig = {
  botToken: 'YOUR_BOT_TOKEN',
  botMode: 'polling',
  botAllowedUpdates: ['message', 'callback_query'],
  redisUrl: 'YOUR_REDIS_URL',
  isDev: true,
  useAuth: 'fully', // All routes require JWT authentication
  jwtSecret: 'your_super_secret_jwt_key_here', // Keep this secret!
};

async function createSecureBot() {
  logger.info('Starting bot with full JWT authentication:', config);
  const bot = new Bot(config);
  await bot.initialize();
  const botManager = bot.getBotManager();

  // Only users with valid JWT tokens can access these commands
  botManager.handleCommand('start', async (ctx: CustomContext) => {
    await ctx.api.sendMessage(
      ctx.chat.id,
      '🔐 Welcome! You are authenticated with a valid JWT token.'
    );
  });

  botManager.handleCommand('profile', async (ctx: CustomContext) => {
    // Access user information from JWT payload
    await ctx.api.sendMessage(
      ctx.chat.id,
      \`🆔 Your authenticated chat ID: <code>\${ctx.from.id}</code>\`,
      { parse_mode: 'HTML' }
    );
  });

  botManager.handleCommand('secret', async (ctx: CustomContext) => {
    await ctx.api.sendMessage(
      ctx.chat.id,
      '🎯 This is a protected command only for authenticated users!'
    );
  });

  logger.info('🔒 Secure bot is now running with JWT authentication!');
}

createSecureBot().catch(console.error);`;

  const partialAuthCode = `const config: AppConfig = {
  botToken: 'YOUR_BOT_TOKEN',
  redisUrl: 'YOUR_REDIS_URL',
  isDev: true,
  useAuth: 'partially', // Only some routes require JWT
  jwtSecret: 'your_jwt_secret_here',
};

const bot = new Bot(config);
const botManager = bot.getBotManager();

// Public commands (no JWT required)
botManager.handleCommand('start', async (ctx: CustomContext) => {
  await ctx.reply('👋 Welcome! This is a public command.');
});

botManager.handleCommand('help', async (ctx: CustomContext) => {
  await ctx.reply('ℹ️ Public help information available to everyone.');
});

// Protected commands (require specific check)
botManager.handleMessage(true, async (ctx: CustomContext) => {
  // First parameter 'true' means: require JWT for this handler
  await ctx.reply('🔐 This message handler requires JWT authentication!');
});

botManager.handleCallback(true, async (ctx: CustomContext) => {
  // First parameter 'true' means: require JWT for this handler
  await ctx.reply('🔐 This callback handler requires JWT authentication!');
};`;

  const jwtGenerationCode = `// Example: Generating JWT tokens for your users
import jwt from 'jsonwebtoken';

function generateJWTForUser(userId: number, username?: string) {
  const payload = {
    userId: userId,
    username: username,
    iat: Math.floor(Date.now() / 1000), // Issued at
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // Expires in 24 hours
  };
  
  const token = jwt.sign(payload, 'your_jwt_secret_here');
  return token;
}

// Usage example
const userToken = generateJWTForUser(123456789, 'john_doe');
console.log('Generated token:', userToken);

// Users would send this token when interacting with your bot
// The SDK automatically validates it for protected routes`;

  const middlewareFlowCode = `// How JWT authentication works internally:

1. User sends a message/command to your bot
2. SDK checks the useAuth configuration:
   - 'fully': All routes require JWT
   - 'partially': Only routes with explicit requirement need JWT
   - 'none': No JWT required
3. If JWT is required:
   - SDK extracts JWT from the message metadata
   - Validates the token using your jwtSecret
   - If valid: User can access the command
   - If invalid/missing: User gets an authentication error
4. Your command handler runs with authenticated context`;

  const authModes = [
    {
      mode: 'fully',
      icon: Lock,
      title: 'Full Authentication',
      description: 'All commands and handlers require valid JWT tokens',
      useCase: 'Private bots, internal tools, paid services',
      security: 'Maximum',
      complexity: 'Simple'
    },
    {
      mode: 'partially', 
      icon: Key,
      title: 'Partial Authentication',
      description: 'Mix of public and protected routes based on handler configuration',
      useCase: 'Public bots with premium features, freemium models',
      security: 'Flexible',
      complexity: 'Moderate'
    },
    {
      mode: 'none',
      icon: CheckCircle,
      title: 'No Authentication',
      description: 'All routes are public, no JWT validation',
      useCase: 'Public information bots, simple utilities',
      security: 'None',
      complexity: 'Minimal'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <div className="flex items-center mb-4">
            <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              JWT Authentication
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Secure your Telegram bot with JSON Web Token (JWT) authentication. 
            Control access to your bot's features with industry-standard security.
          </p>
        </div>

        {/* What is JWT */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            What is JWT Authentication?
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <p className="text-blue-900 dark:text-blue-100 mb-4">
              JWT (JSON Web Token) is a secure way to verify that users are who they claim to be. 
              Think of it like a special pass or ID card that proves someone has permission to use your bot.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🎫</span>
                </div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Secure</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">Cryptographically signed</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">⏰</span>
                </div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Time-limited</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">Expires automatically</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🔍</span>
                </div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Verifiable</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">Cannot be faked</p>
              </div>
            </div>
          </div>
        </section>

        {/* Authentication Modes */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Authentication Modes
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The SDK supports three authentication modes to fit different use cases:
          </p>
          <div className="grid grid-cols-1 gap-6">
            {authModes.map((mode) => (
              <div key={mode.mode} className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <mode.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {mode.title} <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">useAuth: '{mode.mode}'</code>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{mode.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Use Case:</span>
                        <p className="text-gray-600 dark:text-gray-400">{mode.useCase}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Security:</span>
                        <p className="text-gray-600 dark:text-gray-400">{mode.security}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Complexity:</span>
                        <p className="text-gray-600 dark:text-gray-400">{mode.complexity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full Authentication Example */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Full Authentication Example
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            With <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">useAuth: 'fully'</code>, 
            all commands require valid JWT tokens. This is the most secure option:
          </p>
          <CodeBlock code={fullAuthCode} title="Fully Authenticated Bot" />
        </section>

        {/* Partial Authentication Example */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Partial Authentication Example
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            With <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">useAuth: 'partially'</code>, 
            you can mix public and protected routes by passing a boolean to handlers:
          </p>
          <CodeBlock code={partialAuthCode} title="Partially Authenticated Bot" />
          
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                  Important: Handler Parameters
                </h4>
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  For <code>handleMessage</code> and <code>handleCallback</code>, the first parameter is a boolean 
                  indicating whether JWT authentication is required for that specific handler.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* JWT Generation */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Generating JWT Tokens
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You'll need to generate JWT tokens for your users. Here's how to create them:
          </p>
          <CodeBlock code={jwtGenerationCode} title="JWT Token Generation" />
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              🔐 Security Best Practices:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-200 text-sm">
              <li>Keep your JWT secret key long and random (at least 32 characters)</li>
              <li>Store the secret in environment variables, never in code</li>
              <li>Set appropriate expiration times for tokens</li>
              <li>Consider implementing token refresh mechanisms for long-lived bots</li>
            </ul>
          </div>
        </section>

        {/* How it Works */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            How JWT Authentication Works
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line font-mono">
              {middlewareFlowCode}
            </pre>
          </div>
        </section>

        {/* Configuration Reference */}
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
                    <code>useAuth</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <code>'fully' | 'partially' | 'none'</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                    Authentication mode for the bot
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    <code>jwtSecret</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <code>string</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                    Secret key for signing and verifying JWT tokens (required if useAuth is not 'none')
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JwtAuth;
