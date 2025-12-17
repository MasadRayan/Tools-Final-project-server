import express from "express";
import { createUser } from "../controllers/user.controller";
const userRouter = express.Router();

router.post("/", createUser);


export default userRouter