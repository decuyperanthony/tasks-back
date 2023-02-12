import * as dotenv from "dotenv";
dotenv.config();

const APP_URL = process.env.APP_URL || "http://localhost:3000";
// const ENVIRONMENT = process.env.NODE_ENV || "development";

const CORS_ORIGIN_ALLOWED = [APP_URL];

export {
  CORS_ORIGIN_ALLOWED,
  //ENVIRONMENT
};
