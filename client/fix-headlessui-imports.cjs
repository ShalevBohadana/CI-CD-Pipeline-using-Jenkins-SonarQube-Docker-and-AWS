const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Files with Transition import issues
const filesToFix = [
  'client/src/components/ui/NavbarSearchInp.tsx',
  'client/src/components/ui/SelectCurrencyDropdown.tsx',
  'client/src/components/ui/SelectDropdown.tsx',
  'client/src/pages/Dashboard/Admin/Currencies/components/OffersSearchBox.tsx',
  'client/src/pages/Dashboard/Admin/Finances/components/AdminFinancesSummaryModal.tsx',
  'client/src/pages/Dashboard/Admin/Games/components/GamesSearchBox.tsx',
  'client/src/pages/Dashboard/Admin/Offers/components/OffersSearchBox.tsx',
  'client/src/pages/Dashboard/Admin/Order/components/OrderSearchBox.tsx',
  'client/src/pages/Dashboard/Admin/PartnerManager/components/PartnerSearchBox.tsx',
  'client/src/pages/Dashboard/Admin/Promos/components/PromosSearchBox.tsx',
  'client/src/pages/Dashboard/Admin/UserManager/components/UserSearchBox.tsx',
  'client/src/pages/Dashboard/Admin/WorkWithUsApproval/components/WorkWithUsSummaryModal.tsx',
  'client/src/pages/Dashboard/components/DashboardModal.tsx',
  'client/src/pages/Dashboard/Partner/Claim/OrderSummaryModal.tsx'
];

// Check if glob is installed, if not suggest installing it
try {
  require.resolve('glob');
} catch (e) {
  console.log('Please install glob first:');
  console.log('pnpm add glob -D');
  process.exit(1);
}

// Find any additional files that might need fixing
console.log('Scanning for additional files with Headless UI imports...');
const allFiles = glob.sync('client/src/**/*.{ts,tsx}');
const additionalFiles = [];

for (const file of allFiles) {
  if (!filesToFix.includes(file)) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('@headlessui/react') && 
          (content.includes('Transition') || 
           content.includes('Listbox') || 
           content.includes('Dialog'))) {
        additionalFiles.push(file);
      }
    } catch (err) {
      console.error(`Error reading ${file}:`, err);
    }
  }
}

if (additionalFiles.length > 0) {
  console.log('Found additional files that might need fixing:');
  additionalFiles.forEach(file => console.log(`  - ${file}`));
  console.log('These will be processed as well.');
  filesToFix.push(...additionalFiles);
}

// Fix each file
for (const file of filesToFix) {
  try {
    console.log(`Processing ${file}...`);
    let content = fs.readFileSync(file, 'utf8');
    
    // Backup original file
    fs.writeFileSync(`${file}.bak`, content);
    
    // Replace Transition import
    if (content.includes('import { Transition } from \'@headlessui/react\'')) {
      content = content.replace(
        'import { Transition } from \'@headlessui/react\'',
        'import { Transition } from \'@headlessui/react/dist/components/transition/transition\''
      );
    }
    
    // Handle combined imports
    if (content.match(/import {[^}]*Transition[^}]*} from '@headlessui\/react'/)) {
      // Handle the Transition separately
      const match = content.match(/import {([^}]*)} from '@headlessui\/react'/);
      if (match) {
        const imports = match[1].split(',').map(part => part.trim());
        const transitionIndex = imports.findIndex(imp => 
          imp === 'Transition' || imp.startsWith('Transition ')
        );
        
        if (transitionIndex !== -1) {
          // Remove Transition from the original import
          imports.splice(transitionIndex, 1);
          
          // Update original import
          const newImport = imports.length > 0 
            ? `import { ${imports.join(', ')} } from '@headlessui/react'`
            : '';
          
          // Add separate Transition import
          const transitionImport = 
            "import { Transition } from '@headlessui/react/dist/components/transition/transition'";
          
          content = content.replace(
            match[0],
            newImport ? `${newImport}\n${transitionImport}` : transitionImport
          );
        }
      }
    }
    
    // Similar checks for Listbox if needed
    if (content.includes('import { Listbox } from \'@headlessui/react\'')) {
      content = content.replace(
        'import { Listbox } from \'@headlessui/react\'',
        'import { Listbox } from \'@headlessui/react/dist/components/listbox/listbox\''
      );
    }
    
    fs.writeFileSync(file, content);
    console.log(`✅ Fixed ${file}`);
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
  }
}

console.log('\nAll files processed. Please check the changes and run your build command again.');
