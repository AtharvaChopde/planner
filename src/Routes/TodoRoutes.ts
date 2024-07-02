import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient()
const TodoRouter = express.Router()
const zod = require("zod")






const TodoSchema = zod.object({
    title : zod.string().min(1,"empty"),
    desc : zod.string().min(1,"empty"),
    status : zod.number(),
    userId : zod.number()
})

TodoRouter.post("/create",async (req:Request,res:Response)=>{

const {title , desc , status, userId} = req.body

try {
    TodoSchema.safeParse(req.body)
}catch (e){
    return res.send(404).json("invalid input")
}

const result = await prisma.todo.create({
    data : {
        title,
        desc,
        status,
        userId
    }
})

if (!result){
    return res.json({"msg" : "error"})
}

return res.status(200).json(result)
})

TodoRouter.get("/getTodo", async (req: Request, res: Response) => {
    const key = req.headers['key'] as string;
    const id = parseInt(req.headers['id'] as string)
 
    try {
        const result = await prisma.todo.findMany({
            where: {
                userId: id,
                desc: {
                    contains: key,
                    mode: 'insensitive'
                }
            }
        });

        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});


 TodoRouter.get("/getall", async (req: Request , res:Response)=>{
    const id = parseInt(req.headers['id'] as string)
    const result = await prisma.todo.findMany({
        where : {
            userId : id,
        }
    
    })

    return res.json(result)
 })
module.exports = TodoRouter


