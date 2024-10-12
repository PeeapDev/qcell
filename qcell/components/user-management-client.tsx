"use client"

import { useState } from "react"
import UserManagement from "./user-management"

export default function UserManagementClient() {
  const [activeTab, setActiveTab] = useState("users")

  if (activeTab !== "users") return null

  return (
    <section id="users">
      <UserManagement />
    </section>
  )
}
