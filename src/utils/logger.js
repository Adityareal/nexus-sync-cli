import chalk from 'chalk';

/**
 * Print the branded header line.
 */
export function header() {
  console.log(chalk.bold.cyan('\n✦ Nexus-Sync'));
}

/**
 * Print a success line.
 * @param {string} msg
 */
export function success(msg) {
  console.log(chalk.green(`  ✔ ${msg}`));
}

/**
 * Print a warning line.
 * @param {string} msg
 */
export function warn(msg) {
  console.log(chalk.yellow(`  ⚠ ${msg}`));
}

/**
 * Print an error line.
 * @param {string} msg
 */
export function error(msg) {
  console.log(chalk.red(`  ✗ ${msg}`));
}

/**
 * Print an info line.
 * @param {string} msg
 */
export function info(msg) {
  console.log(chalk.white(`  ${msg}`));
}

/**
 * Print a highlighted URL or key value.
 * @param {string} label
 * @param {string} value
 */
export function keyValue(label, value) {
  console.log(`  ${chalk.gray(label)} ${chalk.bold.white(value)}`);
}

/**
 * Return a formatted timestamp string [HH:MM:SS].
 * @returns {string}
 */
export function timestamp() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return chalk.gray(`[${hh}:${mm}:${ss}]`);
}

/**
 * Utility: sleep for ms milliseconds.
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
