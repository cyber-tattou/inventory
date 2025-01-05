import { storage } from './local-storage'

export const getDb = async () => {
  // In development, use SQLite
  if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
    const { open } = await import('sqlite')
    const sqlite3 = await import('sqlite3')
    return open({
      filename: 'database.sqlite',
      driver: sqlite3.default.Database
    })
  }
  
  // In production, use localStorage
  return {
    all: async (query: string) => {
      const table = query.toLowerCase().includes('from products') ? 'inventory-data' :
                   query.toLowerCase().includes('from suppliers') ? 'suppliers-data' :
                   query.toLowerCase().includes('from stock_movements') ? 'stock-movements-data' : null
      
      if (!table) throw new Error('Unknown table')
      return storage.get(table, [])
    },
    run: async (query: string, params: any[]) => {
      // Handle inserts and updates using localStorage
      // This is a simplified version - you'd want to parse the query properly
      const table = query.toLowerCase().includes('into products') ? 'inventory-data' :
                   query.toLowerCase().includes('into suppliers') ? 'suppliers-data' :
                   query.toLowerCase().includes('into stock_movements') ? 'stock-movements-data' : null
      
      if (!table) throw new Error('Unknown table')
      const currentData = storage.get(table, [])
      // ... handle the query and update localStorage
    }
  }
}

export const getStockMovementsSchema = async () => {
  const db = await getDb();
  const schema = await db.all("PRAGMA table_info(stock_movements);");
  console.log(schema);
  return schema;
};
