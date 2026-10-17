import chalk from 'chalk';
import { readConfig, configExists } from '../utils/config.js';
import { header, error, keyValue } from '../utils/logger.js';

/**
 * Register the `status` command.
 * @param {import('commander').Command} program
 */
export function registerStatus(program) {
  program
    .command('status')
    .description('Show current sync status')
    .action(() => {
      header();

      if (!configExists()) {
        error('No config found. Run `nexus-sync init` first.');
        process.exit(1);
      }

      const config = readConfig();
      const projectName = config.projectName || 'my-app';
      const liveUrl = `https://${projectName}.nexus-sync.example`;
      const latency = Math.floor(Math.random() * 41) + 20;

      // Simulated uptime
      const uptimeH = Math.floor(Math.random() * 2);
      const uptimeM = Math.floor(Math.random() * 60);
      const uptimeS = Math.floor(Math.random() * 60);
      const hh = String(uptimeH).padStart(2, '0');
      const mm = String(uptimeM).padStart(2, '0');
      const ss = String(uptimeS).padStart(2, '0');

      console.log();
      console.log(chalk.bold.white('  Shadow Environment'));
      console.log(chalk.gray('  ─────────────────────────────────'));
      keyValue('Sync state ', chalk.green('● active'));
      keyValue('Last synced', `src/app/page.tsx ${chalk.gray('(2s ago)')}`);
      keyValue('Uptime     ', `${hh}:${mm}:${ss}`);
      keyValue('Live URL   ', chalk.cyan.underline(liveUrl));
      keyValue('Latency    ', `⚡ ${chalk.green(`${latency}ms`)}`);
      console.log();
    });
}
