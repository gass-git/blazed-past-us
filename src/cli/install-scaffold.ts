#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';

const dir = {
  template: path.resolve(import.meta.dirname, '../template'),
  target: process.cwd(),
};

copyRecursive(dir.template, dir.target);
console.log(chalk.green('scafolld installed ✅'));

function copyRecursive(src: string, destination: string): void {
  const srcPathExists = fs.existsSync(src);

  if (!srcPathExists) {
    return;
  }

  if (fs.statSync(src).isDirectory()) {
    /**
     * Make a folder at the destination path with the same name
     * as the one in src.
     */
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }

    // Copy the content of the src folder to the destination.
    fs.readdirSync(src).forEach((item) => {
      const itemSrcPath = path.join(src, item);
      const itemDestinationPath = path.join(destination, item);

      copyRecursive(itemSrcPath, itemDestinationPath);
    });
  } else {
    fs.copyFileSync(src, destination);
  }
}
