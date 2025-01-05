import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';
import { Database } from 'sqlite';

// CRUD operations for stock movements
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await getDb();

    switch (req.method) {
      case 'GET':
        const movements = await db.all('SELECT * FROM stock_movements');
        res.status(200).json(movements);
        break;
      case 'POST':
        const { type, itemId, quantity, fromLocation, toLocation, notes } = req.body;
        const result = await db.run(
          'INSERT INTO stock_movements (type, item_id, quantity, from_location, to_location, notes, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [type, itemId, quantity, fromLocation, toLocation, notes, new Date().toISOString()]
        );
        res.status(201).json({ 
          id: result?.lastID, 
          message: 'Stock movement created' 
        });
        break;
      case 'PUT':
        const { movementId, ...updateData } = req.body;
        await db.run(
          'UPDATE stock_movements SET type = ?, item_id = ?, quantity = ?, from_location = ?, to_location = ?, notes = ? WHERE id = ?',
          [updateData.type, updateData.itemId, updateData.quantity, updateData.fromLocation, updateData.toLocation, updateData.notes, movementId]
        );
        res.status(200).json({ message: 'Stock movement updated' });
        break;
      case 'DELETE':
        const { id } = req.body;
        await db.run('DELETE FROM stock_movements WHERE id = ?', [id]);
        res.status(200).json({ message: 'Stock movement deleted' });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Stock movements API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
