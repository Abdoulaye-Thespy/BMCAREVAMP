"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { BarChart3, BookOpen, Package, Users, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Check if user is admin
  if (session?.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-2">Access Denied</div>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

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
    <div className="min-h-screen bg-gray-50">
      {/* Header with logout button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 text-sm mt-1">
              Welcome back, {session.user.name || session.user.email}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
          <p className="text-gray-600 mt-1">Manage your BMCA organization efficiently</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="p-6 hover:shadow-lg transition-shadow">
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
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">User registered</span>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">New order received</span>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 text-left bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors font-medium">
                + Add New Chapter
              </button>
              <button className="w-full px-4 py-3 text-left bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors font-medium">
                + Create Package
              </button>
              <button className="w-full px-4 py-3 text-left bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors font-medium">
                + Register User
              </button>
              <button className="w-full px-4 py-3 text-left bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg transition-colors font-medium">
                View All Orders
              </button>
            </div>
          </Card>
        </div>

        {/* User Info Card (Optional - shows current admin) */}
        <div className="mt-8">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Current Session</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {(session.user.name?.[0] || session.user.email?.[0] || "A").toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{session.user.name || "Admin User"}</p>
                <p className="text-sm text-gray-600">{session.user.email}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}