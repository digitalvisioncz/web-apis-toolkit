import {babel} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import eslint from '@rollup/plugin-eslint';
import external from 'rollup-plugin-peer-deps-external';
import inject from '@rollup/plugin-inject';
import typescript from '@rollup/plugin-typescript';
// import dts from 'rollup-plugin-dts';

const plugins = [
    nodeResolve({
        extensions: [
            '.jsx',
            '.js',
            '.json',
            '.css',
            '.ts',
            '.tsx',
        ],
    }),
    eslint({
        exclude: [
            'node_modules/**',
            'dist/**',
            '**/*.css',
            '**/*.svg',
            '**/*.png',
        ],
    }),
    external({
        includeDependencies: true,
    }),
    commonjs(),
    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
    }),
    inject({
        modules: {
            React: 'react',
        },
    }),
    typescript({
        tsconfig: './tsconfig.json',
    }),
];

const helpers = ['navigator/getPreferredLanguage/getPreferredLanguage'];

export default [
    {
        input: ['src/index.ts', ...helpers.map(h => `src/${h}.ts`)],
        output: [
            {
                dir: 'dist',
                entryFileNames: '[name].js',
                format: 'cjs',
                exports: 'named',
            }, {
                dir: 'dist',
                entryFileNames: '[name].module.js',
                format: 'es',
                exports: 'named',
            },
        ],
        plugins,
        preserveModules: true,
    },
];
