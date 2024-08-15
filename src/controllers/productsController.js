import { pool } from "../database/postgres.js";


const tableName = 'products';

const getAllProducts = async (req,res) =>{
    try {
       const data =  await pool.query(`SELECT * FROM ${tableName}`);
       res.status(200).json({
        statusOk: true,
        data: data.rows
    })
    } catch (error) {
        res.status(500).json({
            statusOk: false,
            message: error.message
        })
    }
}

export {
    getAllProducts
}