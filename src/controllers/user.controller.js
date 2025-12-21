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
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = 10;
        const skip = page * limit;

        const users = await userCollection.find()
            .skip(skip)
            .limit(limit)
            .toArray();

        const total = await userCollection.estimatedDocumentCount();
        console.log(users);
        res.send({
            total,
            page,
            limit,
            data: users
        })
    } catch (error) {
        
    }
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



// update user role
export const updateUserRole = async (req, res) => {
    const email = req.params.email;
    const {role} = req.body;
    const filter = { email };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            role: role
        },
    };
    const result = await userCollection.updateOne(filter, updateDoc, options);
    res.send(result);
}
