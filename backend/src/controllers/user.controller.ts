import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth.js';
import { pool } from '../database/connection.js';
import { CustomError } from '../middleware/errorHandler.js';

const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional()
});

export async function getProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(
      'SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = $1',
      [req.user!.id]
    );

    if (result.rows.length === 0) {
      throw new CustomError('User not found', 404);
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const updates = updateProfileSchema.parse(req.body);

    if (Object.keys(updates).length === 0) {
      throw new CustomError('No fields to update', 400);
    }

    const setClause = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = [req.user!.id, ...Object.values(updates)];

    const result = await pool.query(
      `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING id, email, name, role, updated_at`,
      values
    );

    res.json({ user: result.rows[0] });
  } catch (error) {
    next(error);
  }
}

export async function deleteAccount(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [req.user!.id]);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
}

