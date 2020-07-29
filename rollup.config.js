import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

const input = './src/index.js';
const globals = { react: 'React', 'react-dom': 'ReactDOM', 'styled-components': 'styled' };
const extensions = ['.js', '.jsx'];
const external = ['react', 'react-dom', 'styled-components'];

export default [
	{
		input,
		output: [
			{
				sourcemap: true,
				file: `dist/${pkg.name}.cjs.js`,
				format: 'cjs'
			},
		],
		external: [
            ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {})
        ],
		plugins: [
			resolve({ extensions }),
			babel({
				exclude: 'node_modules/**',
				presets: ['@babel/env', '@babel/preset-react'],
				plugins: [['babel-plugin-styled-components', { ssr: true, displayName: true, preprocess: false }]]
			}),
			commonjs({ include: 'node_modules/**' }),
			peerDepsExternal(),
		]
	}
];