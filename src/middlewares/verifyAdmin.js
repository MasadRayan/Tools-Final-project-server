import { userCollection } from "../models/user.models.js";

export const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    const query = { email }
    const user = await userCollection.findOne(query);
    if (!user || user.role !== 'admin') {
        return res.status(403).send({ message: "Forbiddem Access" });
    }
    next();
}