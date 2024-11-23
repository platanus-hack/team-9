import Link from "next/link"
import { Home, CreditCard, Users, Settings, HelpCircle, LogOut } from 'lucide-react'

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Transactions", href: "/transactions", icon: CreditCard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-gray-800">
      <div className="flex h-16 items-center justify-center">
        <h1 className="text-2xl font-bold text-white">PayDash</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center rounded-lg px-2 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <item.icon className="mr-4 h-6 w-6" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="border-t border-gray-700 p-4">
        <Link
          href="#"
          className="flex items-center rounded-lg px-2 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <HelpCircle className="mr-4 h-6 w-6" />
          Help & Support
        </Link>
        <Link
          href="#"
          className="flex items-center rounded-lg px-2 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <LogOut className="mr-4 h-6 w-6" />
          Log out
        </Link>
      </div>
    </div>
  )
}

