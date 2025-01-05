const columns: ColumnDef<StockMovement>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "productId",
    header: "Product",
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
    header: "From",
  },
  {
    accessorKey: "toLocation",
    header: "To",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: ({ row }) => {
      return format(new Date(row.getValue("timestamp")), "PPp")
    },
  },
]

<DataTable 
  columns={columns} 
  data={data} 
  filterColumn="productId"
/> 