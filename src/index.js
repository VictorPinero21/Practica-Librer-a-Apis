const express = require("express");
const app = express();
const bodyparser = require("body-parser")

app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));

const routes = require("./routes/index.js");
app.use("/api",routes);

const PORT = process.env.port || 3500;
app.listen(PORT, ()=> console.log("Servidor corriendo en 3500"));