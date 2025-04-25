#!/bin/bash

# Fix route files
find src/app/modules -name "*.route.ts" -type f -exec sed -i '' 's/import express from '\''express'\''/import express, { Router } from '\''express'\''/g' {} \;
find src/app/modules -name "*.route.ts" -type f -exec sed -i '' 's/const router = express.Router()/const router: Router = express.Router()/g' {} \;
find src/app/modules -name "*.route.ts" -type f -exec sed -i '' 's/export const \([a-zA-Z]*\)Routes\? = router/export const \1Routes: Router = router/g' {} \;

# Fix controller files
find src/app/modules -name "*.controller.ts" -type f -exec sed -i '' 's/import { Request, Response } from '\''express'\''/import { Request, Response, RequestHandler } from '\''express'\''/g' {} \;
find src/app/modules -name "*.controller.ts" -type f -exec sed -i '' 's/export const \([a-zA-Z]*\)Controller = {/export const \1Controller: { [key: string]: RequestHandler } = {/g' {} \;
