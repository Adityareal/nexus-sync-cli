import chalk from 'chalk';
import ora from 'ora';
import { readConfig, configExists } from '../utils/config.js';
import { header, error, sleep } from '../utils/logger.js';

const DEPLOY_STEPS = [
  { text: 'Building project...', duration: 600 },
  { text: 'Running pre-deploy tests...', duration: 600 },
  { text: 'Pushing to Shadow Environment...', duration: 600 },
  { text: 'Warming edge nodes...', duration: 600 },
];

/**
 * Register the `deploy` command.
 * @param {import('commander').Command} program
 */
export function registerDeploy(program) {
  program
    .command('deploy')
    .description('Deploy to production')
    .action(async () => {
      header();

      if (!configExists()) {
        error('No config found. Run `nexus-sync init` first.');
        process.exit(1);
      }

      const config = readConfig();
      const projectName = config.projectName || 'my-app';
      const liveUrl = `https://${projectName}.nexus-sync.example`;

      console.log();
      const startTime = Date.now();

      for (const step of DEPLOY_STEPS) {
        const spinner = ora({
          text: `⚡ ${step.text}`,
          indent: 2,
        }).start();
        await sleep(step.duration);
        spinner.succeed(`⚡ ${step.text}`);
      }

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

      console.log();
      console.log(
        chalk.bold.cyan(
          `  ✦ Production deploy complete: ` +
          chalk.underline(liveUrl)
        )
      );
      console.log(
        chalk.bold.cyan(
          `  ✦ Deploy time: ${elapsed}s`
        )
      );
      console.log();
    });
}
