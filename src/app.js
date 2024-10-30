import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import productRouter from "./routes/productsRouter.js";
import userRouter from "./routes/usersRouter.js";
import sessionRouter from "./routes/sessionsRouter.js";
import passport from "passport";
import configurePassport from "./helpers/passport.js";
import checkAuth from "./middlewares/checkAuth.js";
import cors from "cors";
// Para cargar los datos
import { loadData } from "./database/helper/loadData.js";

const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
//app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // Permitir solo tu frontend
  methods: 'GET,POST,DELETE', // Métodos permitidos
  allowedHeaders: ['Authorization', 'Content-Type'] // Encabezados permitidos
}));

//Pasport
app.use(passport.initialize());
configurePassport(passport);

//routers
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", sessionRouter);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Api Ecommerce</h1>");
});


app.get('/protegida',checkAuth, (req, res) => {
  res.json({ message: 'Acceso permitido', user: req.user });
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
