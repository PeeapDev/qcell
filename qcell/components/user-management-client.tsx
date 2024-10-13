"use client"

import { useState } from "react"
import UserManagement from "./user-management"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { UserPlus } from "lucide-react"

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  documentType: string;
  documentNumber: string;
}

interface UserManagementClientProps {
  users: User[];
  onAddUser: () => void;
}

export default function UserManagementClient({ users, onAddUser }: UserManagementClientProps) {
  const [activeTab, setActiveTab] = useState("users")

  if (activeTab !== "users") return null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">User Management</CardTitle>
        <Button onClick={onAddUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </CardHeader>
      <CardContent>
        <UserManagement users={users} />
      </CardContent>
    </Card>
  )
}
