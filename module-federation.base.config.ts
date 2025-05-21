import { SharedLibraryConfig } from '@nx/module-federation';

export function shared(pkg: string): undefined | false | SharedLibraryConfig {
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
      return undefined; // = singleton
  }
}
