import inquirer from 'inquirer';
import chalk from 'chalk';
import { writeConfig, configExists } from '../utils/config.js';
import { header, success, warn, info } from '../utils/logger.js';

/**
 * Register the `init` command.
 * @param {import('commander').Command} program
 */
export function registerInit(program) {
  program
    .command('init')
    .description('Scaffold a .nexus/ config directory')
    .action(async () => {
      header();

      if (configExists()) {
        warn('A .nexus/config.json already exists.');
        const { overwrite } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: 'Overwrite existing config?',
            default: false,
          },
        ]);
        if (!overwrite) {
          info('Aborted.');
          return;
        }
      }

      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          default: 'my-app',
          validate: (v) =>
            /^[a-z0-9-]+$/.test(v)
              ? true
              : 'Lowercase alphanumeric + hyphens only',
        },
        {
          type: 'list',
          name: 'framework',
          message: 'Framework:',
          choices: ['Next.js', 'Remix', 'SvelteKit', 'Other'],
        },
        {
          type: 'list',
          name: 'region',
          message: 'Preferred region:',
          choices: ['us-east-1', 'eu-west-1', 'ap-south-1'],
        },
      ]);

      const config = {
        projectName: answers.projectName,
        framework: answers.framework,
        region: answers.region,
        watchPaths: ['src/', 'app/', 'pages/', 'api/'],
        createdAt: new Date().toISOString(),
      };

      writeConfig(config);

      console.log();
      success('Project initialized!');
      info(
        `Config written to ${chalk.underline('.nexus/config.json')}`
      );
      console.log();
    });
}
