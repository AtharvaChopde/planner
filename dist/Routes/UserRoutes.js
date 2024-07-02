"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
const zod = require("zod");
const prisma = new client_1.PrismaClient();
const userSchema = zod.object({
    email: zod.string().email(),
    name: zod.string(),
    password: zod.string(),
});
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    try {
        userSchema.parse(req.body);
    }
    catch (e) {
        return res.status(411).json("error");
    }
    const test = yield prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!test) {
        const result = yield prisma.user.create({
            data: {
                email,
                name,
                password,
            },
        });
        return res.json(result);
    }
    return res.json({ msg: "user Exists" });
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const resp = yield prisma.user.findUnique({
        where: {
            email,
            password
        }
    });
    if (!resp) {
        return res.status(411).json({ "msg": "Invalid Input" });
    }
    return res.status(200).json(resp);
}));
module.exports = userRouter;
