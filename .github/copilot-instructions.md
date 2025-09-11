# Copilot Instructions for Node.js Express TypeScript Starter

## Purpose

This is a starter template for building REST APIs with Node.js, Express, and TypeScript. It provides user authentication and management functionality, using MongoDB with Mongoose as the database layer.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Development**: Nodemon, ts-node
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, Supertest
- **Containerization**: Docker & Docker Compose

## Development Rules

- All application code must be in TypeScript (utilities/scripts can be JavaScript)
- Use async/await for all asynchronous operations
- Validate inputs for all routes using proper validation middleware
- Use JWT for authentication tokens with proper expiration
- Keep folder structure organized: routes, controllers, services, models, utils
- Write unit tests for all business logic in the services layer
- Use ESLint and Prettier rules defined in the project
- Use Mongoose models for all database operations
- Handle errors properly with try-catch blocks and proper HTTP status codes

## Project Structure

```
src/
├── controllers/     # Route controllers (handle HTTP requests/responses)
├── models/         # Mongoose models and schemas
├── routes/         # Express route definitions
├── services/       # Business logic layer
└── utils/          # Helper functions (JWT, logger, etc.)
scripts/            # Development and build scripts
```

## Development Workflow

1. **Create a new feature**:
   - Add route in `src/routes/<name>.ts`
   - Implement controller in `src/controllers/<name>Controller.ts`
   - Add business logic in `src/services/<name>Service.ts`
   - Create/update Mongoose model in `src/models/<name>.ts`

2. **Authentication flow**:
   - Use JWT utilities from `src/utils/jwt.ts`
   - Protect routes with authentication middleware
   - Hash passwords using bcryptjs

3. **Database operations**:
   - Use Mongoose models from `src/models/`
   - Handle connection errors and validation
   - Use proper TypeScript types for schemas

4. **Development commands**:
   - `yarn dev` - Start development server with auto-reload
   - `yarn build` - Compile TypeScript to JavaScript
   - `yarn lint` - Run ESLint checks
   - `yarn format` - Format code with Prettier
   - `yarn test` - Run test suite

5. **Quality checks**:
   - Ensure code passes linting and formatting checks
   - Write tests for new features
   - Validate all inputs and handle edge cases
   - Use proper error handling and logging
