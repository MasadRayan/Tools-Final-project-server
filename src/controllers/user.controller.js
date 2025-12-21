import { userCollection } from "../models/user.models.js";
import { ObjectId } from "mongodb";


// create user
export const createUser = async (req, res) => {
    const email = req.body.email;
    const userExists = await userCollection.findOne({ email })
    if (userExists) {
        return res.status(200).send({ message: "User already exists", inserted: false });
    }
    const user = req.body
    const result = await userCollection.insertOne(user);
    res.send(result)
}

// get all users
export const getAllUsers = async (req, res) => {
    const result = await userCollection.find().toArray();
    res.send(result)
}


// get user role
export const getUserRole = async (req, res) => {
    const email = req.params.email; 
    try {
        const user = await userCollection.findOne(
            { email },
            { projection: { role: 1, _id: 0 } }
        );

        res.json({ role: user?.role || "user" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
