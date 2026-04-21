#!/bin/bash

# Setup Shared Library
echo "Setting up shared library..."
cd shared
npm install
npm run build
cd ..

# Setup Services
services=("auth-service" "user-service" "chat-service" "notification-service" "api-gateway")

for service in "${services[@]}"; do
  echo "Setting up $service..."
  if [ "$service" == "api-gateway" ]; then
    cd api-gateway
  else
    cd services/$service
  fi
  npm install
  cd ../..
done

# Setup Frontend
echo "Setting up frontend..."
cd frontend
npm install
cd ..

echo "Setup complete! Run 'docker-compose up' to start the platform."
