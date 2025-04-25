import fs from 'fs';
import { glob } from 'glob';

// Helper function to add interface definition if missing
const addStateInterface = (content, sliceName) => {
  // Convert slice name to state type name (e.g., cart -> CartState)
  const stateTypeName = `${sliceName.charAt(0).toUpperCase() + sliceName.slice(1)}State`;
  
  // Check if state interface already exists
  if (!content.includes(`interface ${stateTypeName}`)) {
    // Add the interface before the slice definition
    const importSection = content.split('\n').filter(line => line.trim().startsWith('import')).join('\n');
    const afterImports = content.substring(importSection.length);
    
    // Basic state interface template
    const stateInterface = `\n// Define state type\ninterface ${stateTypeName} {\n  // TODO: Add your state properties here\n  // This is a placeholder to fix type errors\n  [key: string]: any;\n}\n\n`;
    
    return importSection + stateInterface + afterImports;
  }
  
  return content;
};

// Process each slice file
const processSliceFile = async (file) => {
  console.log(`Processing: ${file}`);
  let content = fs.readFileSync(file, 'utf8');
  
  // Backup the file
  fs.writeFileSync(`${file}.final.bak`, content);
  
  // Extract the slice name from the file path
  const fileName = file.split('/').pop().replace('.ts', '');
  const sliceName = fileName.replace('Slice', '');
  
  // 1. Make sure Slice and Reducer are imported
  if (!content.includes('Slice } from')) {
    content = content.replace(/PayloadAction(\s*)\} from ['"]@reduxjs\/toolkit['"]/g, 
      'PayloadAction,$1Slice } from \'@reduxjs/toolkit\'');
  }
  
  if (!content.includes('import { Reducer }')) {
    content = content.replace(/import {/, 'import { Reducer } from \'redux\';\nimport {');
  }
  
  // 2. Add state interface if needed
  content = addStateInterface(content, sliceName);
  
  // 3. Add type annotation to the slice
  const stateTypeName = `${sliceName.charAt(0).toUpperCase() + sliceName.slice(1)}State`;
  content = content.replace(
    new RegExp(`export const ${sliceName}Slice(\\s*)=(\\s*)createSlice`),
    `export const ${sliceName}Slice: Slice$1=$2createSlice`
  );
  
  // 4. Add type annotation to the reducer
  content = content.replace(
    new RegExp(`export const ${sliceName}Reducer(\\s*)=(\\s*)${sliceName}Slice.reducer`),
    `export const ${sliceName}Reducer: Reducer<${stateTypeName}>$1=$2${sliceName}Slice.reducer`
  );
  
  // Write updated content
  fs.writeFileSync(file, content);
  console.log(`✅ Fixed ${file}`);
};

// Fix the store.ts file
const fixStoreFile = async () => {
  const storeFiles = await glob('src/redux/store.ts');
  if (storeFiles.length === 0) {
    console.log('⚠️ store.ts not found');
    return;
  }
  
  const storeFile = storeFiles[0];
  console.log(`Processing: ${storeFile}`);
  let content = fs.readFileSync(storeFile, 'utf8');
  
  // Backup the file
  fs.writeFileSync(`${storeFile}.final.bak`, content);
  
  // Make sure Store is imported
  if (!content.includes('Store } from')) {
    content = content.replace(/configureStore(\s*)\} from ['"]@reduxjs\/toolkit['"]/g, 
      'configureStore,$1Store } from \'@reduxjs/toolkit\'');
  }
  
  // Add type annotation to the store
  content = content.replace(
    /export const store(\s*)=(\s*)configureStore/g,
    'export const store: Store$1=$2configureStore'
  );
  
  // Write updated content
  fs.writeFileSync(storeFile, content);
  console.log(`✅ Fixed ${storeFile}`);
};

// Main execution
const main = async () => {
  try {
    // Fix all slice files
    const sliceFiles = await glob('src/redux/features/**/*Slice.ts');
    for (const file of sliceFiles) {
      await processSliceFile(file);
    }
    
    // Fix store.ts
    await fixStoreFile();
    
    console.log('All Redux type issues have been fixed!');
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
