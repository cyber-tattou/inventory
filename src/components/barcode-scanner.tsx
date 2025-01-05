"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

interface BarcodeScannerProps {
  onScan: (data: string) => void
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const [startScan, setStartScan] = useState(false)
  const [barcodeInput, setBarcodeInput] = useState('')
  
  // Handle hardware scanner input
  useEffect(() => {
    let timeout: NodeJS.Timeout
    const handleKeyPress = (e: KeyboardEvent) => {
      // Most barcode scanners work as keyboard input
      if (e.key !== 'Enter') {
        setBarcodeInput(prev => prev + e.key)
        // Reset after delay (barcode scanners are typically fast)
        clearTimeout(timeout)
        timeout = setTimeout(() => setBarcodeInput(''), 100)
      } else if (barcodeInput) {
        // When Enter is pressed and we have input, process the barcode
        onScan(barcodeInput)
        setBarcodeInput('')
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
      clearTimeout(timeout)
    }
  }, [barcodeInput, onScan])

  // Simulate a scan for demo purposes
  const handleScan = () => {
    // Simulating a scan
    const mockData = "123456789"
    onScan(mockData)
    setStartScan(false)
  }

  return (
    <div className="relative">
      <Button
        onClick={() => {
          setStartScan(!startScan)
          if (!startScan) {
            handleScan()
          }
        }}
        className="whitespace-nowrap"
      >
        {startScan ? 'Stop Scan' : 'Start Scan'}
      </Button>
      {startScan && (
        <div className="w-full max-w-md mx-auto p-4 border border-gray-300 rounded">
          <p>Ready to scan... (Use camera or barcode scanner)</p>
        </div>
      )}
    </div>
  )
}

