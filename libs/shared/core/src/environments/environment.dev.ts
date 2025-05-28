// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.
import { ImportMetaEnv } from './helper';

export const environment: ImportMetaEnv = {
  name: "dev",
  production: true,
  DOMAIN_URL: "http://localhost:3000",
  API_BASE_URL: "http://localhost:8081"
};
