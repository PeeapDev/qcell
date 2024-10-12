"use client"

import { useState } from "react"
import { Suspense } from "react"
import { Bell, ChevronDown, FileText, Search, Shield, Users, BarChart, UserPlus, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DashboardClient from "./dashboard-client"
import ApplicationsTableClient from "./applications-table-client"
import ComplianceTableClient from "./compliance-table-client"
import UserManagementClient from "./user-management-client"
import ReportsClient from "./reports-client"
import AddStaff from "./add-staff"
import { SettingsPage } from "./settings-page"
import dynamic from 'next/dynamic'
import Image from 'next/image'

const DigitalClock = dynamic(() => import('./DigitalClock').then(mod => mod.DigitalClock), {
  ssr: false
})

export function KycDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [logo, setLogo] = useState("/default-logo.png")
  const [dashboardTitle, setDashboardTitle] = useState("KYC Dashboard")
  const [timeFormat, setTimeFormat] = useState<'12' | '24'>('12')

  const handleSettingsChange = (newLogo: string, newTitle: string, newTimeFormat: string) => {
    setLogo(newLogo)
    setDashboardTitle(newTitle)
    setTimeFormat(newTimeFormat as '12' | '24')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Only show when not in settings */}
      {activeTab !== "settings" && (
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <div className="mb-4">
              <Image src={logo} alt="Company Logo" width={150} height={50} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{dashboardTitle}</h1>
          </div>
          <nav className="mt-4">
            <a
              href="#"
              className={`flex items-center px-4 py-2 text-gray-700 ${
                activeTab === "dashboard" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart className="mr-2 h-5 w-5" />
              Dashboard
            </a>
            <a
              href="#"
              className={`flex items-center px-4 py-2 text-gray-700 ${
                activeTab === "compliance" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("compliance")}
            >
              <Shield className="mr-2 h-5 w-5" />
              Compliance
            </a>
            <a
              href="#"
              className={`flex items-center px-4 py-2 text-gray-700 ${
                activeTab === "users" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-5 w-5" />
              User Management
            </a>
            <a
              href="#"
              className={`flex items-center px-4 py-2 text-gray-700 ${
                activeTab === "add-staff" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("add-staff")}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Add Staff
            </a>
            <a
              href="#"
              className={`flex items-center px-4 py-2 text-gray-700 ${
                activeTab === "reports" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("reports")}
            >
              <FileText className="mr-2 h-5 w-5" />
              Reports
            </a>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden ${activeTab === "settings" ? "w-full" : ""}`}>
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
          <div className="flex items-center">
            {activeTab === "settings" && (
              <Button variant="ghost" onClick={() => setActiveTab("dashboard")}>
                Back to Dashboard
              </Button>
            )}
            {activeTab !== "settings" && (
              <>
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-64"
                />
                <Button variant="ghost" size="icon" className="ml-2">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <DigitalClock format={timeFormat} />
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  Admin
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "dashboard" && (
            <Suspense fallback={<div>Loading dashboard...</div>}>
              <DashboardClient />
            </Suspense>
          )}
          {activeTab === "compliance" && (
            <Suspense fallback={<div>Loading compliance checks...</div>}>
              <ComplianceTableClient />
            </Suspense>
          )}
          {activeTab === "users" && (
            <Suspense fallback={<div>Loading user management...</div>}>
              <UserManagementClient />
            </Suspense>
          )}
          {activeTab === "add-staff" && (
            <Suspense fallback={<div>Loading add staff form...</div>}>
              <AddStaff />
            </Suspense>
          )}
          {activeTab === "reports" && (
            <Suspense fallback={<div>Loading reports...</div>}>
              <ReportsClient />
            </Suspense>
          )}
          {activeTab === "settings" && (
            <Suspense fallback={<div>Loading settings...</div>}>
              <SettingsPage 
                onSettingsChange={handleSettingsChange} 
                defaultLogo="/default-logo.png"
                currentLogo={logo}
                currentTitle={dashboardTitle}
                currentTimeFormat={timeFormat}
              />
            </Suspense>
          )}
        </main>
      </div>
    </div>
  )
}
