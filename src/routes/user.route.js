import express from "express";
import { createUser, getAllUsers } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);


export default userRouter;