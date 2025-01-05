import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">Welcome to IP - Inventory Prototype</h1>
          <p className="text-xl text-muted-foreground">A modern, efficient, and user-friendly inventory management system</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
              <CardDescription>Core functionalities of our system</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  'Real-time inventory tracking',
                  'Stock movement management',
                  'Supplier management',
                  'Role-based access control',
                  'Barcode scanning support',
                  'Dark/Light theme support'
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Roles & Demo Access</CardTitle>
              <CardDescription>Access levels and demo credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Admin</h3>
                  <p className="text-sm text-muted-foreground">Full access to all features, user management, and system configuration</p>
                  <p className="text-sm mt-1">Username: admin / Password: admin123</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Manager</h3>
                  <p className="text-sm text-muted-foreground">Access to inventory management, reports, and supplier management</p>
                  <p className="text-sm mt-1">Username: manager / Password: manager123</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Warehouse</h3>
                  <p className="text-sm text-muted-foreground">Basic inventory operations, stock movements, and barcode scanning</p>
                  <p className="text-sm mt-1">Username: warehouse / Password: warehouse123</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <Button asChild size="lg">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/register">Register</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/documentation">View Documentation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
