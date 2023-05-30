import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res) => {
    res.status(404).send({ message: "404 - Page Not Found" });
};

export { notFound };
