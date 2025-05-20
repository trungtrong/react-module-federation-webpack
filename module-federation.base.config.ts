import { SharedLibraryConfig } from '@nx/module-federation';

export function shared(pkg: string): undefined | false | SharedLibraryConfig {
  switch (true) {
    // It is absolute path in ts.config or packageName in package.json
    case pkg === '@libs/utils':
      return {
        singleton: true,
        eager: true
      } as SharedLibraryConfig; // or undefined
    default:
      return undefined;
  }
}
