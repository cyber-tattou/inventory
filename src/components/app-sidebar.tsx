"use client"

import { Home, Package, Users, TrendingUp, BarChart2, Settings, LogOut, FileText } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from "@/components/auth-provider"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from '@/components/theme-toggle'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard', roles: ["admin", "manager", "warehouse"] },
  { icon: Package, label: 'Inventory', href: '/inventory', roles: ["admin", "manager", "warehouse"] },
  { icon: Users, label: 'Suppliers', href: '/suppliers', roles: ["admin", "manager"] },
  { icon: TrendingUp, label: 'Stock Movements', href: '/stock-movements', roles: ["admin", "manager", "warehouse"] },
  { icon: BarChart2, label: 'Reports', href: '/reports', roles: ["admin", "manager"] },
  { icon: FileText, label: 'Invoices', href: '/billing/invoices', roles: ["admin", "manager"] },
  { icon: Settings, label: 'Settings', href: '/settings', roles: ["admin"] },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(true)

  if (!user) return null

  const excludedRoutes = ['/login', '/register', '/documentation', '/']
  if (pathname && excludedRoutes.includes(pathname)) return null

  return (
    <div 
      className={cn(
        "relative h-full bg-background border-r pt-16 flex flex-col transition-all duration-300",
        isCollapsed ? "w-[60px] hover:w-60" : "w-60"
      )}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <nav className="space-y-2 px-2">
        {navItems.filter(item => item.roles.includes(user.role)).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
              pathname === item.href 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted",
              isCollapsed && "justify-center"
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span className={cn(
              "transition-all duration-300",
              isCollapsed ? "opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto" : "opacity-100"
            )}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="px-2 mt-auto space-y-2 mb-4">
        <div className={cn(
          "flex items-center justify-center",
          !isCollapsed && "justify-start px-3"
        )}>
          <ThemeToggle />
        </div>
        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-muted transition-colors text-red-500 hover:text-red-600",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span className={cn(
            "transition-all duration-300",
            isCollapsed ? "opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto" : "opacity-100"
          )}>
            Logout
          </span>
        </button>
      </div>
    </div>
  )
}
