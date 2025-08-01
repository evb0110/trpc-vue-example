# Minimal tRPC + Vue.js Example

A minimal tRPC project with Vue.js and TypeScript following industry conventions.

## Structure

- `/server` - tRPC server with basic query and mutation procedures
- `/client` - Vue.js client application

## Features

- ✅ tRPC server with type-safe API
- ✅ Vue.js client with TypeScript
- ✅ Zod for input validation
- ✅ Query example (hello)
- ✅ Mutation example (createUser)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development servers:
```bash
npm run dev
```

This starts:
- tRPC server on http://localhost:3000
- Vue client on http://localhost:5173

## API Endpoints

- `hello` query - Takes a name and returns a greeting
- `createUser` mutation - Creates a user with name and email