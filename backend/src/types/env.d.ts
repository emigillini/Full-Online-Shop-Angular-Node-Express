interface ProcessEnv {
  PORT?: string;
  DB_HOST?: string;
  DB_PORT?: string;
  DB_NAME?: string;
  JWT_SECRET?: string;
  MOONGOSE_CONNECT?: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends ProcessEnv {}
}
