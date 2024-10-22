const validateLogin = (req, res, next) => {

    const { email,  password } = req.body;
    if (!email) return res.status(400).json({message: "Email missing"})        
    if (!password) return res.status(400).json({message: "Password incomplete"})
  
    next()   

}

export default validateLogin