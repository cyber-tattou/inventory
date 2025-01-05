import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface InvoiceProps {
  invoiceNumber: string
  date: string
  dueDate: string
  customerName: string
  customerAddress: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
}

export function Invoice({
  invoiceNumber,
  date,
  dueDate,
  customerName,
  customerAddress,
  items,
  subtotal,
  tax,
  total
}: InvoiceProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Invoice #{invoiceNumber}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold">Bill To:</h3>
            <p>{customerName}</p>
            <p>{customerAddress}</p>
          </div>
          <div className="text-right">
            <p><span className="font-semibold">Date:</span> {date}</p>
            <p><span className="font-semibold">Due Date:</span> {dueDate}</p>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 text-right">
          <p><span className="font-semibold">Subtotal:</span> ${subtotal.toFixed(2)}</p>
          <p><span className="font-semibold">Tax:</span> ${tax.toFixed(2)}</p>
          <p className="text-lg font-bold"><span>Total:</span> ${total.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  )
}

