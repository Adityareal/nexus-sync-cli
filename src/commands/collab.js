import crypto from 'node:crypto';
import chalk from 'chalk';
import { readConfig, configExists } from '../utils/config.js';
import { header, error, success } from '../utils/logger.js';

/**
 * Register the `collab` command with subcommand `invite`.
 * @param {import('commander').Command} program
 */
export function registerCollab(program) {
  const collab = program
    .command('collab')
    .description('Collaboration commands');

  collab
    .command('invite <email>')
    .description('Invite a collaborator by email')
    .action((email) => {
      header();

      if (!configExists()) {
        error('No config found. Run `nexus-sync init` first.');
        process.exit(1);
      }

      const config = readConfig();
      const projectName = config.projectName || 'my-app';
      const token = crypto.randomBytes(8).toString('hex');
      const collabUrl =
        `https://${projectName}.nexus-sync.dev` +
        `?collab=${token}`;

      console.log();
      success(`Invite sent to ${chalk.bold(email)}`);
      console.log(
        chalk.gray(`  They can join at: `) +
        chalk.cyan.underline(collabUrl)
      );
      console.log();
    });
}
