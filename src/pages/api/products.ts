export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  barcode: { 
    value: string; 
    type: string; 
  }; 
};
import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';

// CRUD operations for products
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const db = await getDb(); // Ensure we await the database connection

    switch (req.method) {
        case 'GET':
            const products = await db.all('SELECT * FROM products'); // Ensure db.all is called on the correct db object
            res.status(200).json(products);
            break;
        case 'POST':
            const { name, description, price, stock } = req.body;
            const result = await db.run('INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)', [name, description, price, stock]);
            res.status(201).json({ id: result.lastID, name, description, price, stock });
            break;
        case 'PUT':
            const { id, updateData } = req.body;
            await db.run('UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?', [updateData.name, updateData.description, updateData.price, updateData.stock, id]);
            res.status(200).json({ message: 'Product updated' });
            break;
        case 'DELETE':
            const { productId } = req.body;
            await db.run('DELETE FROM products WHERE id = ?', [productId]);
            res.status(200).json({ message: 'Product deleted' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
