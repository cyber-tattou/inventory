import { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const db = await getDb();
    
    // Get all inventory items
    const inventory = await db.all('SELECT * FROM inventory');
    
    // Calculate metrics
    const metrics = {
      totalRevenue: inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      totalOrders: inventory.filter(item => item.status === "Low Stock").length,
      activeCustomers: Math.floor(inventory.reduce((sum, item) => sum + item.quantity, 0) / 10),
      inventoryValue: inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      recentSales: [
        {
          name: "Olivia Martin",
          email: "olivia.martin@email.com",
          amount: "+$1,999.00"
        },
        // ... more recent sales data
      ]
    };

    res.status(200).json(metrics);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
} 