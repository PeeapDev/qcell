import type { NextApiRequest, NextApiResponse } from 'next'

type User = {
  id: number
  name: string
  email: string
  role: string
  status: string
}

const users: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Staff", status: "Inactive" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Staff", status: "Active" },
  { id: 4, name: "Diana Ross", email: "diana@example.com", role: "Admin", status: "Active" },
  { id: 5, name: "Edward Norton", email: "edward@example.com", role: "Staff", status: "Pending" },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | { message: string }>
) {
  if (req.method === 'GET') {
    // Return all users
    res.status(200).json(users)
  } else if (req.method === 'POST') {
    // Add a new user
    const newUser = req.body
    // Here you would typically validate the input and save to a database
    users.push({ ...newUser, id: users.length + 1 })
    res.status(201).json({ message: 'User created successfully' })
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
