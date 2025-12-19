import { usersCollections } from "../models/user.models.js";

export const verifyTeacher = async (req, res, next) => {
    const email = req.decoded.email;
    const query = { email }
    const user = await usersCollections.findOne(query);
    if (!user || user.role !== 'teacher') {
        return res.status(403).send({ message: "Forbiddem Access" });
    }
    next();
}