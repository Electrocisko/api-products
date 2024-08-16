import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import productRouter from './routes/productsRouter.js';
import { loadData } from "./database/helper/loadData.js";



const PORT = process.env.PORT;  

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));


//routers
app.use("/api",productRouter )


app.get("/", (req,res) => {
    res.status(200).send("<h1>Api Ecommerce</h1>")
})



app.listen(PORT, () => {
    console.log( `Servidor levantado en http://localhost:${PORT}`);
})


// Para cargar datos a la base desde un json
//loadData();   