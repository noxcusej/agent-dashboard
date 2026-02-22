import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'

export default function AppShell() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
