declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_NAME: string;
      // add more environment variables and their types here
    }
  }
}