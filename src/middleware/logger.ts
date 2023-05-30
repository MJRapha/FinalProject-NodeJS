import { RequestHandler } from "express";
import chalk from "chalk";

const logger: RequestHandler = (req, res, next) => {
    console.log(chalk.bold.bgCyanBright(req.method, req.url));
    next();
};

export { logger };
export default logger;