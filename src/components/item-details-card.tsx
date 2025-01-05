import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

interface ItemDetailsCardProps {
  item: any
  onClose: () => void
}

export function ItemDetailsCard({ item, onClose }: ItemDetailsCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Item Details</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {Object.entries(item).map(([key, value]) => (
          <div key={key} className="mb-2">
            <strong>{key}: </strong>
            {String(value)}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

