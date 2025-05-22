import { SharedLibraryConfig } from '@nx/module-federation';
const deps = require('./package.json').dependencies;

export function sharedDependencies(pkg: string): undefined | false | SharedLibraryConfig {
  switch (true) {
    /**
     * - It is absolute path in ts.config or packageName in package.json
     * '@libs/utils' or '@libs/shared/utils'
     */
    case pkg === '@libs/shared/core/injector':
      return {
        singleton: true,
        eager: true
      } as SharedLibraryConfig;
    case pkg === '@libs/utils':
    case pkg === '@libs/shared/core':
    default:
      // By not declaring a shared function, all dependencies will be shared
      // react: { singleton: true, eager: true, version: '19.0.0' },
      return undefined; // = singleton
  }
}

/*
module.exports = {
  react: {
    singleton: true,
    requiredVersion: deps.react,
  },
  'react-dom': {
    singleton: true,
    requiredVersion: deps['react-dom'],
  },
  'react-router-dom': {
    singleton: true,
    requiredVersion: deps['react-router-dom'],
  },
  // Add other frequently used libraries here
  // e.g., '@my-org/shared/utils': { singleton: true },
  // e.g., '@my-org/shared/components': { singleton: true },
};
*/
