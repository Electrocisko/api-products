import passport from "passport"

const checkAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {

        console.log("error",err);
        console.log("user",user);
        console.log("info",info);

        if (err) {
            console.log(err);
            return res.sendStatus(403); // Prohibido
        }
        if (!user) {
            return res.sendStatus(401); // No autorizado
        }
        req.user = user; // Guarda el usuario en la solicitud
        next(); // Pasa al siguiente middleware o ruta
    })(req, res, next);
};

export default checkAuth;

