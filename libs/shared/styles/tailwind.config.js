const { join } = require('path');
const baseConfig = require('../../../tailwind.base.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        ...(baseConfig?.content || []),
        join(
            __dirname,
            '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
        ),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    ...baseConfig,
};
