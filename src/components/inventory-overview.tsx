"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { category: "Electronics", count: 120 },
  { category: "Clothing", count: 80 },
  { category: "Books", count: 60 },
  { category: "Home & Garden", count: 40 },
  { category: "Toys", count: 30 },
]

export function InventoryOverview() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

