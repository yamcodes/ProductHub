import color from 'ansis';

export const logger = {
  info: (message: string) => console.log(color.blue(message)),
  success: (message: string) => console.log(color.green(message)),
  error: (message: string) => console.log(color.red(message)),
  warn: (message: string) => console.log(color.yellow(message)),
};
