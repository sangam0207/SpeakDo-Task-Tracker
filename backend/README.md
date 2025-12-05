project:
  name: SpeakDo Backend
  description: >
    A simple Node.js backend that manages tasks and supports AI-based
    voice transcript parsing securely through OpenAI.

technologies_used:
  - Node.js
  - Express.js
  - MongoDB + Mongoose
  - OpenAI API (for task parsing)
  - Global Error Handling Middleware
  - Environment Variables (.env)
  - CORS

environment_variables:
  description: "Create a .env file in the root directory with:"
  variables:
    APP_ENV: "development or production"
    APP_PORT: "Server port number (e.g., 5000)"
    MONGO_URL: "Your MongoDB connection string"
    OPENAI_API_KEY: "Secret OpenAI key used in backend only"

setup_guide:
  steps:
    - "Clone repository"
    - "Run: npm install"
    - "Create .env file and add required variables"
    - "Start server: npm start"

folder_structure:
  controllers: "Handles API logic like tasks and AI parsing"
  routes: "Defines routes for tasks and AI endpoints"
  services: "Reusable logic (OpenAI parsing service)"
  models: "Mongoose schemas"
  middlewares: "Includes global error handler"
  db: "MongoDB connection setup"

global_error_handling:
  description: >
    All errors in the application are handled using a central middleware.
  behavior:
    - Converts all thrown errors into a standard JSON response
    - Prevents server from crashing
    - Ensures clean error messages for frontend
  response_format:
    success: false
    message: "Readable error message"

ai_parsing_feature:
  description: >
    AI parsing converts voice/text into structured task data using OpenAI.
  security:
    - OpenAI key is stored only in backend (never exposed on frontend)
    - Backend endpoint processes transcript and returns safe JSON output

notes:
  - "CORS is allowed for all origins"
  - "Ensure MongoDB is running before starting server"
