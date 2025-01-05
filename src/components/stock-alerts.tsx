import { AlertCircle } from 'lucide-react'

const alerts = [
  { item: "Laptop", sku: "TECH001", currentStock: 5, minStock: 10 },
  { item: "Smartphone", sku: "TECH002", currentStock: 3, minStock: 15 },
  { item: "Headphones", sku: "TECH003", currentStock: 2, minStock: 20 },
]

export function StockAlerts() {
  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <div key={index} className="flex items-center space-x-4">
          <AlertCircle className="h-6 w-6 text-red-500" />
          <div>
            <p className="font-semibold">{alert.item} (SKU: {alert.sku})</p>
            <p className="text-sm text-muted-foreground">
              Current stock: {alert.currentStock} (Min: {alert.minStock})
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

