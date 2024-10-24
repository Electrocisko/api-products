import passport from "passport"

const checkAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {

        if (err) {
            return res.sendStatus(403); // Prohibido
        }
        if (!user) {
            return res.sendStatus(401); // No autorizado
        }
        req.user = user; // Guarda el usuario en la solicitud
        next(); 
    })(req, res, next);
};

export default checkAuth;

