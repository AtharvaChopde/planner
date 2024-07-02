"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const rootRouter = require("./Routes/Routes");
const app = (0, express_1.default)();
const port = 3000;
app.use(cors());
app.use(express_1.default.json());
app.use("/api/v1", rootRouter);
app.listen(port, () => {
    console.log("listening on  " + port);
});
