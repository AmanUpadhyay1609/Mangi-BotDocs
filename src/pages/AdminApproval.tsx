
import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { Users, UserCheck, UserX, Shield, AlertCircle, CheckCircle } from 'lucide-react';

const AdminApproval = () => {
  const basicAdminCode = `import { Bot, AppConfig, CustomContext, logger } from '@wasserstoff/mangi-tg-bot';

const config: AppConfig = {
  botToken: 'YOUR_BOT_TOKEN',
  botMode: 'polling',
  botAllowedUpdates: ['message', 'callback_query'],
  redisUrl: 'YOUR_REDIS_URL',
  isDev: true,
  useAuth: 'none', // No JWT required for this example
  adminAuthentication: true, // Enable admin approval system
  adminChatIds: [123456789, 987654321], // Replace with your admin Telegram chat IDs
};

async function createAdminApprovalBot() {
  logger.info('Starting bot with admin approval:', config);
  const bot = new Bot(config);
  await bot.initialize();
  const botManager = bot.getBotManager();

  // This command will only work for approved users
  botManager.handleCommand('start', async (ctx: CustomContext) => {
    await ctx.api.sendMessage(
      ctx.chat.id,
      '🎉 Welcome! You have been approved by an admin to use this bot.'
    );
  });

  // Only approved users can see their status
  botManager.handleCommand('status', async (ctx: CustomContext) => {
    await ctx.api.sendMessage(
      ctx.chat.id,
      \`✅ Your status: Approved\\n🆔 Your ID: \${ctx.from.id}\`
    );
  });

  // Premium feature only for approved users
  botManager.handleCommand('premium', async (ctx: CustomContext) => {
    await ctx.api.sendMessage(
      ctx.chat.id,
      '💎 This is a premium feature available only to approved members!'
    );
  });

  logger.info('🔒 Admin approval bot is now running!');
}

createAdminApprovalBot().catch(console.error);`;

  const combinedAuthCode = `// Combining JWT Auth + Admin Approval for maximum security
const config: AppConfig = {
  botToken: 'YOUR_BOT_TOKEN',
  redisUrl: 'YOUR_REDIS_URL',
  isDev: true,
  useAuth: 'fully', // JWT required for ALL routes
  jwtSecret: 'your_jwt_secret_here',
  adminAuthentication: true, // ALSO require admin approval
  adminChatIds: [123456789], // Your admin's Telegram ID
};

// Now users need BOTH:
// 1. Valid JWT token
// 2. Admin approval
// This provides double-layer security!`;

  const approvalFlowCode = `/* Admin Approval Flow:

1. 👤 NEW USER INTERACTION
   - User sends /start (or any command) to bot
   - SDK checks if user exists in Redis
   - If new: user status set to "pending"

2. 🚫 USER BLOCKED (Temporarily)
   - User receives: "Your request is pending admin approval"
   - User cannot use any bot features

3. 📢 ADMIN NOTIFICATION
   - ALL admins (from adminChatIds) receive message:
     "New user wants to join: @username (ID: 123456789)"
   - Message includes two buttons: [✅ Approve] [❌ Deny]

4A. ✅ ADMIN APPROVES
    - Admin clicks "Approve" button
    - User status changed to "member" in Redis
    - User receives: "You have been approved!"
    - User can now use all bot features

4B. ❌ ADMIN DENIES
    - Admin clicks "Deny" button  
    - User status changed to "denied" in Redis
    - User receives: "Access denied"
    - User remains blocked from bot features

*/`;

  const userStatusesCode = `// User Status System in Redis:

interface UserStatus {
  status: 'pending' | 'member' | 'admin' | 'denied';
  approvedBy?: number; // Admin ID who approved
  approvedAt?: Date;   // When approved
  deniedBy?: number;   // Admin ID who denied
  deniedAt?: Date;     // When denied
}

// Status Meanings:
// 'pending'  - New user waiting for approval
// 'member'   - Approved user, can use bot normally  
// 'admin'    - Admin user (from adminChatIds)
// 'denied'   - Rejected user, blocked from bot

// Users with 'member' or 'admin' status can use the bot
// Users with 'pending' or 'denied' status are blocked`;

  const adminCommandsCode = `// Special Admin Commands (automatically available)

botManager.handleCommand('admin', async (ctx: CustomContext) => {
  // Only admins (users in adminChatIds) can use this
  if (!config.adminChatIds.includes(ctx.from.id)) {
    await ctx.reply('❌ This command is only for admins.');
    return;
  }
  
  await ctx.reply('👑 Admin panel:\\n/listpending - View pending users\\n/stats - View bot statistics');
});

botManager.handleCommand('listpending', async (ctx: CustomContext) => {
  if (!config.adminChatIds.includes(ctx.from.id)) {
    await ctx.reply('❌ Admin only command.');
    return;
  }
  
  // This would query Redis for users with status 'pending'
  // Implementation depends on your Redis setup
  await ctx.reply('📋 Pending users: [list would go here]');
});`;

  const approvalStates = [
    {
      status: 'pending',
      icon: AlertCircle,
      color: 'yellow',
      title: 'Pending Approval',
      description: 'New user waiting for admin approval',
      access: 'Blocked from all features'
    },
    {
      status: 'member',
      icon: CheckCircle,
      color: 'green', 
      title: 'Approved Member',
      description: 'User approved by an admin',
      access: 'Full access to bot features'
    },
    {
      status: 'admin',
      icon: Shield,
      color: 'blue',
      title: 'Administrator',
      description: 'Admin user (from adminChatIds)',
      access: 'Full access + admin commands'
    },
    {
      status: 'denied',
      icon: UserX,
      color: 'red',
      title: 'Access Denied',
      description: 'User denied by an admin',
      access: 'Permanently blocked'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
      green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
      red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string) => {
    const colors = {
      yellow: 'text-yellow-600 dark:text-yellow-400',
      green: 'text-green-600 dark:text-green-400',
      blue: 'text-blue-600 dark:text-blue-400',
      red: 'text-red-600 dark:text-red-400'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Admin Approval System
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Add an extra layer of security with admin approval for new users. Perfect for private communities, 
            organizations, or any bot where you want to control who gets access.
          </p>
        </div>

        {/* What is Admin Approval */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            What is Admin Approval?
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <p className="text-blue-900 dark:text-blue-100 mb-4">
              Admin approval is like having a bouncer at a club - new users can't just walk in and start using your bot. 
              Instead, they have to wait for an admin to approve them first. This gives you complete control over who can access your bot.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🚪</span>
                </div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Controlled Access</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">Only approved users can use the bot</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">👥</span>
                </div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Multiple Admins</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">Support for multiple administrators</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Instant Decisions</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">One-click approve/deny with buttons</p>
              </div>
            </div>
          </div>
        </section>

        {/* User Status System */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            User Status System
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The admin approval system manages users through four distinct statuses:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvalStates.map((state) => (
              <div key={state.status} className={`p-4 border rounded-lg ${getColorClasses(state.color)}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <state.icon className={`h-5 w-5 ${getIconColor(state.color)}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{state.title}</h3>
                    <p className="text-sm mb-2">{state.description}</p>
                    <p className="text-xs font-medium">{state.access}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            How the Approval Process Works
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line font-mono">
              {approvalFlowCode}
            </pre>
          </div>
        </section>

        {/* Basic Setup */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Basic Admin Approval Setup
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Here's how to set up a bot with admin approval. Only approved users can access any commands:
          </p>
          <CodeBlock code={basicAdminCode} title="Admin Approval Bot" />
          
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                  Finding Your Telegram Chat ID
                </h4>
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  To get your Telegram chat ID: Send a message to your bot, then add a temporary command 
                  to log <code>ctx.from.id</code>. This number is what you put in <code>adminChatIds</code>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* User Status Details */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            User Status Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The SDK automatically manages user statuses in Redis:
          </p>
          <CodeBlock code={userStatusesCode} title="User Status System" />
        </section>

        {/* Combined with JWT */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Combining with JWT Authentication
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For maximum security, you can combine admin approval with JWT authentication. 
            Users need both a valid JWT token AND admin approval:
          </p>
          <CodeBlock code={combinedAuthCode} title="Double-Layer Security" />
          
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                  Ultimate Security
                </h4>
                <p className="text-green-800 dark:text-green-200 text-sm">
                  Combining JWT + Admin Approval provides enterprise-level security. Users need technical credentials 
                  (JWT) AND human approval (admin), making unauthorized access nearly impossible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Admin Commands */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Custom Admin Commands
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You can create special commands that only admins can use:
          </p>
          <CodeBlock code={adminCommandsCode} title="Admin-Only Commands" />
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
                    <code>adminAuthentication</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <code>boolean</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                    Enable/disable the admin approval system
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    <code>adminChatIds</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <code>number[]</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                    Array of Telegram chat IDs who can approve/deny users
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Perfect Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                🏢 Company Internal Bots
              </h3>
              <p className="text-purple-800 dark:text-purple-200 text-sm">
                HR can approve new employees to access company resources and information through the bot.
              </p>
            </div>
            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                🎓 Educational Platforms
              </h3>
              <p className="text-indigo-800 dark:text-indigo-200 text-sm">
                Teachers approve students to join class groups and access educational content.
              </p>
            </div>
            <div className="p-6 bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg">
              <h3 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">
                🎮 Gaming Communities
              </h3>
              <p className="text-pink-800 dark:text-pink-200 text-sm">
                Guild leaders approve new members to access exclusive gaming features and tournaments.
              </p>
            </div>
            <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg">
              <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">
                💰 Premium Services
              </h3>
              <p className="text-teal-800 dark:text-teal-200 text-sm">
                Manually verify payment before granting access to premium bot features.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminApproval;
