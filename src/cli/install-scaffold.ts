#!/usr/bin/env node
import path from 'node:path';
import { copyRecursive, log } from '../server/server-utils.js';

const dir = {
  template: path.resolve(import.meta.dirname, '../template'),
  target: process.cwd(),
};

copyRecursive(dir.template, dir.target);
log('scafolld all set! 👷', 'green');
