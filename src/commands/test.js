import chalk from 'chalk';
import ora from 'ora';
import { header, sleep } from '../utils/logger.js';

const TEST_CASES = [
  { name: 'API route /api/users returns 200',          pass: true,  ms: 12   },
  { name: 'DB connection healthy',                     pass: true,  ms: 8    },
  { name: 'Auth middleware blocks unauthenticated',    pass: true,  ms: 5    },
  { name: 'Edge function /api/geo responds correctly', pass: true,  ms: 19   },
  { name: 'Email service timeout',                     pass: false, ms: 3001 },
];

/**
 * Register the `test` command.
 * @param {import('commander').Command} program
 */
export function registerTest(program) {
  program
    .command('test')
    .description('Run simulated test suite')
    .action(async () => {
      header();
      console.log();

      const spinner = ora({
        text: 'Running test suite...',
        indent: 2,
      }).start();

      await sleep(1500);
      spinner.stop();

      let passed = 0;
      let failed = 0;

      for (const tc of TEST_CASES) {
        await sleep(180);
        const timeStr = chalk.gray(`(${tc.ms}ms)`);
        if (tc.pass) {
          passed++;
          console.log(
            `  ${chalk.green('✔')} ${chalk.white(tc.name)}` +
            `  ${timeStr}`
          );
        } else {
          failed++;
          console.log(
            `  ${chalk.red('✗')} ${chalk.white(tc.name)}` +
            `  ${timeStr}`
          );
        }
      }

      console.log();
      console.log(
        chalk.gray('  ─────────────────────────────────')
      );

      const summary = [];
      if (passed > 0) summary.push(chalk.green(`${passed} passed`));
      if (failed > 0) summary.push(chalk.red(`${failed} failed`));

      console.log(`  ${summary.join(chalk.gray(', '))}`);
      console.log();
    });
}
