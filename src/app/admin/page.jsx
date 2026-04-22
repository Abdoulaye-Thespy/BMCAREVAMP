"use client"

import { Card } from "@/components/ui/card"
import { BarChart3, BookOpen, Package, Users } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Chapters",
      value: "13",
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Convention Packages",
      value: "15",
      icon: Package,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Active Users",
      value: "245",
      icon: Users,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Analytics",
      value: "98%",
      icon: BarChart3,
      color: "bg-purple-50 text-purple-600",
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your BMCA organization efficiently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Chapter information updated</span>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">New package created</span>
              <span className="text-xs text-gray-500">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">User registered</span>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 text-left bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
              + Add New Chapter
            </button>
            <button className="w-full px-4 py-2 text-left bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors">
              + Create Package
            </button>
            <button className="w-full px-4 py-2 text-left bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors">
              + Register User
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
