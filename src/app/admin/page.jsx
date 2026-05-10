"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { BookOpen, Package, ShoppingCart, Users, LogOut, Clock } from "lucide-react"
import { signOut } from "next-auth/react"
import { getChapters } from "@/app/actions/chapter-actions"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState({
    totalChapters: 0,
    totalPackages: 0,
    totalOrders: 0,
    totalKiteuh: 0,
    pendingKiteuh: 0,
    loading: true
  })

  // Fetch all data
  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetchDashboardData()
    }
  }, [session])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const fetchDashboardData = async () => {
    setDashboardData(prev => ({ ...prev, loading: true }))
    
    try {
      // Fetch chapters using server action
      const chaptersResult = await getChapters()
      const totalChapters = chaptersResult.success ? chaptersResult.data.length : 0
      
      // Fetch packages from API
      const packagesRes = await fetch('/api/packages')
      const packages = await packagesRes.json()
      const totalPackages = Array.isArray(packages) ? packages.length : 0
      
      // Fetch orders from API
      const ordersRes = await fetch('/api/admin/orders')
      const orders = await ordersRes.json()
      const totalOrders = Array.isArray(orders) ? orders.length : 0
      
      // Fetch kiteuh applications from API
      const kiteuhRes = await fetch('/api/kiteuh?status=all')
      const kiteuhApplications = await kiteuhRes.json()
      const totalKiteuh = Array.isArray(kiteuhApplications) ? kiteuhApplications.length : 0
      const pendingKiteuh = Array.isArray(kiteuhApplications) 
        ? kiteuhApplications.filter(app => app.status === "PENDING").length 
        : 0
      
      setDashboardData({
        totalChapters,
        totalPackages,
        totalOrders,
        totalKiteuh,
        pendingKiteuh,
        loading: false
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setDashboardData(prev => ({ ...prev, loading: false }))
    }
  }

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F5A623] mx-auto"></div>
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

  const statsCards = [
    {
      title: "Total Chapters",
      value: dashboardData.totalChapters,
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600",
      link: "/admin/chapters"
    },
    {
      title: "Convention Packages",
      value: dashboardData.totalPackages,
      icon: Package,
      color: "bg-green-50 text-green-600",
      link: "/admin/packages"
    },
    {
      title: "Total Orders",
      value: dashboardData.totalOrders,
      icon: ShoppingCart,
      color: "bg-purple-50 text-purple-600",
      link: "/admin/orders"
    },
    {
      title: "Kiteuh Applications",
      value: dashboardData.totalKiteuh,
      icon: Users,
      color: "bg-orange-50 text-orange-600",
      link: "/admin/kiteuhusers"
    },
    {
      title: "Pending Kiteuh",
      value: dashboardData.pendingKiteuh,
      icon: Clock,
      color: "bg-yellow-50 text-yellow-600",
      link: "/admin/kiteuhusers?status=PENDING"
    },
  ]

  if (dashboardData.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F5A623] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

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
          <div className="flex gap-3">
            <button
              onClick={fetchDashboardData}
              className="flex items-center gap-2 px-4 py-2 text-[#F5A623] hover:bg-orange-50 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
          <p className="text-gray-600 mt-1">Manage your BMCA organization efficiently</p>
        </div>

        {/* Statistics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {statsCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Card 
                key={stat.title} 
                className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-[#F5A623] cursor-pointer"
                onClick={() => router.push(stat.link)}
              >
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

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button 
                onClick={() => router.push('/admin/chapters')}
                className="px-4 py-3 text-left bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors font-medium"
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Manage Chapters
              </button>
              <button 
                onClick={() => router.push('/admin/packages')}
                className="px-4 py-3 text-left bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors font-medium"
              >
                <Package className="w-4 h-4 inline mr-2" />
                Manage Packages
              </button>
              <button 
                onClick={() => router.push('/admin/orders')}
                className="px-4 py-3 text-left bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors font-medium"
              >
                <ShoppingCart className="w-4 h-4 inline mr-2" />
                View All Orders
              </button>
              <button 
                onClick={() => router.push('/admin/kiteuhusers')}
                className="px-4 py-3 text-left bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg transition-colors font-medium"
              >
                <Users className="w-4 h-4 inline mr-2" />
                Manage Kiteuh
              </button>
            </div>
          </Card>
        </div>

        {/* Current Session Info */}
        <div className="mt-8">
          <Card className="p-6 bg-gradient-to-r from-orange-50 to-amber-50">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Current Session</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F5A623] rounded-full flex items-center justify-center text-white font-bold">
                {(session.user.name?.[0] || session.user.email?.[0] || "A").toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{session.user.name || "Admin User"}</p>
                <p className="text-sm text-gray-600">{session.user.email}</p>
                <p className="text-xs text-[#F5A623] font-medium mt-1">Administrator</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}