import { userCollection } from "../models/user.models";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    const user = req.body;
    const { email} = user;
    if (!email) {
        return res.status(400).send({message: "Email fields is required"});
    }

    const oldUser = await userCollection.findOne({email});

    if (oldUser) {
        return res.status(409).send({message: "User already exists"});
    }

    const result = await userCollection.insertOne(user);
    res.send(result)
}