import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth.js';
import { pool } from '../database/connection.js';
import { CustomError } from '../middleware/errorHandler.js';

const createDataSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

const updateDataSchema = createDataSchema.partial();

export async function getData(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      'SELECT id, title, content, metadata, user_id, created_at, updated_at FROM data WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [req.user!.id, limit, offset]
    );

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM data WHERE user_id = $1',
      [req.user!.id]
    );

    res.json({
      data: result.rows,
      pagination: {
        page,
        limit,
        total: parseInt(countResult.rows[0].count),
        totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
      }
    });
  } catch (error) {
    next(error);
  }
}

export async function getDataById(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(
      'SELECT id, title, content, metadata, user_id, created_at, updated_at FROM data WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user!.id]
    );

    if (result.rows.length === 0) {
      throw new CustomError('Data not found', 404);
    }

    res.json({ data: result.rows[0] });
  } catch (error) {
    next(error);
  }
}

export async function createData(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { title, content, metadata } = createDataSchema.parse(req.body);

    const result = await pool.query(
      'INSERT INTO data (title, content, metadata, user_id) VALUES ($1, $2, $3, $4) RETURNING id, title, content, metadata, user_id, created_at',
      [title, content, JSON.stringify(metadata || {}), req.user!.id]
    );

    res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    next(error);
  }
}

export async function updateData(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const updates = updateDataSchema.parse(req.body);

    if (Object.keys(updates).length === 0) {
      throw new CustomError('No fields to update', 400);
    }

    const setClause = Object.keys(updates).map((key, index) => {
      if (key === 'metadata') {
        return `metadata = $${index + 2}::jsonb`;
      }
      return `${key} = $${index + 2}`;
    }).join(', ');

    const values = [req.params.id, req.user!.id, ...Object.values(updates).map(v => 
      typeof v === 'object' ? JSON.stringify(v) : v
    )];

    const result = await pool.query(
      `UPDATE data SET ${setClause}, updated_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING id, title, content, metadata, updated_at`,
      values
    );

    if (result.rows.length === 0) {
      throw new CustomError('Data not found', 404);
    }

    res.json({ data: result.rows[0] });
  } catch (error) {
    next(error);
  }
}

export async function deleteData(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(
      'DELETE FROM data WHERE id = $1 AND user_id = $2 RETURNING id',
      [req.params.id, req.user!.id]
    );

    if (result.rows.length === 0) {
      throw new CustomError('Data not found', 404);
    }

    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    next(error);
  }
}

