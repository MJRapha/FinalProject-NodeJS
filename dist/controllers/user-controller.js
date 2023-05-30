const login = (req, res) => {
    res.json({ message: "logged in." });
};
/* const logout = (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/')
    }
    catch (error) {
        console.log(error.message)
    }
}; */
export { login };
