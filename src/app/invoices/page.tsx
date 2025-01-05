"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { columns, Invoice } from "./columns";
import { withRoleCheck } from "@/components/with-role-check";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/use-toast";
import { useAuth } from "@/components/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialData: Invoice[] = [];

function InvoicesPage() {
  const [data, setData] = useState<Invoice[]>(initialData);
  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({
    date: "",
    customerName: "",
    amount: 0,
    status: "Pending"
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const response = await fetch("/api/invoices");
    const invoices = await response.json();
    setData(invoices);
  };

  const handleAddInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInvoice),
    });
    const invoice = await response.json();
    setData([...data, invoice]);
    setNewInvoice({ date: "", customerName: "", amount: 0, status: "Pending" });
    toast({ title: "Invoice created", description: `Invoice for ${invoice.customerName} has been created.` });
  };

  const handleDeleteInvoice = async (id: string) => {
    await fetch(`/api/invoices`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invoiceId: id }),
    });
    setData(data.filter(invoice => invoice.id !== id));
    toast({ title: "Invoice deleted", description: "Invoice has been removed." });
  };

  const canAddInvoice = user?.role === "admin" || user?.role === "manager";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
      </div>

      {canAddInvoice && (
        <Card>
          <CardHeader>
            <CardTitle>Create Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddInvoice} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newInvoice.date}
                    onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={newInvoice.customerName}
                    onChange={(e) => setNewInvoice({ ...newInvoice, customerName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({ ...newInvoice, amount: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    value={newInvoice.status}
                    onChange={(e) => setNewInvoice({ ...newInvoice, status: e.target.value })}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">Create Invoice</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}

export default withRoleCheck(InvoicesPage, ["admin", "manager"]);
