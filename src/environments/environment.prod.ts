import { google } from "./google.environment";

export const environment = {
  production: true,
  BLOG_PRIVATE_KEY: google.BLOG_PRIVATE_KEY,
  BLOG_CLIENT_EMAIL: google.BLOG_CLIENT_EMAIL
};
