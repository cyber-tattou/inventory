"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { columns, Product } from "./columns";
import { withRoleCheck } from "@/components/with-role-check";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/use-toast";
import { useAuth } from "@/components/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialData: Product[] = [];

function ProductsPage() {
  const [data, setData] = useState<Product[]>(initialData);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: undefined,
    stock: undefined,
    barcode: { value: "", type: "" }
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const products = await response.json();
    setData(products);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newProduct,
        barcode: newProduct.barcode
      }),
    });
    if (response.ok) {
      const product = await response.json();
      setData([...data, product]);
      setNewProduct({ name: "", description: "", price: undefined, stock: undefined, barcode: { value: "", type: "" } });
      toast({ title: "Product added", description: `${product.name} has been added to the inventory.` });
    } else {
      toast({ title: "Error", description: "Failed to add product." });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await fetch(`/api/products`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });
    setData(data.filter(product => product.id !== id));
    toast({ title: "Product deleted", description: "Product has been removed from the inventory." });
  };

  const handleGenerateBarcode = () => {
    const generatedBarcode = `BARCODE-${Math.random().toString(36).substr(2, 9)}`;
    setNewProduct({ ...newProduct, barcode: { value: generatedBarcode, type: "EAN" } });
    toast({ title: "Barcode generated", description: `Generated barcode: ${generatedBarcode}` });
  };

  const canAddProduct = user?.role === "admin" || user?.role === "manager";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Product Inventory</h2>
      </div>

      {canAddProduct && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price !== undefined ? String(newProduct.price) : ""}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value ? parseFloat(e.target.value) : undefined })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock !== undefined ? String(newProduct.stock) : ""}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value ? parseInt(e.target.value) : undefined })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="barcode">Barcode</Label>
                  <Input
                    id="barcode"
                    value={newProduct.barcode ? newProduct.barcode.value : ""}
                    readOnly
                  />
                  <Button type="button" onClick={handleGenerateBarcode}>Generate Barcode</Button>
                </div>
              </div>
              <Button type="submit" className="w-full">Add Product</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Current Products</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}

export default withRoleCheck(ProductsPage, ["admin", "manager"]);
