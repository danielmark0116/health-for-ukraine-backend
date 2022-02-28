#!/bin/sh

echo "Starting server in DEV"
cd server && yarn && cd .. && docker-compose -f docker-compose.dev.yml up --force-recreate --build
