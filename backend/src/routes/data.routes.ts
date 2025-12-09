import { Router } from 'express';
import {
  getData,
  createData,
  updateData,
  deleteData,
  getDataById
} from '../controllers/data.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getData);
router.get('/:id', getDataById);
router.post('/', createData);
router.put('/:id', updateData);
router.delete('/:id', deleteData);

export default router;

