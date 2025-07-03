"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import AdminLayout from "../../components/AdminLayout"
import { FileText, MessageCircle, Eye, TrendingUp, BarChart3 } from "lucide-react"

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get("/api/analytics")
      setAnalytics(response.data)
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
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
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your blog.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FileText size={24} />
            </div>
            <div className="stat-content">
              <h3>Total Posts</h3>
              <div className="stat-number">{analytics?.posts?.total || 0}</div>
              <div className="stat-details">
                <span className="published">{analytics?.posts?.published || 0} published</span>
                <span className="draft">{analytics?.posts?.draft || 0} drafts</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <MessageCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>Comments</h3>
              <div className="stat-number">{analytics?.comments?.total || 0}</div>
              <div className="stat-details">
                <span className="approved">{analytics?.comments?.approved || 0} approved</span>
                <span className="pending">{analytics?.comments?.pending || 0} pending</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Eye size={24} />
            </div>
            <div className="stat-content">
              <h3>Total Views</h3>
              <div className="stat-number">{analytics?.totalViews || 0}</div>
              <div className="stat-details">
                <span>Across all posts</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>Engagement</h3>
              <div className="stat-number">
                {analytics?.totalViews && analytics?.comments?.total
                  ? Math.round((analytics.comments.total / analytics.totalViews) * 100)
                  : 0}
                %
              </div>
              <div className="stat-details">
                <span>Comment rate</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Popular Posts</h2>
              <Link to="/admin/posts" className="section-link">
                View all posts
              </Link>
            </div>

            <div className="popular-posts">
              {analytics?.popularPosts?.length > 0 ? (
                analytics.popularPosts.map((post) => (
                  <div key={post._id} className="popular-post">
                    <div className="post-info">
                      <h4>{post.title}</h4>
                      <div className="post-stats">
                        <span className="views">
                          <Eye size={14} />
                          {post.views} views
                        </span>
                      </div>
                    </div>
                    <Link to={`/post/${post.slug}`} className="view-post">
                      View
                    </Link>
                  </div>
                ))
              ) : (
                <p className="no-data">No posts yet</p>
              )}
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Comments</h2>
              <Link to="/admin/comments" className="section-link">
                View all comments
              </Link>
            </div>

            <div className="recent-comments">
              {analytics?.recentComments?.length > 0 ? (
                analytics.recentComments.map((comment) => (
                  <div key={comment._id} className="recent-comment">
                    <div className="comment-info">
                      <div className="comment-author">{comment.author}</div>
                      <div className="comment-post">on "{comment.post?.title}"</div>
                      <div className="comment-preview">{comment.content.substring(0, 100)}...</div>
                    </div>
                    <div className="comment-status">
                      <span className={`status ${comment.status}`}>{comment.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No comments yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/admin/posts/new" className="action-card">
              <FileText size={32} />
              <h3>New Post</h3>
              <p>Create a new blog post</p>
            </Link>

            <Link to="/admin/posts" className="action-card">
              <BarChart3 size={32} />
              <h3>Manage Posts</h3>
              <p>Edit and organize your posts</p>
            </Link>

            <Link to="/admin/comments" className="action-card">
              <MessageCircle size={32} />
              <h3>Moderate Comments</h3>
              <p>Review pending comments</p>
            </Link>

            <Link to="/" className="action-card">
              <Eye size={32} />
              <h3>View Blog</h3>
              <p>See your blog as visitors do</p>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
