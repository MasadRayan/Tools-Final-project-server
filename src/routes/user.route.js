import express from "express";
import { createUser, getAllUsers, getUserRole, updateUserRole } from "../controllers/user.controller.js";
import { verifyFBToken } from "../middlewares/verifyFBToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", verifyFBToken, verifyAdmin, getAllUsers);
userRouter.get("/:email/role", verifyFBToken, getUserRole);
userRouter.patch("/role/:email", verifyFBToken, verifyAdmin, updateUserRole);


export default userRouter;