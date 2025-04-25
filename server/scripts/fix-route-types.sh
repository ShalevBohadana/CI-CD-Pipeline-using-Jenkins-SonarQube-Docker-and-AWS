#!/bin/bash

# Find all route files
find src/app/modules -type f -name "*.route.ts" -o -name "*.router.ts" | while read -r file; do
    # Remove BaseRouter import
    sed -i '' '/import.*BaseRouter.*from.*types\/express.*/d' "$file"
    
    # Remove any existing express imports
    sed -i '' '/import.*express.*from.*express.*/d' "$file"
    sed -i '' '/import.*Router.*from.*express.*/d' "$file"
    
    # Add express imports at the top
    sed -i '' '1i\
import express, { Router } from "express";
' "$file"
    
    # Replace router declarations
    sed -i '' 's/: BaseRouter//g' "$file"
    sed -i '' 's/const router = express\.Router();/const router: Router = express.Router();/g' "$file"
    
    echo "Fixed $file"
done
