#!/bin/bash

# Build the MkDocs site
echo "Building MkDocs site..."
mkdocs build

# Deploy to Firebase Hosting
echo "Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "Deployment complete!"
