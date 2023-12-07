#!/usr/bin/env node
import * as p from '@clack/prompts';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { minimatch } from 'minimatch';
import * as c from 'colorette';
import { createColorize } from 'colorize-template';

const colorize = createColorize({ ...c });

/**
 * Full path to the current file including its name.
 */
const __filename = fileURLToPath(import.meta.url);
/**
 * Full path to the current file's directory.
 */
const __dirname = dirname(__filename);
/**
 * Full path to the root directory of the project.
 */
const root = resolve(__dirname, '..', '..', '..');
/**
 * Full path to the target directory.
 */
const target = resolve(root, 'apps/api');
/**
 * The name of the environment file.
 */
const envFileName = 'env.config.ts';
/**
 * Full path to the environment file.
 */
const envFilePath = resolve(target, envFileName);

interface Data {
  port: number;
}

const ensureFileDoesNotExist = async () => {
  if (!existsSync(envFilePath)) return;
  p.log.warn(
    c.yellow(
      `It seems like you already have an environment file. If you choose to continue, the existing file will be overwritten.`,
    ),
  );
  const shouldContinue = await p.confirm({
    message: 'Are you sure you want to continue?',
    initialValue: false,
  });
  if (!shouldContinue) {
    p.outro(c.blue(`Environment file at ${c.underline(envFilePath)} was not modified.`));
    process.exit(0);
  }
}

const queryData = (): Promise<Data> =>
  p.group({
    port: async () => {
      const value = await p.text({
        message: 'What port would you like to use?',
        placeholder: '3000',
        initialValue: '3000',
        defaultValue: '3000',
        validate: (value) => {
          const parsed = parseInt(value);
          if (Number.isNaN(parsed) || parsed <= 0 || parsed >= 65536)
            return c.red(
              `Please enter a valid port number. Your input ${value} is not valid.`,
            );
        },
      });
      return parseInt(<string>value);
    },
    closeGraceDelay: async () => {
      const value = await p.text({
        message:
          'How many milliseconds would you like to wait for the server to close gracefully?',
        placeholder: '5000',
        initialValue: '5000',
        defaultValue: '5000',
        validate: (value) => {
          const parsed = parseInt(value);
          if (Number.isNaN(parsed) || parsed <= 0)
            return c.red(
              `Please enter a valid number. Your input ${value} is invalid.`,
            );
        },
      });
      return parseInt(<string>value);
    },
  });

const createAndSaveFile = async (
  data: Data
) => {
  const content = `// This file was generated by \`npx init-api\`
// You can modify this file as you see fit.
// It is not recommended to commit this file to version control.

import { defineConfig } from '@/config';

export default defineConfig({
${Object.entries(data)
  .map(([key, value]) => `  ${key}: ${value}`)
  .join(',\n')}
});
`;
  writeFileSync(envFilePath, content, 'utf-8');
};

const ensureFileInGitignore = async () => {
  const gitignore = {
    path: resolve(target, '.gitignore'),
    content: '',
  };
  gitignore.content = readFileSync(gitignore.path, 'utf-8');
  const isIgnored = gitignore.content
    .split('\n')
    .some((pattern) => minimatch(envFileName, pattern));
  if (!isIgnored) {
    p.log.warn(
      `Wait wait wait! The script has identified that ${c.underline(
        envFileName,
      )} is not in ${c.underline('.gitignore')}. ` +
        c.bold('This is not recommended.'),
    );
    p.note(`We strongly recommend that ${c.bold(
      'any',
    )} environment file stays local to your machine and out of version control.
See more from ${c.italic(
      'dotenv',
    )}: https://github.com/motdotla/dotenv#should-i-commit-my-env-file`);
    const gitignoreOption = await p.select({
      message: `How would you like to proceed?`,
      options: [
        {
          value: 'all-env',
          label: 'Add `*env*` to .gitignore',
          hint: 'Recommended',
        },
        { value: 'strict', label: `Only add ${envFileName} to .gitignore` },
        {
          value: 'ignore',
          label: `Ignore this warning and continue`,
          hint: 'Not recommended',
        },
      ],
      initialValue: 'all-env',
    });
    switch (gitignoreOption) {
      case 'all-env':
        gitignore.content += '\n*env*';
        writeFileSync(gitignore.path, gitignore.content, 'utf-8');
        break;
      case 'strict':
        gitignore.content += `\n${envFileName}`;
        writeFileSync(gitignore.path, gitignore.content, 'utf-8');
        break;
      case 'ignore':
        p.log.step(
          `Ignoring ${c.underline(envFileName)} in ${c.underline('.gitignore')}.`,
        );
        break;
    }
  }
};

const main = async () => {
  console.clear();
  p.intro(colorize`{inverse.blueBright  Let's set up your environment! }`);
  await ensureFileDoesNotExist();
  const data = await queryData();
  await createAndSaveFile(data);
  await ensureFileInGitignore();
  p.note(
    colorize`{bold If you haven't already, run {italic \`npm install\`} to install dependencies.
You can now start the server with {italic \`npm run dev\`} or {italic \`npm run start\`}}.

You may also need to restart the TS server (or your editor) if you experience
any TypeScript related issues from the newly created file.`,
    'Next steps',
  );
  p.outro(
    c.green(
      `Successfully created environment file: ${c.underline(envFilePath)}`,
    ),
  );
};

main();
