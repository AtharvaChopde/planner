import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
const userRouter = express.Router();
const zod = require("zod");
const prisma = new PrismaClient();

const userSchema = zod.object({
  email: zod.string().email(),
  name: zod.string(),
  password: zod.string(),
});

userRouter.post("/signup", async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  try {
    userSchema.parse(req.body);
  } catch (e) {
    return res.status(411).json("error")
  }

  const test = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!test) {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });


    return res.json(result);
  }

  return res.json({ msg: "user Exists" });
});



userRouter.post("/signin", async (req:Request,res:Response)=>{

    const {email , password} = req.body

    const resp = await prisma.user.findUnique({
        where : {
            email,
            password
        }
    })

    if (!resp){
        return res.status(411).json({"msg": "Invalid Input"})
    }

    return res.status(200).json(resp)

}) 






module.exports = userRouter;
