"use client"

import { useState } from 'react'
import { withRoleCheck } from "@/components/with-role-check"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { Invoice as InvoiceComponent } from "@/components/invoice"
import { columns, Invoice } from "./columns"

const initialInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    customerName: "Acme Corp",
    date: "2023-05-01",
    amount: 1000.00,
    status: "Paid"
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    customerName: "TechStart Inc",
    date: "2023-05-05",
    amount: 1500.00,
    status: "Pending"
  },
  // Add more sample invoices as needed
]

function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const handleCreateInvoice = () => {
    // This would typically open a form to create a new invoice
    console.log("Create new invoice")
  }

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-5">Invoices</h1>
      <Button onClick={handleCreateInvoice} className="mb-4">Create New Invoice</Button>
      <DataTable 
        columns={columns} 
        data={invoices}
        filterColumn="customerName"
        onView={handleViewInvoice}
      />
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-h-[90vh] overflow-y-auto">
            <InvoiceComponent
              invoiceNumber={selectedInvoice.invoiceNumber}
              date={selectedInvoice.date}
              dueDate="2023-05-15" // This should be dynamic in a real app
              customerName={selectedInvoice.customerName}
              customerAddress="123 Business St, City, Country" // This should be dynamic
              items={[
                { description: "Product A", quantity: 2, unitPrice: 100, total: 200 },
                { description: "Service B", quantity: 1, unitPrice: 800, total: 800 }
              ]}
              subtotal={1000}
              tax={0}
              total={selectedInvoice.amount}
            />
            <Button onClick={() => setSelectedInvoice(null)} className="mt-4">Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default withRoleCheck(InvoicesPage, ["admin", "manager"])

