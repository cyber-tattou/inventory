"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"

interface MermaidDiagramProps {
  chart: string
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit',
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
      },
      themeVariables: {
        fontFamily: 'inherit',
        primaryColor: '#4f46e5',
        primaryTextColor: '#1f2937',
        primaryBorderColor: '#4f46e5',
        lineColor: '#4b5563',
        secondaryColor: '#4f46e5',
        tertiaryColor: '#4f46e5',
      }
    })

    const renderDiagram = async () => {
      if (containerRef.current) {
        try {
          containerRef.current.innerHTML = ''
          const id = 'mermaid-' + Math.random().toString(36).substr(2, 9)
          const svg = await mermaid.render(id, chart)
          containerRef.current.innerHTML = svg
        } catch (error) {
          console.error("Mermaid rendering error:", error)
          if (containerRef.current) {
            containerRef.current.innerHTML = `<div class="text-red-500 p-4">Failed to render diagram: ${error}</div>`
          }
        }
      }
    }

    renderDiagram()
  }, [chart])

  return (
    <div 
      ref={containerRef} 
      className="w-full min-h-[200px] overflow-x-auto bg-card p-4 rounded-lg border my-4"
    />
  )
}
