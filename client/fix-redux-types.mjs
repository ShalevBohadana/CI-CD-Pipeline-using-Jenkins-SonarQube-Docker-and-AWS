import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { glob } from 'glob';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Find all Redux slice files
const sliceFiles = await glob('src/redux/features/**/*Slice.ts');

for (const file of sliceFiles) {
  // Skip directories
  if (fs.statSync(file).isDirectory()) {
    console.log(`Skipping directory: ${file}`);
    continue;
  }

  console.log(`Processing Redux file: ${file}`);
  let content = fs.readFileSync(file, 'utf8');
  
  // Backup the original file
  fs.writeFileSync(`${file}.redux.bak`, content);
  
  // Add Slice import if needed
  if (!content.includes('Slice } from')) {
    content = content.replace(/PayloadAction(\s*)\} from/, 'PayloadAction,$1Slice } from');
  }
  
  // Add Reducer import if needed
  if (!content.includes('import { Reducer }')) {
    content = content.replace(/import {/, 'import { Reducer } from \'redux\';\nimport {');
  }
  
  // Fix slice definition
  const sliceName = path.basename(file, '.ts').replace('Slice', '');
  const stateTypeName = `${sliceName.charAt(0).toUpperCase() + sliceName.slice(1)}State`;
  
  // Add Slice type annotation
  content = content.replace(
    new RegExp(`export const ${sliceName}Slice = createSlice\\(`),
    `export const ${sliceName}Slice: Slice = createSlice(`
  );
  
  // Add Reducer type annotation
  content = content.replace(
    new RegExp(`export const ${sliceName}Reducer = ${sliceName}Slice.reducer;`),
    `export const ${sliceName}Reducer: Reducer<${stateTypeName}> = ${sliceName}Slice.reducer;`
  );
  
  // Write the updated content
  fs.writeFileSync(file, content);
  console.log(`✅ Fixed Redux file: ${file}`);
}

// Fix store.ts
const storeFiles = await glob('src/redux/store.ts');
if (storeFiles.length > 0) {
  console.log('Fixing store.ts...');
  const storeFile = storeFiles[0];
  let storeContent = fs.readFileSync(storeFile, 'utf8');
  
  // Backup the original file
  fs.writeFileSync(`${storeFile}.bak`, storeContent);
  
  // Add Store import if needed
  if (!storeContent.includes('Store } from')) {
    storeContent = storeContent.replace(/configureStore(\s*)\} from/, 'configureStore,$1Store } from');
  }
  
  // Add Store type annotation
  storeContent = storeContent.replace(
    /export const store = configureStore\(/,
    'export const store: Store = configureStore('
  );
  
  // Write the updated content
  fs.writeFileSync(storeFile, storeContent);
  console.log('✅ Fixed store.ts');
}

console.log('All Redux TypeScript issues have been fixed.');
