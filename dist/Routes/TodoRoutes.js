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
const prisma = new client_1.PrismaClient();
const TodoRouter = express_1.default.Router();
const zod = require("zod");
const TodoSchema = zod.object({
    title: zod.string().min(1, "empty"),
    desc: zod.string().min(1, "empty"),
    status: zod.number(),
    userId: zod.number()
});
TodoRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, desc, status, userId } = req.body;
    try {
        TodoSchema.safeParse(req.body);
    }
    catch (e) {
        return res.send(404).json("invalid input");
    }
    const result = yield prisma.todo.create({
        data: {
            title,
            desc,
            status,
            userId
        }
    });
    if (!result) {
        return res.json({ "msg": "error" });
    }
    return res.status(200).json(result);
}));
TodoRouter.get("/getTodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.headers['key'];
    const id = parseInt(req.headers['id']);
    try {
        const result = yield prisma.todo.findMany({
            where: {
                userId: id,
                desc: {
                    contains: key,
                    mode: 'insensitive'
                }
            }
        });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}));
TodoRouter.get("/getall", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.headers['id']);
    const result = yield prisma.todo.findMany({
        where: {
            userId: id,
        }
    });
    return res.json(result);
}));
module.exports = TodoRouter;
