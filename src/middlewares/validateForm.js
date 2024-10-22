
const validateForm = (req, res, next) => {

    const { name, lastname,email,  password, password2 } = req.body;
    if (!name) return res.status(400).json({message: "Name missing"})
    if (!lastname)return res.status(400).json({message: "Last name missing"})
    if (!email) return res.status(400).json({message: "Email missing"})        
    if (!password || !password2) return res.status(400).json({message: "Password incomplete"})
    if (password != password2) return res.status(400).json({message: "Passwords don't match"})

    next()   

}

export default validateForm