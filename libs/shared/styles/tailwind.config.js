const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const baseConfig = require('../../../tailwind.base.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
    ...baseConfig,
    content: [
        ...(baseConfig?.content || []),
        join(
            __dirname,
            '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
        ),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: baseConfig.theme.extend,
    },
};
