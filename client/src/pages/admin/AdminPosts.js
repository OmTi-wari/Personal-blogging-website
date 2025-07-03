"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import AdminLayout from "../../components/AdminLayout"
import { Plus, Edit, Trash2, Eye, Search, Calendar, User } from "lucide-react"

const AdminPosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/posts/admin/all")
      setPosts(response.data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`/api/posts/${postId}`)
        setPosts(posts.filter((post) => post._id !== postId))
      } catch (error) {
        console.error("Error deleting post:", error)
        alert("Error deleting post")
      }
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="admin-posts">
        <div className="page-header">
          <div className="header-content">
            <h1>Posts</h1>
            <p>Manage your blog posts</p>
          </div>
          <Link to="/admin/posts/new" className="btn btn-primary">
            <Plus size={20} />
            New Post
          </Link>
        </div>

        <div className="posts-controls">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="posts-table-container">
          <table className="posts-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
                <th>Date</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post._id}>
                  <td>
                    <div className="post-title-cell">
                      <h4>{post.title}</h4>
                      <span className="post-category">{post.category}</span>
                    </div>
                  </td>
                  <td>
                    <div className="author-cell">
                      <User size={16} />
                      {post.author.username}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${post.status}`}>{post.status}</span>
                  </td>
                  <td>
                    <div className="date-cell">
                      <Calendar size={16} />
                      {formatDate(post.createdAt)}
                    </div>
                  </td>
                  <td>
                    <div className="views-cell">
                      <Eye size={16} />
                      {post.views}
                    </div>
                  </td>
                  <td>
                    <div className="actions-cell">
                      {post.status === "published" && (
                        <Link to={`/post/${post.slug}`} className="action-btn view" title="View Post">
                          <Eye size={16} />
                        </Link>
                      )}
                      <Link to={`/admin/posts/edit/${post._id}`} className="action-btn edit" title="Edit Post">
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => handleDelete(post._id)} className="action-btn delete" title="Delete Post">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPosts.length === 0 && (
            <div className="no-posts">
              <p>No posts found.</p>
              <Link to="/admin/posts/new" className="btn btn-primary">
                Create your first post
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminPosts
