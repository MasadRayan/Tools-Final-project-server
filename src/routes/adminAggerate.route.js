import express from 'express';
import { getAdminDashboardData } from '../controllers/aggregateAdmin.controller.js';
import { verifyFBToken } from '../middlewares/verifyFBToken.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.js';
const adminAggerateRouter = express.Router();

adminAggerateRouter.get('/aggregate-data', verifyFBToken, verifyAdmin, getAdminDashboardData)

export default adminAggerateRouter


