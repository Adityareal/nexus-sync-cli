import chalk from 'chalk';
import { header, success, info } from '../utils/logger.js';

/**
 * Register the `stop` command.
 * @param {import('commander').Command} program
 */
export function registerStop(program) {
  program
    .command('stop')
    .description('Stop the shadow sync watcher')
    .action(() => {
      header();
      console.log();
      info('Shutting down shadow environment...');
      success('File watcher stopped.');
      success('Shadow environment suspended.');
      console.log();
      console.log(
        chalk.gray(
          '  Run `nexus-sync start` to resume syncing.'
        )
      );
      console.log();
    });
}
