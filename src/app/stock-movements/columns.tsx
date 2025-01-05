"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type StockMovement = {
  id: string
  date: string
  type: "In" | "Out" | "Transfer"
  itemName: string
  quantity: number
  fromLocation?: string
  toLocation?: string
  reference: string
  status: "Completed" | "Pending" | "Cancelled"
  handledBy: string
}

export const columns: ColumnDef<StockMovement>[] = [
  {
    accessorKey: "itemName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Item Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "fromLocation",
    header: "From Location",
  },
  {
    accessorKey: "toLocation",
    header: "To Location",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className={`font-medium ${
          status === "Completed" ? "text-green-600" :
          status === "Pending" ? "text-yellow-600" :
          "text-red-600"
        }`}>
          {status}
        </div>
      )
    },
  },
  {
    accessorKey: "handledBy",
    header: "Handled By",
  }
]
