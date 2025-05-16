const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const baseConfig = require('../../tailwind.base.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        ...(baseConfig?.content || []),
        join(
            __dirname,
            '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
        ),
        // import tailwind to its libraries and dependencies
        ...createGlobPatternsForDependencies(__dirname),
        // INFO : Add the following line to include the tailwind styles from the info application
        ...createGlobPatternsForDependencies(join(__dirname, 'apps/about')),
        ...createGlobPatternsForDependencies(join(__dirname, 'apps/shop')),
        ...createGlobPatternsForDependencies(join(__dirname, 'apps/cart')),
    ],
    ...baseConfig,
};
