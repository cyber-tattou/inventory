import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';

// CRUD operations for stock movements
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await getDb();

  switch (req.method) {
    case 'GET':
      const movements = await db.all('SELECT * FROM stock_movements');
      res.status(200).json(movements);
      break;
    case 'POST':
      const { date, type, itemName, quantity, fromLocation, toLocation, reference, status, handledBy } = req.body;
      const result = await db.run('INSERT INTO stock_movements (date, type, itemName, quantity, fromLocation, toLocation, reference, status, handledBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [date, type, itemName, quantity, fromLocation, toLocation, reference, status, handledBy]);
      res.status(201).json({ id: result.lastID, date, type, itemName, quantity, fromLocation, toLocation, reference, status, handledBy });
      break;
    case 'PUT':
      const { id, updateData } = req.body;
      await db.run('UPDATE stock_movements SET date = ?, type = ?, itemName = ?, quantity = ?, fromLocation = ?, toLocation = ?, reference = ?, status = ?, handledBy = ? WHERE id = ?', [updateData.date, updateData.type, updateData.itemName, updateData.quantity, updateData.fromLocation, updateData.toLocation, updateData.reference, updateData.status, updateData.handledBy, id]);
      res.status(200).json({ message: 'Stock movement updated' });
      break;
    case 'DELETE':
      const { movementId } = req.body;
      await db.run('DELETE FROM stock_movements WHERE id = ?', [movementId]);
      res.status(200).json({ message: 'Stock movement deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
