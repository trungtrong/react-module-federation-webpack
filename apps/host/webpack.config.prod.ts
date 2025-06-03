import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/module-federation/webpack';
import { ModuleFederationConfig } from '@nx/module-federation';

import baseConfig from './module-federation.config';

const prodConfig: ModuleFederationConfig = {
    ...baseConfig,
    /*
     * Remote overrides for production.
     * Each entry is a pair of a unique name and the URL where it is deployed.
     *
     * e.g.
     * remotes: [
     *   ['app1', 'http://app1.example.com'],
     *   ['app2', 'http://app2.example.com'],
     * ]
     *
     * You can also use a full path to the remoteEntry.js file if desired.
     *
     * remotes: [
     *   ['app1', 'http://example.com/path/to/app1/remoteEntry.js'],
     *   ['app2', 'http://example.com/path/to/app2/remoteEntry.js'],
     * ]
     */
    /*
    1. Manual Setting
        We can take the default Remotes config in webpack file (in browser/source/runtime.js)
    */
    remotes: [
        ['shop', 'shop@/react-module-federation-webpack/shop/remoteEntry.js'],
        ['cart', 'cart@/react-module-federation-webpack/cart/remoteEntry.js'],
        ['about', 'about@/react-module-federation-webpack/about/remoteEntry.js'],
    ],
    /**
    * 2. Way 2: Flexible function to get Remotes
    */
   /*
    remotes: async() => {
        console.log('flexible get remotes');
        const { getRemoteUrls } = await import('./src/utils/remotes.utils');
        const urls = await getRemoteUrls();
        return urls;
    }*/
};

// Nx plugins for webpack to build config object from Nx options and context.
/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default composePlugins(
    withNx(),
    withReact(),
    withModuleFederation(prodConfig, { dts: false })
);
