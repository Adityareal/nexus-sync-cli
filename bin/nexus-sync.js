#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { Command } from 'commander';
import chalk from 'chalk';
import { registerInit } from '../src/commands/init.js';
import { registerStart } from '../src/commands/start.js';
import { registerStop } from '../src/commands/stop.js';
import { registerStatus } from '../src/commands/status.js';
import { registerDb } from '../src/commands/db.js';
import { registerCollab } from '../src/commands/collab.js';
import { registerTest } from '../src/commands/test.js';
import { registerDeploy } from '../src/commands/deploy.js';

const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf-8')
);

const program = new Command();

program
  .name('nexus-sync')
  .version(pkg.version)
  .description(
    chalk.bold.cyan('✦ Nexus-Sync') +
    ' — develop locally, run in the cloud.'
  );

registerInit(program);
registerStart(program);
registerStop(program);
registerStatus(program);
registerDb(program);
registerCollab(program);
registerTest(program);
registerDeploy(program);

program.parse(process.argv);
