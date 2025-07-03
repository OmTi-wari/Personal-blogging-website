"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import AdminLayout from "../../components/AdminLayout"
import { Check, X, Trash2, Search, Calendar, Mail, MessageCircle } from "lucide-react"

const AdminComments = () => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      const response = await axios.get("/api/comments/admin/all")
      setComments(response.data)
    } catch (error) {
      console.error("Error fetching comments:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (commentId, status) => {
    try {
      await axios.put(`/api/comments/${commentId}/status`, { status })
      setComments(comments.map((comment) => (comment._id === commentId ? { ...comment, status } : comment)))
    } catch (error) {
      console.error("Error updating comment status:", error)
      alert("Error updating comment status")
    }
  }

  const handleDelete = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await axios.delete(`/api/comments/${commentId}`)
        setComments(comments.filter((comment) => comment._id !== commentId))
      } catch (error) {
        console.error("Error deleting comment:", error)
        alert("Error deleting comment")
      }
    }
  }

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.post?.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || comment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
      <div className="admin-comments">
        <div className="page-header">
          <div className="header-content">
            <h1>Comments</h1>
            <p>Moderate and manage blog comments</p>
          </div>
        </div>

        <div className="comments-controls">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="status-filter">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="comments-list">
          {filteredComments.map((comment) => (
            <div key={comment._id} className="comment-card">
              <div className="comment-header">
                <div className="comment-author-info">
                  <h4>{comment.author}</h4>
                  <div className="comment-meta">
                    <span className="email">
                      <Mail size={14} />
                      {comment.email}
                    </span>
                    <span className="date">
                      <Calendar size={14} />
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                </div>
                <span className={`status-badge ${comment.status}`}>{comment.status}</span>
              </div>

              <div className="comment-post-info">
                <MessageCircle size={16} />
                <span>On post: "{comment.post?.title || "Unknown Post"}"</span>
              </div>

              <div className="comment-content">{comment.content}</div>

              <div className="comment-actions">
                {comment.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(comment._id, "approved")}
                      className="action-btn approve"
                      title="Approve Comment"
                    >
                      <Check size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(comment._id, "rejected")}
                      className="action-btn reject"
                      title="Reject Comment"
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </>
                )}

                {comment.status === "approved" && (
                  <button
                    onClick={() => handleStatusUpdate(comment._id, "rejected")}
                    className="action-btn reject"
                    title="Reject Comment"
                  >
                    <X size={16} />
                    Reject
                  </button>
                )}

                {comment.status === "rejected" && (
                  <button
                    onClick={() => handleStatusUpdate(comment._id, "approved")}
                    className="action-btn approve"
                    title="Approve Comment"
                  >
                    <Check size={16} />
                    Approve
                  </button>
                )}

                <button onClick={() => handleDelete(comment._id)} className="action-btn delete" title="Delete Comment">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filteredComments.length === 0 && (
            <div className="no-comments">
              <p>No comments found.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminComments
