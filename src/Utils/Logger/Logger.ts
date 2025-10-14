import chalk from "chalk";

export class Logger {
  static info(name: string, title: string, message: string, ...details: any[]) {
    console.log(
      `${chalk.red(`[${name}]`)} ${chalk.green(`${title}:`)} ${chalk.white(
        message
      )}`,
      ...details
    );
  }

  static warn(name: string, title: string, message: string, ...details: any[]) {
    console.log(
      `${chalk.red(`[${name}]`)} ${chalk.green(`${title}:`)} ${chalk.yellow(
        message
      )}`,
      ...details
    );
  }

  static error(
    name: string,
    title: string,
    message: string,
    ...details: any[]
  ) {
    console.log(
      `${chalk.red(`[${name}]`)} ${chalk.green(`${title}:`)} ${chalk.red(
        message
      )}`,
      ...details
    );
  }

  static time(name: string, title: string) {
    console.time(`${chalk.red(`[${name}]`)} ${chalk.green(`${title}`)}`);
  }

  static timeEnd(name: string, title: string) {
    console.timeEnd(`${chalk.red(`[${name}]`)} ${chalk.green(`${title}`)}`);
  }
}
