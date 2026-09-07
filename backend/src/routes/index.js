import { Router } from 'express';
import leadsRoutes from './leadsRoutes.js';
import enrollmentsRoutes from './enrollmentsRoutes.js';

const router = Router();

router.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
router.use('/leads', leadsRoutes);
router.use('/enrollments', enrollmentsRoutes);

export default router;
