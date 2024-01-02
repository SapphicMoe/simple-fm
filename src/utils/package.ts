import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

interface Package {
  name: string;
  version: string;
  license: string;
  author: string;
  description: string;
  type: string;
  main: string;
  files: string[];
  scripts: Record<string, string>;
  publishConfig: Record<string, string>;
  engines: Record<string, string>;
  exports: Record<string, string>;
  homepage: string;
  repository: Record<string, string>;
  keywords: string[];
  funding: Record<string, string>;
  packageManager: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

const filePath = fileURLToPath(import.meta.url);
const dirPath = dirname(filePath);

const file = readFileSync(resolve(dirPath, '../../package.json'), 'utf-8');

export const pkg = JSON.parse(file) as Package;
