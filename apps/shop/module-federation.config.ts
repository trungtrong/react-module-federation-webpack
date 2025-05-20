import { ModuleFederationConfig } from '@nx/module-federation';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { shared } from '../../module-federation.base.config';

const config: ModuleFederationConfig = {
  name: 'shop',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: shared,
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
