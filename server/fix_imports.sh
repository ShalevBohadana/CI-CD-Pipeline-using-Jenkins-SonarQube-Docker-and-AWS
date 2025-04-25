#!/bin/bash

# Find all TypeScript files in the modules directory
find /Users/oshri/Desktop/Fiverr/FullBoosts/server/src/app/modules -name "*.ts" -type f -exec sed -i '' 's/import { AuthGuard } from/import AuthGuard from/g' {} +
