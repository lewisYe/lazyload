import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss';
import path from 'path'
import pkg from './package.json'


const extensions = [ '.ts', '.tsx', '.js', '.jsx'];


export default [
  {
    input: "index.tsx",
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
      },
      {
        file: pkg.module,
        format: 'es',
        globals: {
          'react': 'React', // key 为包名，value 为包暴露给 window 上的变量名
          'react-dom': 'ReactDOM',
        },
      }
    ],
    external: [
      'react',
      'react-dom',
    ],
    plugins: [
      resolve({
        extensions,
      }),
      commonjs(),
      babel({
        extensions,
        presets: [
          '@babel/preset-env',
          ["@babel/preset-typescript", {
            "isTSX": true,
            "allExtensions": true,
          }],
          '@babel/preset-react'
        ],
        plugins: [
          '@babel/transform-runtime'
        ],
        babelrc: false, 
        babelHelpers: 'runtime',
      }),
      alias({
        entries: [
          { find: '@', replacement: path.resolve(__dirname) },
        ],
      }),
      postcss(),
      terser(),
    ],
  },
]