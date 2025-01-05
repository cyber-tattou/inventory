import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';

// CRUD operations for invoices
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await getDb();

  switch (req.method) {
    case 'GET':
      const invoices = await db.all('SELECT * FROM invoices');
      res.status(200).json(invoices);
      break;
    case 'POST':
      const { date, customerName, amount, status } = req.body;
      const result = await db.run('INSERT INTO invoices (date, customerName, amount, status) VALUES (?, ?, ?, ?)', [date, customerName, amount, status]);
      res.status(201).json({ id: result.lastID, date, customerName, amount, status });
      break;
    case 'PUT':
      const { id, updateData } = req.body;
      await db.run('UPDATE invoices SET date = ?, customerName = ?, amount = ?, status = ? WHERE id = ?', [updateData.date, updateData.customerName, updateData.amount, updateData.status, id]);
      res.status(200).json({ message: 'Invoice updated' });
      break;
    case 'DELETE':
      const { invoiceId } = req.body;
      await db.run('DELETE FROM invoices WHERE id = ?', [invoiceId]);
      res.status(200).json({ message: 'Invoice deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
