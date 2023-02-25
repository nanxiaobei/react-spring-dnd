import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json') as unknown as string);

const input = 'src/index.tsx';
const cjsOutput = { file: pkg.main, format: 'cjs', exports: 'auto' };
const esmOutput = { file: pkg.module, format: 'es' };
const dtsOutput = { file: pkg.types, format: 'es' };

export default [
  { input, output: cjsOutput, plugins: [typescript()], external: () => true },
  { input, output: esmOutput, plugins: [typescript()], external: () => true },
  { input, output: dtsOutput, plugins: [dts()] },
];
