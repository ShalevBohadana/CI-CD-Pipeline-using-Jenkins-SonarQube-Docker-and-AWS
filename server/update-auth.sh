#!/bin/bash

# Function to process each file
process_file() {
    local file=$1
    echo "Processing $file"
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Read the file line by line
    while IFS= read -r line; do
        # Replace AuthGuard import with auth import
        if echo "$line" | grep -q "import AuthGuard from '../../middlewares/authGuard'"; then
            echo "import auth from '../../middlewares/auth';" >> "$temp_file"
        # Skip commented out AuthGuard imports
        elif echo "$line" | grep -q "//.*import.*AuthGuard"; then
            echo "$line" >> "$temp_file"
        else
            # Replace AuthGuard.auth with auth in non-import lines
            echo "$line" | sed 's/AuthGuard\.auth/auth/g' >> "$temp_file"
        fi
    done < "$file"
    
    # Replace original file with modified content
    mv "$temp_file" "$file"
}

# Find all TypeScript files in modules directory that contain AuthGuard
find src/app/modules -type f -name "*.ts" -exec grep -l "AuthGuard" {} \; | while read -r file; do
    process_file "$file"
done
