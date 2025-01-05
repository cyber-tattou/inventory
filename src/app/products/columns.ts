"use client"

import { ColumnDef } from "@tanstack/react-table";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  barcode: { 
    value: string; 
    type: string; 
  }; 
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
  },
];
