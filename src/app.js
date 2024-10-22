import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import productRouter from "./routes/productsRouter.js";
import userRouter from "./routes/usersRouter.js";
import sessionRouter from "./routes/sessionsRouter.js";
import initPassportLocal from "./helpers/passport.config.js";
import passport from "passport";
import session from 'express-session';



import cors from "cors";
// Para cargar los datos
import { loadData } from "./database/helper/loadData.js";
// import {createTable} from "./database/helper/createTable.js";

const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors());


  app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false ,
    saveUninitialized: true ,
  }))

initPassportLocal();
app.use(passport.initialize());
app.use(passport.session());

//routers
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", sessionRouter);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Api Ecommerce</h1>");
});

app.get("/error", (req,res) => {
  console.log( req.session.messages)
  res.send("<h1>Error</h1>");
})

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});

// Para cargar datos a la base desde un json
//loadData();
//createTable()
