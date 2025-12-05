import dotenv from "dotenv";
dotenv.config();

const ENV = {
  APP_ENV: process.env.APP_ENV,
  APP_PORT: process.env.APP_PORT,
  MONGO_URL: process.env.MONGO_URL,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
};

export { ENV };