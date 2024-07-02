import express, { Request, Response } from "express";
const cors = require("cors")

const rootRouter = require("./Routes/Routes");

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());


app.use("/api/v1", rootRouter);

app.listen(port, () => {
  console.log("listening on  " + port);
});
