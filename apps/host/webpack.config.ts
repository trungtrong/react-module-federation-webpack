import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/module-federation/webpack';
import { ModuleFederationConfig } from '@nx/module-federation';

import baseConfig from './module-federation.config';
const webpack = require('webpack');
// const dotenv = require('dotenv');

// dotenv.config();

const config: ModuleFederationConfig = {
    ...baseConfig,
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
    withModuleFederation(config, { dts: false }),
    (config) => {
        (config.plugins as Array<unknown>).push(new webpack.DefinePlugin(getProcessEnv()));
        return config;
    },
);

function getProcessEnv() {
    // console.log('dotenv', JSON.stringify(dotenv.config()));
    console.log('process', process.env);
    return {
        'process.ev': {
            'NODE_ENV': process.env.NODE_ENV,
            'NEXT_PUBLIC_DOMAIN_URL': process.env.NEXT_PUBLIC_DOMAIN_URL,
        }
    };
}
