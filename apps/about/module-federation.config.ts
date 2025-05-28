import { ModuleFederationConfig } from '@nx/module-federation';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { sharedDependencies } from '../../module-federation.base.config';

const config: ModuleFederationConfig = {
    name: 'about',
    exposes: {
        './Module': './src/remote-entry.ts',
        // Here we expose a component. The key is the public name, value is the path to the component file.
        './shared/features/RemoteAboutWidget': './src/shared/features/remote-widget',
    },
    shared: sharedDependencies
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
