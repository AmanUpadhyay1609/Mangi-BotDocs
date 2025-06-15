
import React from 'react';
import CodeBlock from '../components/CodeBlock';
import { Database, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const SessionCrud = () => {
  const basicUsageCode = `botManager.handleCommand('session-demo', async (ctx: CustomContext) => {
  // Set a simple variable (like putting a toy in a box)
  ctx.session.setCustom('favoriteColor', 'blue');
  
  // Set a nested variable (like organizing toys in different compartments)
  ctx.session.setCustom('user.name.first', 'Alice');
  ctx.session.setCustom('user.name.last', 'Smith');
  
  // Get variables (like looking for a specific toy)
  const color = ctx.session.getCustom('favoriteColor'); // Returns 'blue'
  const firstName = ctx.session.getCustom('user.name.first'); // Returns 'Alice'
  
  // Update existing variables (like changing toy features)
  ctx.session.updateCustom({ 
    'favoriteColor': 'green',
    'user.age': 25 
  });
  
  // Delete a variable (like removing a toy from the box)
  ctx.session.deleteCustom('user.name.last');
  
  await ctx.reply(\`Color: \${color}, Name: \${firstName}\`);
});`;

  const setCustomExamples = `// ✅ Simple values
ctx.session.setCustom('theme', 'dark');
ctx.session.setCustom('count', 42);
ctx.session.setCustom('isActive', true);

// ✅ Nested objects (creates the path automatically)
ctx.session.setCustom('user.profile.name', 'John');
ctx.session.setCustom('settings.notifications.email', true);

// ✅ Arrays and complex objects
ctx.session.setCustom('favorites', ['pizza', 'ice cream', 'cookies']);
ctx.session.setCustom('scores', { math: 95, science: 87 });

// ⚠️ Overwrites existing values
ctx.session.setCustom('user', 'John');           // user is now a string
ctx.session.setCustom('user.age', 25);           // user becomes {age: 25}, 'John' is lost!

// ⚠️ Empty key replaces entire custom object
ctx.session.setCustom('', { newData: true });    // Replaces everything!`;

  const updateCustomExamples = `// ✅ Update existing values only
// Assume: custom = { user: { name: 'Alice', age: 25 }, theme: 'dark' }

ctx.session.updateCustom({ 
  'user.name': 'Bob',      // ✅ Works: path exists
  'user.age': 26,          // ✅ Works: path exists  
  'theme': 'light'         // ✅ Works: path exists
});

// ❌ These will fail and return false:
ctx.session.updateCustom({ 
  'user.email': 'bob@example.com'    // ❌ Fails: 'email' key doesn't exist
});

ctx.session.updateCustom({ 
  'settings.theme': 'blue'           // ❌ Fails: 'settings' doesn't exist
});

// ❌ Trying to go deeper into primitive values
// Assume: custom = { theme: 'dark' }
ctx.session.updateCustom({ 
  'theme.color': 'blue'              // ❌ Fails: 'theme' is a string, not object
});`;

  const edgeCases = [
    {
      title: "Overwriting Types",
      description: "setCustom can overwrite any value with any type",
      status: "warning",
      example: `// This is allowed but be careful!
ctx.session.setCustom('user', 'John');        // user is string
ctx.session.setCustom('user.age', 25);        // user becomes {age: 25}`
    },
    {
      title: "Non-existent Paths",
      description: "updateCustom only works on existing full paths",
      status: "error",
      example: `// Fails if any part of the path doesn't exist
ctx.session.updateCustom({ 'user.profile.bio': 'Hello' }); // ❌ if profile doesn't exist`
    },
    {
      title: "Primitive to Object",
      description: "setCustom can turn primitives into objects",
      status: "warning",
      example: `ctx.session.setCustom('config', 'simple');
ctx.session.setCustom('config.advanced', true); // config becomes {advanced: true}`
    },
    {
      title: "Empty Keys",
      description: "Empty string key replaces the entire custom object",
      status: "error",
      example: `ctx.session.setCustom('', { fresh: 'start' }); // ⚠️ Replaces everything!`
    }
  ];

  const practicalExample = `botManager.handleCommand('profile', async (ctx: CustomContext) => {
  // Get user's current profile or create empty one
  const profile = ctx.session.getCustom('profile') || {};
  
  await ctx.reply(
    \`Your Profile:\\n\` +
    \`Name: \${profile.name || 'Not set'}\\n\` +
    \`Age: \${profile.age || 'Not set'}\\n\` +
    \`Theme: \${ctx.session.getCustom('theme') || 'default'}\`
  );
});

botManager.handleCommand('setname', async (ctx: CustomContext) => {
  const args = ctx.message?.text?.split(' ').slice(1);
  if (!args || args.length === 0) {
    await ctx.reply('Usage: /setname <your name>');
    return;
  }
  
  const name = args.join(' ');
  ctx.session.setCustom('profile.name', name);
  await ctx.reply(\`Name set to: \${name}\`);
});

botManager.handleCommand('setage', async (ctx: CustomContext) => {
  const args = ctx.message?.text?.split(' ').slice(1);
  if (!args || args.length === 0) {
    await ctx.reply('Usage: /setage <your age>');
    return;
  }
  
  const age = parseInt(args[0]);
  if (isNaN(age) || age < 1 || age > 150) {
    await ctx.reply('Please enter a valid age (1-150)');
    return;
  }
  
  // Use updateCustom since we want to ensure profile exists
  const success = ctx.session.updateCustom({ 'profile.age': age });
  if (success) {
    await ctx.reply(\`Age set to: \${age}\`);
  } else {
    // Profile doesn't exist, create it
    ctx.session.setCustom('profile.age', age);
    await ctx.reply(\`Profile created with age: \${age}\`);
  }
});`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <div className="flex items-center mb-4">
            <Database className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Session CRUD Operations
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Learn how to manage user session data with our simple, child-friendly CRUD helpers.
            Think of it like organizing toys in a smart toy box! 🧸
          </p>
        </div>

        {/* Child-Friendly Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Understanding CRUD (Like a Toy Box!)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center">
                <span className="mr-2">🧸</span> Create (Set)
              </h3>
              <p className="text-green-800 dark:text-green-200 text-sm">
                Like putting a new toy in your toy box. You give it a name and place it there.
                <code className="block mt-2 bg-green-100 dark:bg-green-800 p-1 rounded">
                  setCustom('favoriteColor', 'blue')
                </code>
              </p>
            </div>
            
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                <span className="mr-2">👀</span> Read (Get)
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Like looking in your toy box to find a specific toy by its name.
                <code className="block mt-2 bg-blue-100 dark:bg-blue-800 p-1 rounded">
                  getCustom('favoriteColor')
                </code>
              </p>
            </div>
            
            <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center">
                <span className="mr-2">✏️</span> Update (Change)
              </h3>
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                Like changing something about a toy that's already in the box. Only works if the toy exists!
                <code className="block mt-2 bg-yellow-100 dark:bg-yellow-800 p-1 rounded">
                  updateCustom({'{\'favoriteColor\': \'red\'}'})
                </code>
              </p>
            </div>
            
            <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center">
                <span className="mr-2">🗑️</span> Delete (Remove)
              </h3>
              <p className="text-red-800 dark:text-red-200 text-sm">
                Like taking a toy out of the box completely. Once removed, it's gone!
                <code className="block mt-2 bg-red-100 dark:bg-red-800 p-1 rounded">
                  deleteCustom('favoriteColor')
                </code>
              </p>
            </div>
          </div>
        </section>

        {/* Basic Usage */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Basic Usage Example
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Here's a complete example showing all CRUD operations in action:
          </p>
          <CodeBlock code={basicUsageCode} title="Session CRUD Demo" />
        </section>

        {/* setCustom Deep Dive */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            setCustom() - Creating and Setting Values
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">setCustom(key, value)</code> is like 
            putting toys in a magical toy box that can create compartments automatically!
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Key Features:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
              <li>Creates nested paths automatically (like making new compartments)</li>
              <li>Overwrites existing values completely</li>
              <li>Can turn simple values into complex objects</li>
              <li>Works with any type: strings, numbers, objects, arrays</li>
            </ul>
          </div>
          
          <CodeBlock code={setCustomExamples} title="setCustom Examples" />
        </section>

        {/* updateCustom Deep Dive */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            updateCustom() - Safely Changing Existing Values
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">updateCustom(updates)</code> is the 
            careful way to change toys - it only works if the toy is already there!
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Key Features:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
              <li>Only updates if the complete path already exists</li>
              <li>Returns <code>true</code> on success, <code>false</code> on failure</li>
              <li>Won't create new paths or keys</li>
              <li>Safe to use - won't accidentally overwrite important data</li>
            </ul>
          </div>
          
          <CodeBlock code={updateCustomExamples} title="updateCustom Examples" />
        </section>

        {/* Edge Cases */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Important Edge Cases to Know
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            These are special situations you should be aware of when using the session CRUD operations:
          </p>
          
          <div className="space-y-4">
            {edgeCases.map((edgeCase, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                edgeCase.status === 'warning' 
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    {edgeCase.status === 'warning' ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-2 ${
                      edgeCase.status === 'warning'
                        ? 'text-yellow-900 dark:text-yellow-100'
                        : 'text-red-900 dark:text-red-100'
                    }`}>
                      {edgeCase.title}
                    </h3>
                    <p className={`text-sm mb-3 ${
                      edgeCase.status === 'warning'
                        ? 'text-yellow-800 dark:text-yellow-200'
                        : 'text-red-800 dark:text-red-200'
                    }`}>
                      {edgeCase.description}
                    </p>
                    <code className={`block p-2 rounded text-xs ${
                      edgeCase.status === 'warning'
                        ? 'bg-yellow-100 dark:bg-yellow-800'
                        : 'bg-red-100 dark:bg-red-800'
                    }`}>
                      {edgeCase.example}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Example */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Practical Example: User Profile System
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Here's a real-world example of how to build a user profile system using session CRUD operations:
          </p>
          <CodeBlock code={practicalExample} title="User Profile Bot Commands" />
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Best Practices
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                    Use updateCustom() for Existing Data
                  </h3>
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    When you want to modify existing values safely, use <code>updateCustom()</code> first. 
                    If it returns false, then use <code>setCustom()</code> to create the value.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                    Check Values Before Using
                  </h3>
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    Always check if a value exists before using it: <code>const value = ctx.session.getCustom('key') || 'default'</code>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                    Use Meaningful Key Names
                  </h3>
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    Use descriptive keys like <code>'user.preferences.theme'</code> instead of <code>'t'</code> or <code>'theme1'</code>
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

export default SessionCrud;
