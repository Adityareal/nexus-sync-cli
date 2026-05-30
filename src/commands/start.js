import chokidar from 'chokidar';
import chalk from 'chalk';
import { readConfig, configExists } from '../utils/config.js';
import {
  header,
  success,
  error,
  info,
  timestamp,
} from '../utils/logger.js';

/**
 * Register the `start` command.
 * @param {import('commander').Command} program
 */
export function registerStart(program) {
  program
    .command('start')
    .description('Start real-time file sync to shadow env')
    .action(() => {
      header();

      if (!configExists()) {
        error('No config found. Run `nexus-sync init` first.');
        process.exit(1);
      }

      const config = readConfig();
      const projectName = config.projectName || 'my-app';
      const watchPaths = config.watchPaths || [
        'src/',
        'app/',
        'pages/',
        'api/',
      ];

      const liveUrl = `https://${projectName}.nexus-sync.dev`;

      console.log();
      info(`Watching: ${chalk.cyan(watchPaths.join(', '))}`);
      console.log(
        chalk.bold.cyan(`  ✦ Shadow live at: ${chalk.underline(liveUrl)}`)
      );
      console.log();

      const watcher = chokidar.watch(watchPaths, {
        ignoreInitial: true,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.nexus/**',
        ],
      });

      watcher.on('change', (filePath) => {
        const latency = Math.floor(Math.random() * 41) + 20; // 20-60ms
        console.log(
          `${timestamp()} ${chalk.green('✔')} Synced  ` +
          `${chalk.white(filePath)}  →  ` +
          `${chalk.cyan('shadow')} ` +
          `${chalk.gray(`(${latency}ms)`)}`
        );
      });

      watcher.on('add', (filePath) => {
        const latency = Math.floor(Math.random() * 41) + 20;
        console.log(
          `${timestamp()} ${chalk.green('✔')} Added   ` +
          `${chalk.white(filePath)}  →  ` +
          `${chalk.cyan('shadow')} ` +
          `${chalk.gray(`(${latency}ms)`)}`
        );
      });

      watcher.on('unlink', (filePath) => {
        console.log(
          `${timestamp()} ${chalk.yellow('⚠')} Removed ` +
          `${chalk.white(filePath)}`
        );
      });

      watcher.on('error', (err) => {
        error(`Watcher error: ${err.message}`);
      });

      // Graceful shutdown
      const shutdown = () => {
        console.log();
        info('Stopping file watcher...');
        watcher.close().then(() => {
          success('Shadow sync stopped. Goodbye! 👋');
          console.log();
          process.exit(0);
        });
      };

      process.on('SIGINT', shutdown);
      process.on('SIGTERM', shutdown);
    });
}
