const fs = require('fs');
const path = require('path');
const glob = require('glob');

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
  
  // Fix Transition import
  if (content.includes('Transition } from \'@headlessui/react\'') || 
      content.match(/import\s+{\s*[^}]*Transition[^}]*}\s+from\s+['"]@headlessui\/react['"]/)) {
    console.log(`  - Fixing Transition import in ${file}`);
    
    // Handle standalone import
    content = content.replace(
      /import\s+{\s*Transition\s*}\s+from\s+['"]@headlessui\/react['"]/g,
      `import { Transition } from '@headlessui/react/dist/components/transition/transition'`
    );
    
    // Handle import with other components
    content = content.replace(
      /import\s+{([^}]*)Transition([^}]*)}\s+from\s+['"]@headlessui\/react['"]/g,
      (match, before, after) => {
        // Remove Transition from the original import
        const newImports = [...before.split(','), ...after.split(',')]
          .map(imp => imp.trim())
          .filter(imp => imp !== '' && imp !== 'Transition')
          .join(', ');
        
        if (newImports.length === 0) {
          return `import { Transition } from '@headlessui/react/dist/components/transition/transition'`;
        } else {
          return `import { ${newImports} } from '@headlessui/react';\nimport { Transition } from '@headlessui/react/dist/components/transition/transition'`;
        }
      }
    );
  }
  
  // Fix Listbox import
  if (content.includes('Listbox } from \'@headlessui/react\'') || 
      content.match(/import\s+{\s*[^}]*Listbox[^}]*}\s+from\s+['"]@headlessui\/react['"]/)) {
    console.log(`  - Fixing Listbox import in ${file}`);
    
    // Handle standalone import
    content = content.replace(
      /import\s+{\s*Listbox\s*}\s+from\s+['"]@headlessui\/react['"]/g,
      `import { Listbox } from '@headlessui/react/dist/components/listbox/listbox'`
    );
    
    // Handle import with other components
    content = content.replace(
      /import\s+{([^}]*)Listbox([^}]*)}\s+from\s+['"]@headlessui\/react['"]/g,
      (match, before, after) => {
        // Remove Listbox from the original import
        const newImports = [...before.split(','), ...after.split(',')]
          .map(imp => imp.trim())
          .filter(imp => imp !== '' && imp !== 'Listbox')
          .join(', ');
        
        if (newImports.length === 0) {
          return `import { Listbox } from '@headlessui/react/dist/components/listbox/listbox'`;
        } else {
          return `import { ${newImports} } from '@headlessui/react';\nimport { Listbox } from '@headlessui/react/dist/components/listbox/listbox'`;
        }
      }
    );
  }
  
  // Fix Dialog import
  if (content.includes('Dialog } from \'@headlessui/react\'') || 
      content.match(/import\s+{\s*[^}]*Dialog[^}]*}\s+from\s+['"]@headlessui\/react['"]/)) {
    console.log(`  - Fixing Dialog import in ${file}`);
    
    // Handle standalone import
    content = content.replace(
      /import\s+{\s*Dialog\s*}\s+from\s+['"]@headlessui\/react['"]/g,
      `import { Dialog } from '@headlessui/react/dist/components/dialog/dialog'`
    );
    
    // Handle import with other components
    content = content.replace(
      /import\s+{([^}]*)Dialog([^}]*)}\s+from\s+['"]@headlessui\/react['"]/g,
      (match, before, after) => {
        // Remove Dialog from the original import
        const newImports = [...before.split(','), ...after.split(',')]
          .map(imp => imp.trim())
          .filter(imp => imp !== '' && imp !== 'Dialog')
          .join(', ');
        
        if (newImports.length === 0) {
          return `import { Dialog } from '@headlessui/react/dist/components/dialog/dialog'`;
        } else {
          return `import { ${newImports} } from '@headlessui/react';\nimport { Dialog } from '@headlessui/react/dist/components/dialog/dialog'`;
        }
      }
    );
  }
  
  fs.writeFileSync(file, content);
  console.log(`✅ Fixed ${file}`);
});

console.log('All Headless UI imports have been fixed.');
