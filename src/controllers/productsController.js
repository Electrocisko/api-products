import { pool } from "../database/postgres.js";


const tableName = 'users';

const getAllProducts = async (req,res) =>{
    try {
       const data =  await pool.query(`SELECT * FROM ${tableName}`);
       res.status(200).json({
        statusOk: true,
        message:"Pronto se van a mostrar productos",
        response: data.rows
    })
    } catch (error) {
        console.log(error);
    }
}

export {
    getAllProducts
}