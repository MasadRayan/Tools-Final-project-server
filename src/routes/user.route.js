import express from "express";
import { createUser, getAllUsers, getUserRole } from "../controllers/user.controller.js";
import { verifyFBToken } from "../middlewares/verifyFBToken.js";
const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:email/role",verifyFBToken, getUserRole);


export default userRouter;