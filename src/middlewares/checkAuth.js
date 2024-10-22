

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({
            statusOk: false,
            message: "No credentials"
        });

    }
}

export default checkAuth;