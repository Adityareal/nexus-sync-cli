import chalk from 'chalk';
import cliProgress from 'cli-progress';
import { readConfig, configExists } from '../utils/config.js';
import { header, error, success, sleep } from '../utils/logger.js';

/**
 * Register the `db` command with subcommand `sandbox`.
 * @param {import('commander').Command} program
 */
export function registerDb(program) {
  const db = program
    .command('db')
    .description('Database management commands');

  db.command('sandbox')
    .description('Create an isolated database sandbox')
    .action(async () => {
      header();

      if (!configExists()) {
        error('No config found. Run `nexus-sync init` first.');
        process.exit(1);
      }

      const config = readConfig();
      const projectName = config.projectName || 'my-app';

      console.log();

      // Step 1: Clone schema
      process.stdout.write(
        chalk.white('  → Cloning production schema...  ')
      );
      const bar1 = new cliProgress.SingleBar(
        {
          format: `${chalk.cyan('{bar}')} {percentage}%`,
          barCompleteChar: '█',
          barIncompleteChar: '░',
          hideCursor: true,
        },
        cliProgress.Presets.shades_classic
      );
      bar1.start(100, 0);
      for (let i = 0; i <= 100; i += 5) {
        bar1.update(i);
        await sleep(60);
      }
      bar1.stop();

      // Step 2: Anonymize PII
      process.stdout.write(
        chalk.white('  → Anonymizing PII fields...     ')
      );
      const bar2 = new cliProgress.SingleBar(
        {
          format: `${chalk.cyan('{bar}')} {percentage}%`,
          barCompleteChar: '█',
          barIncompleteChar: '░',
          hideCursor: true,
        },
        cliProgress.Presets.shades_classic
      );
      bar2.start(100, 0);
      for (let i = 0; i <= 100; i += 4) {
        bar2.update(Math.min(i, 100));
        await sleep(50);
      }
      bar2.update(100);
      bar2.stop();

      console.log();
      const sandboxUrl =
        `postgres://sandbox.nexus-sync.example:5432` +
        `/${projectName}_sandbox`;
      success(`Sandbox ready at: ${chalk.underline(sandboxUrl)}`);
      console.log();
    });
}
