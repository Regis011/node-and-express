# Node.js Express TypeScript Starter

## Description

This is a starter template for building REST APIs with Node.js, Express, and TypeScript. It provides authentication, user management, and core backend functionality using MongoDB with Mongoose as the database layer.

## Features

- 🚀 **TypeScript** - Full TypeScript support with strict type checking
- 🌐 **REST API** - RESTful API built with Express.js
- 🔐 **JWT Authentication** - Secure authentication with JSON Web Tokens
- 👤 **User Management** - User registration, login, and profile management
- 🗄️ **MongoDB** - Database with Mongoose ODM
- 🐳 **Docker Support** - Containerized development environment
- 🧹 **Code Quality** - ESLint & Prettier for consistent code style
- 🧪 **Testing** - Unit tests with Jest and Supertest
- 📝 **Logging** - Structured logging for debugging and monitoring
- 🔄 **Auto-reload** - Development server with hot reload

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Development**: Nodemon, ts-node
- **Testing**: Jest, Supertest
- **Code Quality**: ESLint, Prettier
- **Containerization**: Docker & Docker Compose

## Quick Start

### Prerequisites

- Node.js (v18+ recommended)
- Docker & Docker Compose
- MongoDB (if running locally)

### 1. Clone Repository

```bash
git clone https://github.com/your-username/node-and-express.git
cd node-and-express
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 3. Environment Configuration

Copy the example environment file and update the values:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```bash
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
DB_URI=mongodb://mongo:27017/nodeapp
```

### 4. Development Options

#### Option A: Docker (Recommended)

```bash
# Start all services (API + MongoDB)
docker-compose up --build

# Run in background
docker-compose up -d --build
```

#### Option B: Local Development

```bash
# Make sure MongoDB is running locally, then:
yarn dev
```

The API will be available at `http://localhost:5000`

## Available Scripts

```bash
# Development
yarn dev              # Start development server with hot reload
yarn dev:simple       # Start with basic nodemon setup

# Building
yarn build            # Compile TypeScript to JavaScript
yarn start            # Run compiled JavaScript (production)

# Code Quality
yarn lint             # Run ESLint
yarn format           # Format code with Prettier

# Testing
yarn test             # Run test suite
```

## API Endpoints

### Health Check

- `GET /health` - API health status

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login

## Project Structure

```bash
node-and-express/
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot configuration
├── scripts/
│   ├── dev.js                   # Development server script
│   └── dev.sh                   # Shell script for development
├── src/
│   ├── controllers/             # Route controllers
│   │   └── authController.ts
│   ├── models/                  # Mongoose models and schemas
│   │   └── user.ts
│   ├── routes/                  # Express route definitions
│   │   ├── auth.ts
│   │   ├── health.ts
│   │   └── routes.ts
│   ├── services/                # Business logic layer
│   │   └── authService.ts
│   ├── utils/                   # Helper functions
│   │   ├── jwt.ts
│   │   └── logger.ts
│   └── index.ts                 # Application entry point
├── docker-compose.yml           # Docker services configuration
├── Dockerfile                   # Docker image configuration
├── package.json                 # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Development Guidelines

### Code Style

- All application code must be written in TypeScript
- Use async/await for asynchronous operations
- Follow ESLint and Prettier configurations
- Use proper error handling with try-catch blocks

### Architecture

- **Controllers**: Handle HTTP requests/responses, validation
- **Services**: Business logic and data processing
- **Models**: Database schemas and data models
- **Routes**: API endpoint definitions
- **Utils**: Shared helper functions

### Adding New Features

1. **Create Route**: Add route definition in `src/routes/`
2. **Add Controller**: Implement request handling in `src/controllers/`
3. **Business Logic**: Add service layer in `src/services/`
4. **Database Model**: Create/update Mongoose models in `src/models/`
5. **Tests**: Write unit tests for the new functionality

## Environment Variables

| Variable     | Description               | Default                         |
| ------------ | ------------------------- | ------------------------------- |
| `PORT`       | Server port               | `5000`                          |
| `JWT_SECRET` | JWT signing secret        | `supersecretkey`                |
| `DB_URI`     | MongoDB connection string | `mongodb://mongo:27017/nodeapp` |

## Docker

### Development with Docker

```bash
# Start all services
docker-compose up --build

# View logs
docker-compose logs -f api

# Stop services
docker-compose down

# Remove volumes (reset database)
docker-compose down -v
```

### Production Docker

```bash
# Build production image
docker build -t node-and-express .

# Run production container
docker run -p 5000:5000 --env-file .env node-and-express
```

## Testing

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage
```

## Troubleshooting

### Port 5000 Already in Use

The development script automatically kills any process using port 5000 before starting.

### MongoDB Connection Issues

- Ensure MongoDB is running (Docker or local installation)
- Check the `DB_URI` in your `.env` file
- For Docker: ensure the mongodb service is running

### TypeScript Compilation Errors

```bash
# Check TypeScript configuration
npx tsc --noEmit

# Rebuild node_modules if needed
rm -rf node_modules yarn.lock
yarn install
```

## Contributing

1. Follow the existing code style and architecture
2. Add tests for new features
3. Update documentation as needed
4. Ensure all linting and formatting checks pass
5. Test with both Docker and local development setups

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 5. For authentication, use JWT helpers in src/utils/jwt.ts. 6. Write corresponding tests in tests/.
