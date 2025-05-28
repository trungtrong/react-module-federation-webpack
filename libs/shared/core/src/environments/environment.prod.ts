// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.
import { ImportMetaEnv } from './helper';

export const environment: ImportMetaEnv = {
  name: "prod",
  production: true,
  DOMAIN_URL: "https://trungtrong.github.com/react-module-federation-webpack",
  API_BASE_URL: "https://trungtrong.github.com/react-module-federation-webpack/api"
};
