import express from 'express';
import { userAggregateData } from '../controllers/aggregateUser.controller.js';
const userAggregateDataRouter = express.Router();


userAggregateDataRouter.get("/aggregate/:email", userAggregateData)



export default userAggregateDataRouter