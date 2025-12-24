import express from 'express';
import { getAdminDashboardData } from '../controllers/aggregateAdmin.controller';
const adminAggerateRouter = express.Router();

adminAggerateRouter.get('/aggregate-data', getAdminDashboardData)

export default adminAggerateRouter


