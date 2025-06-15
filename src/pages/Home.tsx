import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Database, Code, FileText, ArrowRight, Github } from 'lucide-react';
import InteractiveMascot from '../components/InteractiveMascot';

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'JWT Authentication',
      description: 'Secure your bot with JWT tokens. Enforce authentication on all routes or selectively.',
      link: '/jwt-auth'
    },
    {
      icon: Users,
      title: 'Admin Approval',
      description: 'Add an extra layer of admin approval for new users. Perfect for controlled access.',
      link: '/admin-approval'
    },
    {
      icon: Database,
      title: 'Session CRUD',
      description: 'Easily manage custom session variables with built-in helpers for set/get/update/delete.',
      link: '/session-crud'
    },
    {
      icon: Code,
      title: 'Context API',
      description: 'Type-safe context with automatic safety checks. No more null pointer exceptions.',
      link: '/context'
    },
    {
      icon: FileText,
      title: 'Professional Logging',
      description: 'Built-in logging system with development and production modes using Pino.',
      link: '/logging'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section with Interactive Mascot */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-12 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="mb-6 sm:mb-8">
                <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 sm:px-4 py-2 text-xs sm:text-sm text-blue-800 dark:text-blue-300">
                  <a
                    href="https://www.npmjs.com/package/@wasserstoff/mangi-tg-bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline transition-smooth"
                  > <span className="font-medium">@wasserstoff/mangi-tg-bot</span>
                    <span className="ml-2 rounded-full bg-blue-200 dark:bg-blue-800 px-2 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-200">
                      v1.2.13
                    </span></a>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                Modern Telegram Bot
                <span className="text-blue-600 dark:text-blue-400"> SDK</span>
              </h1>

              <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                A powerful, flexible, and modern Telegram Bot SDK built with TypeScript.
                Features JWT authentication, admin approval, session management, and professional logging.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <Link
                  to="/getting-started"
                  className="w-full sm:w-auto rounded-lg bg-blue-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <a
                  href="https://github.com/AmanUpadhyay1609/-wasserstoff-mangi-tg-bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center"
                >
                  View on GitHub
                  <Github className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right side - Interactive Mascot */}
            <div className="order-1 lg:order-2">
              <InteractiveMascot />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to build powerful Telegram bots
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Built with TypeScript for type safety, Redis for performance, and modern patterns for maintainability.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <Link
                  key={feature.title}
                  to={feature.link}
                  className="group block"
                >
                  <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200">
                    <div className="rounded-lg bg-blue-50 dark:bg-blue-900/30 p-3 ring-1 ring-blue-600/10 dark:ring-blue-400/20">
                      <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <dt className="mt-4 font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </dt>
                    <dd className="mt-2 leading-7 text-gray-600 dark:text-gray-300 text-sm">
                      {feature.description}
                    </dd>
                  </div>
                </Link>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Quick Start
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Get up and running in minutes with our simple installation process.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    1. Install the package
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm">
                    <code className="text-gray-800 dark:text-gray-200">
                      npm install @wasserstoff/mangi-tg-bot
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    2. Create your first bot
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm">
                    <code className="text-gray-800 dark:text-gray-200">
                      {`import { Bot, AppConfig } from '@wasserstoff/mangi-tg-bot';

const config: AppConfig = {
  botToken: 'YOUR_BOT_TOKEN',
  redisUrl: 'YOUR_REDIS_URL',
  isDev: true
};

const bot = new Bot(config);
await bot.initialize();`}
                    </code>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to="/getting-started"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    View full getting started guide
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
