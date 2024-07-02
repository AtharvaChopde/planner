import express, { Request, Response } from "express";
const rootRouter = express.Router();
const userRouter = require("./UserRoutes");
const TodoRouter = require("./TodoRoutes")


rootRouter.use("/todos", TodoRouter)
rootRouter.use("/user", userRouter);

module.exports = rootRouter;
