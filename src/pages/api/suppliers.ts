import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';

// CRUD operations for suppliers
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await getDb();

  switch (req.method) {
    case 'GET':
      const suppliers = await db.all('SELECT * FROM suppliers');
      res.status(200).json(suppliers);
      break;
    case 'POST':
      const { name, contact, email, phone, address } = req.body;
      const result = await db.run('INSERT INTO suppliers (name, contact, email, phone, address) VALUES (?, ?, ?, ?, ?)', [name, contact, email, phone, address]);
      res.status(201).json({ id: result.lastID, name, contact, email, phone, address });
      break;
    case 'PUT':
      const { id, updateData } = req.body;
      await db.run('UPDATE suppliers SET name = ?, contact = ?, email = ?, phone = ?, address = ? WHERE id = ?', [updateData.name, updateData.contact, updateData.email, updateData.phone, updateData.address, id]);
      res.status(200).json({ message: 'Supplier updated' });
      break;
    case 'DELETE':
      const { supplierId } = req.body;
      await db.run('DELETE FROM suppliers WHERE id = ?', [supplierId]);
      res.status(200).json({ message: 'Supplier deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
