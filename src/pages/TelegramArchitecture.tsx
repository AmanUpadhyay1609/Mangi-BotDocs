import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { Bot, Network, Shield, Zap, Server, MessageSquare, ExternalLink, AlertTriangle, CheckCircle, Database } from 'lucide-react';

const TelegramArchitecture = () => {
  const botTokenCode = `// Bot Token - Your Bot's Identity
const BOT_TOKEN = "7123456789:AAEhBOweik6ad2X2X1_WeALhXHH3qJOEhBM";

// Token Structure Breakdown:
// 7123456789 - Bot ID (unique identifier)
// : - Separator
// AAEhBOweik6ad2X2X1_WeALhXHH3qJOEhBM - Authentication Hash

// ⚠️ CRITICAL SECURITY NOTES:
// 1. Never commit tokens to version control
// 2. Store tokens in environment variables
// 3. Regenerate tokens if compromised
// 4. Use different tokens for development/production

// Creating a Bot with BotFather:
// 1. Start chat with @BotFather on Telegram
// 2. Send /newbot
// 3. Choose bot name (display name)
// 4. Choose bot username (must end with 'bot')
// 5. Receive your bot token
// 6. Keep token secure!`;

  const webhookVsPollingCode = `// 🔄 POLLING MODE (Pull Updates)
// Bot continuously asks Telegram: "Any new messages?"

class PollingBot {
  private botToken: string;
  private isRunning = false;
  
  constructor(token: string) {
    this.botToken = token;
  }
  
  async startPolling() {
    this.isRunning = true;
    let offset = 0;
    
    while (this.isRunning) {
      try {
        // Ask Telegram for updates
        const response = await fetch(
          \`https://api.telegram.org/bot\${this.botToken}/getUpdates?offset=\${offset}&timeout=30\`
        );
        const data = await response.json();
        
        if (data.ok && data.result.length > 0) {
          // Process each update
          for (const update of data.result) {
            await this.processUpdate(update);
            offset = update.update_id + 1;
          }
        }
        
        // Wait before next poll (if no long polling)
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Polling error:', error);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
  
  async processUpdate(update: any) {
    // Handle the update
    console.log('Received update:', update);
  }
}

// 📡 WEBHOOK MODE (Push Updates)
// Telegram sends updates directly to your server

import express from 'express';
import crypto from 'crypto';

class WebhookBot {
  private app = express();
  private botToken: string;
  private webhookUrl: string;
  
  constructor(token: string, webhookUrl: string) {
    this.botToken = token;
    this.webhookUrl = webhookUrl;
    this.setupMiddleware();
  }
  
  private setupMiddleware() {
    // Parse JSON bodies
    this.app.use(express.json());
    
    // Verify webhook security
    this.app.use('/webhook', (req, res, next) => {
      const secretToken = req.headers['x-telegram-bot-api-secret-token'];
      if (secretToken !== 'your-secret-token') {
        return res.status(403).send('Forbidden');
      }
      next();
    });
  }
  
  async setWebhook() {
    const response = await fetch(
      \`https://api.telegram.org/bot\${this.botToken}/setWebhook\`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: \`\${this.webhookUrl}/webhook\`,
          secret_token: 'your-secret-token',
          allowed_updates: ['message', 'callback_query'],
          drop_pending_updates: true
        })
      }
    );
    
    return response.json();
  }
  
  setupRoutes() {
    // Webhook endpoint
    this.app.post('/webhook', async (req, res) => {
      try {
        const update = req.body;
        await this.processUpdate(update);
        res.status(200).send('OK');
      } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).send('Error');
      }
    });
    
    // Health check
    this.app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK', timestamp: Date.now() });
    });
  }
  
  async processUpdate(update: any) {
    // Handle the update
    console.log('Received update:', update);
  }
  
  start(port: number = 3000) {
    this.setupRoutes();
    this.app.listen(port, () => {
      console.log(\`Webhook server running on port \${port}\`);
    });
  }
}`;

  const telegramApiCode = `// 🌐 TELEGRAM BOT API - Complete Overview

// API Base URL
const API_BASE = "https://api.telegram.org/bot<TOKEN>";

// 📨 SENDING MESSAGES
interface SendMessageOptions {
  chat_id: number | string;           // Required: Chat identifier
  text: string;                       // Required: Message text
  message_thread_id?: number;         // Forum topic thread ID
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  entities?: MessageEntity[];         // Text formatting entities
  disable_web_page_preview?: boolean; // Disable link previews
  disable_notification?: boolean;     // Send silently
  protect_content?: boolean;          // Protect from forwarding
  reply_to_message_id?: number;       // Reply to specific message
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

// Example API calls
const apiExamples = {
  // Send simple text message
  sendMessage: async (chatId: number, text: string) => {
    return fetch(\`\${API_BASE}/sendMessage\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });
  },
  
  // Send photo
  sendPhoto: async (chatId: number, photo: string, caption?: string) => {
    return fetch(\`\${API_BASE}/sendPhoto\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        chat_id: chatId, 
        photo, 
        caption,
        parse_mode: 'HTML'
      })
    });
  },
  
  // Send document
  sendDocument: async (chatId: number, document: string) => {
    return fetch(\`\${API_BASE}/sendDocument\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, document })
    });
  },
  
  // Edit message
  editMessageText: async (chatId: number, messageId: number, text: string) => {
    return fetch(\`\${API_BASE}/editMessageText\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text
      })
    });
  },
  
  // Delete message
  deleteMessage: async (chatId: number, messageId: number) => {
    return fetch(\`\${API_BASE}/deleteMessage\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, message_id: messageId })
    });
  }
};`;

  const updateTypesCode = `// 📋 TELEGRAM UPDATE TYPES - What Your Bot Can Receive

interface Update {
  update_id: number;                    // Unique update identifier
  
  // Message Updates
  message?: Message;                    // New incoming message
  edited_message?: Message;             // Edited message
  channel_post?: Message;               // New channel post
  edited_channel_post?: Message;        // Edited channel post
  
  // Interaction Updates  
  callback_query?: CallbackQuery;       // Button press
  inline_query?: InlineQuery;           // Inline query (@botname query)
  chosen_inline_result?: ChosenInlineResult;
  
  // Payment Updates
  shipping_query?: ShippingQuery;       // Shipping inquiry
  pre_checkout_query?: PreCheckoutQuery; // Pre-checkout query
  
  // Poll Updates
  poll?: Poll;                          // Poll state update
  poll_answer?: PollAnswer;             // Poll answer
  
  // Chat Member Updates
  my_chat_member?: ChatMemberUpdated;   // Bot's chat member status
  chat_member?: ChatMemberUpdated;      // Other member status change
  
  // Join Requests
  chat_join_request?: ChatJoinRequest;  // Join request to group
}

// 💬 MESSAGE STRUCTURE
interface Message {
  message_id: number;                   // Unique message ID
  message_thread_id?: number;           // Forum topic ID
  from?: User;                          // Sender (not for channels)
  sender_chat?: Chat;                   // Sender chat (for channels)
  date: number;                         // Unix timestamp
  chat: Chat;                           // Chat where sent
  forward_from?: User;                  // Original sender (if forwarded)
  forward_from_chat?: Chat;             // Original chat (if forwarded)
  forward_from_message_id?: number;     // Original message ID
  forward_signature?: string;           // Signature of forward
  forward_sender_name?: string;         // Sender name (privacy settings)
  forward_date?: number;                // Forward date
  is_topic_message?: boolean;           // Forum topic message
  is_automatic_forward?: boolean;       // Auto-forwarded from channel
  reply_to_message?: Message;           // Replied message
  via_bot?: User;                       // Bot that sent message
  edit_date?: number;                   // Last edit date
  has_protected_content?: boolean;      // Content protection
  media_group_id?: string;              // Media group ID
  author_signature?: string;            // Author signature
  
  // Content Types
  text?: string;                        // Text content
  entities?: MessageEntity[];           // Text entities (bold, links, etc.)
  animation?: Animation;                // GIF animation
  audio?: Audio;                        // Audio file
  document?: Document;                  // Document file
  photo?: PhotoSize[];                  // Photo (multiple sizes)
  sticker?: Sticker;                    // Sticker
  video?: Video;                        // Video file
  video_note?: VideoNote;               // Video note (circle)
  voice?: Voice;                        // Voice message
  caption?: string;                     // Media caption
  caption_entities?: MessageEntity[];   // Caption entities
  has_media_spoiler?: boolean;          // Media spoiler
  contact?: Contact;                    // Contact info
  dice?: Dice;                          // Dice roll
  game?: Game;                          // Game
  poll?: Poll;                          // Poll
  venue?: Venue;                        // Venue location
  location?: Location;                  // Geographic location
  
  // Group Management
  new_chat_members?: User[];            // New members added
  left_chat_member?: User;              // Member left
  new_chat_title?: string;              // New chat title
  new_chat_photo?: PhotoSize[];         // New chat photo
  delete_chat_photo?: boolean;          // Chat photo deleted
  group_chat_created?: boolean;         // Group created
  supergroup_chat_created?: boolean;    // Supergroup created
  channel_chat_created?: boolean;       // Channel created
  message_auto_delete_timer_changed?: MessageAutoDeleteTimerChanged;
  migrate_to_chat_id?: number;          // Group -> supergroup
  migrate_from_chat_id?: number;        // Supergroup <- group
  pinned_message?: Message;             // Pinned message
  invoice?: Invoice;                    // Invoice
  successful_payment?: SuccessfulPayment;
  user_shared?: UserShared;             // Shared user
  chat_shared?: ChatShared;             // Shared chat
  connected_website?: string;           // Connected website
  write_access_allowed?: WriteAccessAllowed;
  passport_data?: PassportData;         // Telegram Passport
  proximity_alert_triggered?: ProximityAlertTriggered;
  forum_topic_created?: ForumTopicCreated;
  forum_topic_edited?: ForumTopicEdited;
  forum_topic_closed?: ForumTopicClosed;
  forum_topic_reopened?: ForumTopicReopened;
  general_forum_topic_hidden?: GeneralForumTopicHidden;
  general_forum_topic_unhidden?: GeneralForumTopicUnhidden;
  video_chat_scheduled?: VideoChatScheduled;
  video_chat_started?: VideoChatStarted;
  video_chat_ended?: VideoChatEnded;
  video_chat_participants_invited?: VideoChatParticipantsInvited;
  web_app_data?: WebAppData;            // Web App data
}`;

  const rateLimitsCode = `// ⚡ TELEGRAM API RATE LIMITS & BEST PRACTICES

// 📊 OFFICIAL RATE LIMITS (per bot):
const RATE_LIMITS = {
  // Global limits
  messagesPerSecond: 30,              // Max 30 messages/second globally
  messagesPerMinute: 20,              // Max 20 messages/minute to same chat
  
  // Group limits (different chat IDs)
  groupMessages: 20,                  // Max 20/minute per group
  
  // Broadcasting limits
  broadcastBurst: 30,                 // Initial burst of 30 messages
  broadcastSustained: 1,              // Then 1 message/second sustained
  
  // Special methods
  bulkOperations: 1,                  // 1/second for bulk operations
  fileUploads: 20,                    // 20 MB max file size
  
  // API call limits
  apiCallsPerSecond: 30,              // 30 API calls/second
  getUpdatesTimeout: 50,              // Max 50 seconds for long polling
};

// 🛡️ RATE LIMITING IMPLEMENTATION
class RateLimiter {
  private chatLimits = new Map<string, number[]>();
  private globalLimit: number[] = [];
  
  private isAllowed(chatId: string): boolean {
    const now = Date.now();
    const oneMinute = 60 * 1000;
    const oneSecond = 1000;
    
    // Clean old timestamps
    this.globalLimit = this.globalLimit.filter(time => now - time < oneSecond);
    
    const chatTimes = this.chatLimits.get(chatId) || [];
    const recentChatTimes = chatTimes.filter(time => now - time < oneMinute);
    this.chatLimits.set(chatId, recentChatTimes);
    
    // Check limits
    if (this.globalLimit.length >= 30) return false; // Global: 30/second
    if (recentChatTimes.length >= 20) return false;   // Chat: 20/minute
    
    return true;
  }
  
  async sendMessage(chatId: string, text: string): Promise<boolean> {
    if (!this.isAllowed(chatId)) {
      console.warn(\`Rate limit hit for chat \${chatId}\`);
      return false;
    }
    
    const now = Date.now();
    this.globalLimit.push(now);
    const chatTimes = this.chatLimits.get(chatId) || [];
    chatTimes.push(now);
    this.chatLimits.set(chatId, chatTimes);
    
    // Send message
    try {
      await fetch(\`https://api.telegram.org/bot\${BOT_TOKEN}/sendMessage\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text })
      });
      return true;
    } catch (error) {
      console.error('Send message error:', error);
      return false;
    }
  }
}

// 📡 HANDLING RATE LIMIT ERRORS
async function apiCallWithRetry(apiCall: () => Promise<Response>, maxRetries = 3): Promise<any> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await apiCall();
      const data = await response.json();
      
      if (!response.ok) {
        // Handle rate limit (429 Too Many Requests)
        if (response.status === 429) {
          const retryAfter = data.parameters?.retry_after || Math.pow(2, attempt);
          console.warn(\`Rate limited, retrying after \${retryAfter}s\`);
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          continue;
        }
        
        throw new Error(\`API Error: \${data.description}\`);
      }
      
      return data;
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      const delay = Math.pow(2, attempt) * 1000;
      console.warn(\`API call failed (attempt \${attempt}), retrying in \${delay}ms\`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}`;

  const securityBestPracticesCode = `// 🔐 SECURITY BEST PRACTICES

// 1. TOKEN SECURITY
// ❌ Never do this:
const badToken = "7123456789:AAEhBOweik6ad2X2X1_WeALhXHH3qJOEhBM"; // Hardcoded!

// ✅ Do this instead:
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // Environment variable
if (!BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN environment variable is required');
}

// 2. WEBHOOK SECURITY
import crypto from 'crypto';

function verifyTelegramWebhook(body: string, signature: string, secretToken: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secretToken)
    .update(body)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// Express middleware for webhook verification
app.use('/webhook', express.raw({ type: 'application/json' }), (req, res, next) => {
  const signature = req.headers['x-telegram-bot-api-secret-token'] as string;
  const body = req.body.toString();
  
  if (!verifyTelegramWebhook(body, signature, WEBHOOK_SECRET)) {
    return res.status(403).json({ error: 'Invalid signature' });
  }
  
  req.body = JSON.parse(body); // Parse JSON after verification
  next();
});

// 3. INPUT VALIDATION & SANITIZATION
function sanitizeInput(text: string): string {
  // Remove potential HTML/script injection
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
    .substring(0, 4096); // Telegram message limit
}

// 4. USER AUTHORIZATION
class BotSecurity {
  private authorizedUsers = new Set<number>();
  private blockedUsers = new Set<number>();
  private adminUsers = new Set<number>();
  
  constructor() {
    // Load from database or config
    this.loadAuthorizedUsers();
  }
  
  isAuthorized(userId: number): boolean {
    return this.authorizedUsers.has(userId) && !this.blockedUsers.has(userId);
  }
  
  isAdmin(userId: number): boolean {
    return this.adminUsers.has(userId);
  }
  
  isBlocked(userId: number): boolean {
    return this.blockedUsers.has(userId);
  }
  
  blockUser(userId: number, reason?: string): void {
    this.blockedUsers.add(userId);
    console.warn(\`User \${userId} blocked. Reason: \${reason || 'No reason provided'}\`);
  }
  
  // Rate limiting per user
  private userRequestCounts = new Map<number, { count: number; resetTime: number }>();
  
  checkUserRateLimit(userId: number, maxRequests = 10, windowMs = 60000): boolean {
    const now = Date.now();
    const userLimit = this.userRequestCounts.get(userId);
    
    if (!userLimit || now > userLimit.resetTime) {
      this.userRequestCounts.set(userId, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (userLimit.count >= maxRequests) {
      return false;
    }
    
    userLimit.count++;
    return true;
  }
  
  private loadAuthorizedUsers() {
    // Load from environment, database, or config file
    const adminIds = process.env.ADMIN_USER_IDS?.split(',').map(Number) || [];
    adminIds.forEach(id => {
      this.adminUsers.add(id);
      this.authorizedUsers.add(id);
    });
  }
}

// 5. SECURE MESSAGE HANDLING
async function secureMessageHandler(update: any, security: BotSecurity) {
  const message = update.message;
  if (!message?.from) return;
  
  const userId = message.from.id;
  const chatId = message.chat.id;
  
  // Security checks
  if (security.isBlocked(userId)) {
    console.warn(\`Blocked user \${userId} attempted to use bot\`);
    return;
  }
  
  if (!security.checkUserRateLimit(userId)) {
    await sendMessage(chatId, '⚠️ Too many requests. Please wait.');
    return;
  }
  
  if (!security.isAuthorized(userId)) {
    await sendMessage(chatId, '🔐 Access denied. Contact admin for authorization.');
    return;
  }
  
  // Sanitize input
  const userInput = sanitizeInput(message.text || '');
  
  // Process command securely
  await processUserCommand(userId, chatId, userInput);
}

// 6. ENVIRONMENT VARIABLES SETUP
// Create .env file (never commit to git!):
/*
TELEGRAM_BOT_TOKEN=your_bot_token_here
WEBHOOK_SECRET=your_webhook_secret_here
ADMIN_USER_IDS=123456789,987654321
DATABASE_URL=your_database_url_here
REDIS_URL=your_redis_url_here
NODE_ENV=production
*/

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const config = {
  botToken: process.env.TELEGRAM_BOT_TOKEN!,
  webhookSecret: process.env.WEBHOOK_SECRET!,
  adminIds: process.env.ADMIN_USER_IDS?.split(',').map(Number) || [],
  databaseUrl: process.env.DATABASE_URL!,
  redisUrl: process.env.REDIS_URL,
  isDevelopment: process.env.NODE_ENV !== 'production'
};

// Validate required environment variables
Object.entries(config).forEach(([key, value]) => {
  if (key !== 'redisUrl' && !value) {
    throw new Error(\`Missing required environment variable: \${key}\`);
  }
});`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <div className="flex items-center mb-4">
            <Bot className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Telegram Bot Architecture
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Complete guide to understanding how Telegram bots work - from bot tokens and webhooks 
            to API structure and security best practices.
          </p>
        </div>

        {/* Bot Tokens */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Bot Tokens & BotFather
          </h2>
          <div className="mb-6">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                    Security Warning
                  </h4>
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    Bot tokens are sensitive credentials. Never commit them to version control, 
                    share them publicly, or embed them in client-side code. Always use environment variables.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <CodeBlock code={botTokenCode} title="Bot Token Security & Creation" />
        </section>

        {/* Webhook vs Polling */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Webhook vs Polling Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center mb-4">
                <Network className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Polling Mode</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>✅ Simple to implement</li>
                <li>✅ Works behind firewalls</li>
                <li>✅ No SSL certificate needed</li>
                <li>❌ Higher latency</li>
                <li>❌ More resource intensive</li>
                <li>❌ Not suitable for production</li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center mb-4">
                <Server className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Webhook Mode</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>✅ Real-time updates</li>
                <li>✅ Lower resource usage</li>
                <li>✅ Production ready</li>
                <li>✅ Better scalability</li>
                <li>❌ Requires HTTPS</li>
                <li>❌ More complex setup</li>
              </ul>
            </div>
          </div>
          <CodeBlock code={webhookVsPollingCode} title="Polling vs Webhook Implementation" />
        </section>

        {/* Telegram API */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Telegram Bot API Structure
          </h2>
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              <a 
                href="https://core.telegram.org/bots/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Official Telegram Bot API Documentation
              </a>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The Telegram Bot API is a HTTP-based interface that allows you to create Telegram bots. 
              All API requests are made to <code>https://api.telegram.org/bot&lt;token&gt;/&lt;method&gt;</code>:
            </p>
          </div>
          <CodeBlock code={telegramApiCode} title="Telegram Bot API Examples" />
        </section>

        {/* Update Types */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Understanding Telegram Updates
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Telegram sends different types of updates to your bot. Understanding the update structure 
            is crucial for handling all types of user interactions:
          </p>
          <CodeBlock code={updateTypesCode} title="Telegram Update & Message Structure" />
        </section>

        {/* Rate Limits */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Rate Limits & Performance
          </h2>
          <div className="mb-6">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-1">
                    Rate Limit Consequences
                  </h4>
                  <p className="text-red-800 dark:text-red-200 text-sm">
                    Exceeding rate limits can result in your bot being temporarily banned from sending messages. 
                    Always implement proper rate limiting and error handling.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <CodeBlock code={rateLimitsCode} title="Rate Limiting Implementation" />
        </section>

        {/* Security Best Practices */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Security Best Practices
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Security is crucial for production bots. Here are comprehensive security measures 
            you should implement:
          </p>
          <CodeBlock code={securityBestPracticesCode} title="Complete Security Implementation" />
        </section>

        {/* Bot Architecture Patterns */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Common Bot Architecture Patterns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Simple Bot</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Single server instance</li>
                <li>• In-memory storage</li>
                <li>• Basic command handling</li>
                <li>• Suitable for small bots</li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Production Bot</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Load balancer + multiple instances</li>
                <li>• Redis for sessions</li>
                <li>• Database for persistence</li>
                <li>• Queue system for processing</li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Microservices</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Separate services per feature</li>
                <li>• Message bus communication</li>
                <li>• Independent scaling</li>
                <li>• Complex but flexible</li>
              </ul>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Enterprise Bot</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Multi-region deployment</li>
                <li>• Advanced monitoring</li>
                <li>• Compliance & audit logs</li>
                <li>• High availability setup</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Deployment Considerations */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Production Deployment Checklist
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    Infrastructure Requirements
                  </h4>
                  <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                    <li>• HTTPS-enabled server with valid SSL certificate</li>
                    <li>• Webhook URL accessible from internet</li>
                    <li>• Database for persistent storage</li>
                    <li>• Redis for session management (recommended)</li>
                    <li>• Process manager (PM2, systemd) for auto-restart</li>
                    <li>• Reverse proxy (nginx) for load balancing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    Monitoring & Logging
                  </h4>
                  <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                    <li>• Application performance monitoring (APM)</li>
                    <li>• Error tracking and alerting</li>
                    <li>• Bot analytics and usage metrics</li>
                    <li>• Server resource monitoring</li>
                    <li>• Webhook health checks</li>
                    <li>• Rate limit monitoring</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                    Security Measures
                  </h4>
                  <ul className="text-purple-800 dark:text-purple-200 text-sm space-y-1">
                    <li>• Environment variable configuration</li>
                    <li>• Webhook signature verification</li>
                    <li>• User authorization and rate limiting</li>
                    <li>• Input validation and sanitization</li>
                    <li>• Regular security updates</li>
                    <li>• Backup and recovery procedures</li>
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

export default TelegramArchitecture;
