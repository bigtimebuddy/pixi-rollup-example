import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';

export default {
    input: 'src/index.js',
    output: {
        file: 'bundle.js',
        format: 'iife'
    },
    plugins: [
        // alias allow us to use minifed builds in production
        // BUILD environment var is passed to rollup
        ...process.env.BUILD === 'production' ? [alias({
            entries: [{
                find: /^(@pixi\/([^\/]+))$/,
                replacement: '$1/dist/esm/$2.min.js',
            }, {
                find: 'pixi.js',
                replacement: 'pixi.js/dist/esm/pixi.min.js',
            }]
        })] : [],
        resolve({
            // This is required to not confuse Rollup with
            // the url dependence that is used by PixiJS utils
            preferBuiltins: false,
        }),
        // Some PixiJS dependencies use default exports
        // or do not have modules builds
        commonjs(),
    ]
};