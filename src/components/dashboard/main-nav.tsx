import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Leads",
    href: "/dashboard/leads",
  },
  {
    title: "Agents",
    href: "/dashboard/agents",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-blue-600",
            pathname === item.href
              ? "text-blue-600"
              : "text-gray-700 hover:text-blue-600"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
} 