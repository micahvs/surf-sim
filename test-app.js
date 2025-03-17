// Simple test script to verify the application structure and components

const fs = require('fs');
const path = require('path');

console.log('Groovy Surf App Verification Test');
console.log('=================================\n');

function checkFileExists(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      console.log(`✅ ${filePath} exists`);
      return true;
    } else {
      console.log(`❌ ${filePath} is missing`);
      return false;
    }
  } catch (err) {
    console.log(`❌ Error checking ${filePath}: ${err.message}`);
    return false;
  }
}

function checkDirectoryExists(dirPath) {
  try {
    const fullPath = path.join(process.cwd(), dirPath);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      console.log(`✅ ${dirPath} directory exists`);
      return true;
    } else {
      console.log(`❌ ${dirPath} directory is missing`);
      return false;
    }
  } catch (err) {
    console.log(`❌ Error checking directory ${dirPath}: ${err.message}`);
    return false;
  }
}

// Check main directories
console.log('\nChecking main directories:');
const directories = [
  'app',
  'components',
  'lib',
  'public',
];
const directoryResults = directories.map(dir => checkDirectoryExists(dir));

// Check critical files
console.log('\nChecking critical files:');
const criticalFiles = [
  'app/layout.tsx',
  'app/page.tsx',
  'app/simulator/page.tsx',
  'app/dashboard/page.tsx',
  'app/brand/page.tsx',
  'app/mcp/page.tsx',
  'components/theme-provider.tsx',
  'components/surfing-simulator.tsx',
  'components/wave-model-provider.tsx',
  'package.json',
  'next.config.ts',
  'DOCUMENTATION.md',
];
const fileResults = criticalFiles.map(file => checkFileExists(file));

// Check for theme-provider content
console.log('\nVerifying theme provider content:');
try {
  const themeProviderContent = fs.readFileSync(path.join(process.cwd(), 'components/theme-provider.tsx'), 'utf8');
  if (themeProviderContent.includes('next-themes')) {
    console.log('✅ Theme provider imports next-themes correctly');
  } else {
    console.log('❌ Theme provider is missing next-themes import');
  }
} catch (err) {
  console.log(`❌ Error reading theme provider: ${err.message}`);
}

// Summary
console.log('\nTest Summary:');
console.log(`Directories: ${directoryResults.filter(Boolean).length}/${directoryResults.length} passed`);
console.log(`Critical files: ${fileResults.filter(Boolean).length}/${fileResults.length} passed`);

// Package.json dependencies check
console.log('\nVerifying dependencies:');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
  const requiredDeps = [
    'next', 'react', 'react-dom', '@react-three/fiber', '@react-three/drei', 'three', 'next-themes'
  ];
  
  for (const dep of requiredDeps) {
    if (packageJson.dependencies[dep]) {
      console.log(`✅ ${dep} is installed (version: ${packageJson.dependencies[dep]})`);
    } else {
      console.log(`❌ ${dep} is missing from dependencies`);
    }
  }
} catch (err) {
  console.log(`❌ Error reading package.json: ${err.message}`);
}

console.log('\n=================================');
console.log('Test completed. If all checks passed, your app structure is correct.');
console.log('If you are unable to run the app in the browser, it may be due to:');
console.log('1. Network/firewall restrictions');
console.log('2. Port conflicts');
console.log('3. Browser security settings');
console.log('\nSuggestion: Try running "npm run build" and deploy the app to a server');
console.log('or hosting platform like Vercel for testing if localhost is not accessible.');