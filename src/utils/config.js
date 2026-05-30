import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const NEXUS_DIR = '.nexus';
const CONFIG_FILE = 'config.json';

/**
 * Resolve the path to the .nexus directory in the cwd.
 * @returns {string}
 */
export function nexusDir() {
  return join(process.cwd(), NEXUS_DIR);
}

/**
 * Resolve the path to the config file.
 * @returns {string}
 */
export function configPath() {
  return join(nexusDir(), CONFIG_FILE);
}

/**
 * Check whether a .nexus/config.json exists.
 * @returns {boolean}
 */
export function configExists() {
  return existsSync(configPath());
}

/**
 * Read and parse the config file.
 * @returns {object}
 */
export function readConfig() {
  const raw = readFileSync(configPath(), 'utf-8');
  return JSON.parse(raw);
}

/**
 * Write a config object to .nexus/config.json.
 * Creates the .nexus/ directory if it doesn't exist.
 * @param {object} config
 */
export function writeConfig(config) {
  const dir = nexusDir();
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(configPath(), JSON.stringify(config, null, 2) + '\n');
}
