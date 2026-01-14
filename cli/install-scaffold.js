#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';

const dir = {
  template: path.resolve(import.meta.dirname, '../template'),
  target: process.cwd(),
};

copyRecursive(dir.template, dir.target);

function copyRecursive(src, destination) {
  // does source path exist ?
  if (fs.existsSync(src)) {
    // does source path point to a directory ?
    if (fs.statSync(src).isDirectory()) {
      // if destination dir doesn't exist, create it.
      if (!fs.existsSync(destination)) fs.mkdirSync(destination);

      // resursively copy all files from source to destination.
      fs.readdirSync(src).forEach((file) => {
        copyRecursive(path.join(src, file), path.join(destination, file));
      });
    } else {
      // if file in src path, copy file to destination.
      fs.copyFileSync(src, destination);
    }
  }
}

console.log(chalk.yellow('Scafollding set ✅'));
