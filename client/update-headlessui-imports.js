const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all files that might import from headlessui
const files = glob.sync('src/**/*.{ts,tsx}');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Skip files that don't import from headlessui
  if (!content.includes('@headlessui/react')) {
    return;
  }
  
  console.log(`Processing: ${file}`);
  
  // Backup the file
  fs.writeFileSync(`${file}.bak`, content);
  
  // Get relative path to the headless components folder
  const relPath = path.relative(path.dirname(file), 'src/components/headless').replace(/\\/g, '/');
  const importPath = relPath.startsWith('.') ? relPath : `./${relPath}`;
  
  // Replace imports
  content = content.replace(
    /import\s+{([^}]*)}\s+from\s+['"]@headlessui\/react['"]/g,
    (match, importComponents) => {
      // Extract the component names
      const components = importComponents.split(',')
        .map(comp => comp.trim())
        .filter(comp => comp !== '');
      
      // Only import components we've created replacements for
      const validComponents = components.filter(comp => 
        ['Transition', 'Listbox', 'Dialog'].includes(comp));
      
      if (validComponents.length === 0) {
        return match; // Keep original if no replacements
      }
      
      return `import { ${validComponents.join(', ')} } from '${importPath}'`;
    }
  );
  
  fs.writeFileSync(file, content);
  console.log(`✅ Fixed ${file}`);
});

console.log('All Headless UI imports have been updated.');
