"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview-chart"
import { RecentSales } from "@/components/recent-sales"
import { InventoryOverview } from "@/components/inventory-overview"
import { StockAlerts } from "@/components/stock-alerts"
import Link from "next/link"

// Define interface for inventory item
interface InventoryItem {
  id: string
  name: string
  price: number
  quantity: number
  status: string
}

// Define interface for dashboard metrics
interface DashboardMetrics {
  totalRevenue: number
  totalOrders: number
  activeCustomers: number
  inventoryValue: number
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardMetrics>({
    totalRevenue: 0,
    totalOrders: 0,
    activeCustomers: 0,
    inventoryValue: 0
  })

  useEffect(() => {
    const calculateDashboardMetrics = async () => {
      try {
        const response = await fetch("/api/inventory")
        const inventory: InventoryItem[] = await response.json()
        
        const metrics: DashboardMetrics = {
          totalRevenue: inventory.reduce((sum: number, item: InventoryItem) => 
            sum + (item.price * item.quantity), 0),
          totalOrders: inventory.filter((item: InventoryItem) => 
            item.status === "Low Stock").length,
          activeCustomers: Math.floor(inventory.reduce((sum: number, item: InventoryItem) => 
            sum + item.quantity, 0) / 10),
          inventoryValue: inventory.reduce((sum: number, item: InventoryItem) => 
            sum + (item.price * item.quantity), 0)
        }

        setDashboardData(metrics)
      } catch (error) {
        console.error('Error fetching inventory data:', error)
      }
    }

    calculateDashboardMetrics()
  }, [])

  if (!user) return null

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <InventoryOverview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <StockAlerts />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

