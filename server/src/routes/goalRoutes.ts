import express, { Request, Response } from 'express';
import initDB from '../createTable';

const router = express.Router();

// Get all goals
router.get('/goals', async (req: Request, res: Response) => {
  const db = await initDB();
  const goals = await db.all('SELECT * FROM goals');
  res.json(goals);
});

// Add a new goal
router.post('/goals', async (req: Request, res: Response) => {
  const { title, isCompleted } = req.body;
  const db = await initDB();
  const id = new Date().toISOString(); // Simple ID generator using timestamp
  await db.run('INSERT INTO goals (id, title, isCompleted) VALUES (?, ?, ?, ?)', [
    id, title, isCompleted ? 1 : 0,
  ]);
  res.status(201).json({ id, title, isCompleted });
});

// Update goal completion status
router.put('/goals/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  const db = await initDB();
  await db.run('UPDATE goals SET isCompleted = ? WHERE id = ?', [isCompleted ? 1 : 0, id]);
  res.status(200).json({ message: 'Goal updated' });
});

// Delete a goal
router.delete('/goals/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await initDB();
  await db.run('DELETE FROM goals WHERE id = ?', [id]);
  res.status(200).json({ message: 'Goal deleted' });
});

export default router;