#!/usr/bin/env node
import * as p from '@clack/prompts';
import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { minimatch } from 'minimatch';
// import color from 'picocolors';
import * as c from 'colorette';
import { createColorize } from 'colorize-template';

const colorize = createColorize({ ...c });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __root = resolve(__dirname, '..', '..', '..');
const __target = resolve(__root, 'apps/api');

interface Data {
  port: number;
}


const createAndSaveFile = async (
  data: Data,
  filename: string,
  target: string,
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
  writeFileSync(resolve(target, filename), content, 'utf-8');
};

const ensureFileInGitignore = async (filename: string, target: string) => {
  const gitignore = {
    path: resolve(target, '.gitignore'),
    content: '',
  };
  gitignore.content = readFileSync(gitignore.path, 'utf-8');
  const isIgnored = gitignore.content
    .split('\n')
    .some((pattern) => minimatch(filename, pattern));
  if (!isIgnored) {
    p.log.warn(
      `Wait wait wait! The script has identified that ${c.underline(
        filename,
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
        { value: 'strict', label: `Only add ${filename} to .gitignore` },
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
        gitignore.content += `\n${filename}`;
        writeFileSync(gitignore.path, gitignore.content, 'utf-8');
        break;
      case 'ignore':
        p.log.step(
          `Ignoring ${c.underline(filename)} in ${c.underline('.gitignore')}.`,
        );
        break;
    }
  }
};

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

const main = async () => {
  console.clear();
  p.intro(colorize`{inverse.blueBright  Let's set up your environment! }`);
  const data = await queryData();
  const filename = 'env.config.ts';
  await createAndSaveFile(data, filename, __target);
  p.log.success(
    c.green(
      `Successfully created environment file: ${c.underline(
        `apps/api/${filename}`,
      )}`,
    ),
  );
  await ensureFileInGitignore(filename, __target);
  p.note(
    colorize`{bold If you haven't already, run {italic \`npm install\`} to install dependencies.
You can now start the server with {italic \`npm run dev\`} or {italic \`npm run start\`}}.

You may also need to restart the TS server if you experience any TypeScript related issues from the newly created file.`,
    'Next steps',
  );
  p.outro('Thank you for using this script. Have a nice day!');
};

main();
