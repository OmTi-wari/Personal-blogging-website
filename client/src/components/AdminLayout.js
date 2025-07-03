"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { LayoutDashboard, FileText, MessageCircle, BarChart3, LogOut, Eye, Menu, X } from "lucide-react"

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/posts", icon: FileText, label: "Posts" },
    { path: "/admin/comments", icon: MessageCircle, label: "Comments" },
    { path: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  ]

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h2>Blog Admin</h2>
          <button onClick={() => setSidebarOpen(false)} className="sidebar-close">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <IconComponent size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="nav-item">
            <Eye size={20} />
            <span>View Blog</span>
          </Link>
          <button onClick={handleLogout} className="nav-item logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <button onClick={() => setSidebarOpen(true)} className="sidebar-toggle">
            <Menu size={20} />
          </button>

          <div className="header-user">
            <span>Welcome, {user?.username}</span>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}

export default AdminLayout
