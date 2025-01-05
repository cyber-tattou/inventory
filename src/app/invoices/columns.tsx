"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Invoice = {
  id: string
  invoiceNumber: string
  customerName: string
  date: string
  amount: number
  status: "Paid" | "Pending" | "Cancelled"
}

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "Invoice #"
  },
  {
    accessorKey: "customerName",
    header: "Customer"
  },
  {
    accessorKey: "date",
    header: "Date"
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount)
    }
  },
  {
    accessorKey: "status",
    header: "Status"
  }
] 