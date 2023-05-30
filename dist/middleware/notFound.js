const notFound = (req, res) => {
    res.status(404).send({ message: "404 - Page Not Found" });
};
export { notFound };
