import { userCollection } from "../models/user.models.js";
import { ObjectId } from "mongodb";


// create user
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

// get all users
export const getAllUsers = async (req, res) => {
    const result = await userCollection.find().toArray();
    res.send(result)
}