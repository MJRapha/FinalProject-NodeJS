import chalk from "chalk";
const logger = (req, res, next) => {
    console.log(chalk.bold.bgCyanBright(req.method, req.url));
    next();
};
export { logger };
export default logger;
