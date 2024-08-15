

const getAllProducts = (req,res) =>{
    res.status(200).json({
        statusOk: true,
        message:"Pronto se van a mostrar productos"
    })
}

export {
    getAllProducts
}