#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';

const dir = {
  template: path.resolve(import.meta.dirname, '../template'),
  target: process.cwd(),
};

copyRecursive(dir.template, dir.target);

function copyRecursive(src: string, destination: string): void {
  if (fs.existsSync(src)) {
    if (fs.statSync(src).isDirectory()) {
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
      }

      fs.readdirSync(src).forEach((file) => {
        copyRecursive(path.join(src, file), path.join(destination, file));
      });
    } else {
      fs.copyFileSync(src, destination);
    }
  }
}

console.log(chalk.yellow('scafollding set ✅'));
