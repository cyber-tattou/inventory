"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { columns, StockMovement } from "./columns";
import { withRoleCheck } from "@/components/with-role-check";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/use-toast";
import { useAuth } from "@/components/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { storage } from '@/lib/local-storage'

const initialData: StockMovement[] = [
  {
    id: "1",
    date: "2024-03-15",
    type: "In",
    itemName: "Laptop",
    quantity: 25,
    fromLocation: "Supplier Warehouse",
    toLocation: "Warehouse A",
    reference: "PO-2024-001",
    status: "Completed",
    handledBy: "John Smith"
  },
  {
    id: "2",
    date: "2024-03-14",
    type: "Out",
    itemName: "Smartphone",
    quantity: 10,
    fromLocation: "Warehouse B",
    toLocation: "Store 123",
    reference: "SO-2024-045",
    status: "Completed",
    handledBy: "Sarah Johnson"
  },
  {
    id: "3",
    date: "2024-03-14",
    type: "Transfer",
    itemName: "Headphones",
    quantity: 50,
    fromLocation: "Warehouse A",
    toLocation: "Warehouse B",
    reference: "TR-2024-012",
    status: "Pending",
    handledBy: "Mike Wilson"
  }
];

const STORAGE_KEY = 'stock-movements-data'

function StockMovementsPage() {
  const [data, setData] = useState<StockMovement[]>(() => 
    storage.get(STORAGE_KEY, initialData)
  )

  useEffect(() => {
    storage.set(STORAGE_KEY, data)
  }, [data])

  const [newMovement, setNewMovement] = useState<Partial<StockMovement>>({
    type: "In",
    status: "Pending"
  });
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAddMovement = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/stock-movements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovement),
    });
    const movement = await response.json();
    setData([...data, movement]);
    setNewMovement({ type: "In", status: "Pending" });
    toast({ title: "Movement recorded", description: `Stock movement has been recorded successfully.` });
  };

  const handleDeleteMovement = async (id: string) => {
    await fetch(`/api/stock-movements`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movementId: id }),
    });
    setData(data.filter(movement => movement.id !== id));
    toast({ title: "Movement deleted", description: "Stock movement has been removed." });
  };

  const canAddMovement = user?.role === "admin" || user?.role === "manager" || user?.role === "warehouse";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Stock Movements</h2>
      </div>

      {canAddMovement && (
        <Card>
          <CardHeader>
            <CardTitle>Record Stock Movement</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMovement} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Movement Type</Label>
                  <Select
                    value={newMovement.type}
                    onValueChange={(value) => setNewMovement({ ...newMovement, type: value as "In" | "Out" | "Transfer" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In">In</SelectItem>
                      <SelectItem value="Out">Out</SelectItem>
                      <SelectItem value="Transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input
                    id="itemName"
                    value={newMovement.itemName}
                    onChange={(e) => setNewMovement({ ...newMovement, itemName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newMovement.quantity}
                    onChange={(e) => setNewMovement({ ...newMovement, quantity: parseInt(e.target.value) })}
                    required
                  />
                </div>
                {(newMovement.type === "Out" || newMovement.type === "Transfer") && (
                  <div className="space-y-2">
                    <Label htmlFor="fromLocation">From Location</Label>
                    <Input
                      id="fromLocation"
                      value={newMovement.fromLocation}
                      onChange={(e) => setNewMovement({ ...newMovement, fromLocation: e.target.value })}
                      required
                    />
                  </div>
                )}
                {(newMovement.type === "In" || newMovement.type === "Transfer") && (
                  <div className="space-y-2">
                    <Label htmlFor="toLocation">To Location</Label>
                    <Input
                      id="toLocation"
                      value={newMovement.toLocation}
                      onChange={(e) => setNewMovement({ ...newMovement, toLocation: e.target.value })}
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    id="reference"
                    value={newMovement.reference}
                    onChange={(e) => setNewMovement({ ...newMovement, reference: e.target.value })}
                    placeholder="Auto-generated if left empty"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newMovement.status}
                    onValueChange={(value) => setNewMovement({ ...newMovement, status: value as "Completed" | "Pending" | "Cancelled" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">Record Movement</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Movement History</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={data} 
            filterColumn="itemName"
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default withRoleCheck(StockMovementsPage, ["admin", "manager", "warehouse"]);
