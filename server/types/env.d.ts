declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // POSTGRES
      POSTGRES_PORT: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;

      // SERVER
      SERVER_PORT: string;
      MODE: string;
      JWT_SECRET: string;

      // GOOGLE
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_CALLBACK_URL: string;

      // SENDGRID
      SENDGRID_API_KEY: string;
    }
  }
}

export {};
