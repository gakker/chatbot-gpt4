# Chabot (NestJS and VueJs app) Setup Guide

## Prerequisites
- Node.js
- MongoDB
- Vue CLI

## Steps

1. Install Node.js:
   If you haven't already, download and install Node.js from the official website.

2. Install and run MongoDB:
   You can download and install MongoDB from the official website. After installation, make sure to start the MongoDB server.

3. Install Vue CLI:
   Run the command "npm install -g @vue/cli" to install Vue CLI globally.

4. Install dependencies for NestJS app:
   Navigate to the Nest-App directory and run the command "npm install" to install all the required dependencies.

5. Run NestJS app in Development mode:
   Run the command "npm run start:dev" to start the NestJS app in development mode.

6. Run NestJS app in Production mode:
   To run the NestJS app in production mode, run the following two commands:
   - "npm run build" to build the app for production.
   - "npm run start:prod" to start the app in production mode.

7. Install dependencies for Vue app:
   Navigate to the Vue-App directory and run the command "npm install" to install all the required dependencies.

8. Run the Vue app in Development mode:
   Run the command "npm run serve" to start the Vue app in development mode.

9. Run the Vue app in Production mode:
   To run the Vue app in production mode, run the following two commands:
   - "npm run build" to build the app for production.
   - "npx http-server dist/" to serve the compiled files from the "dist" directory.

Note: Make sure to start the MongoDB server before running the NestJS app, and to install the required dependencies for both the NestJS and Vue apps.