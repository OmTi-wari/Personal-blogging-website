"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import AdminLayout from "../../components/AdminLayout"
import { TrendingUp, Eye, MessageCircle, FileText, Calendar, BarChart3 } from "lucide-react"

const AdminAnalytics = () => {
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
      <div className="admin-analytics">
        <div className="page-header">
          <div className="header-content">
            <h1>Analytics</h1>
            <p>Detailed insights about your blog performance</p>
          </div>
        </div>

        <div className="analytics-overview">
          <div className="overview-card">
            <div className="card-icon">
              <FileText size={32} />
            </div>
            <div className="card-content">
              <h3>Total Posts</h3>
              <div className="card-number">{analytics?.posts?.total || 0}</div>
              <div className="card-breakdown">
                <span className="published">{analytics?.posts?.published || 0} Published</span>
                <span className="draft">{analytics?.posts?.draft || 0} Drafts</span>
              </div>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-icon">
              <Eye size={32} />
            </div>
            <div className="card-content">
              <h3>Total Views</h3>
              <div className="card-number">{analytics?.totalViews || 0}</div>
              <div className="card-breakdown">
                <span>Across all posts</span>
              </div>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-icon">
              <MessageCircle size={32} />
            </div>
            <div className="card-content">
              <h3>Comments</h3>
              <div className="card-number">{analytics?.comments?.total || 0}</div>
              <div className="card-breakdown">
                <span className="approved">{analytics?.comments?.approved || 0} Approved</span>
                <span className="pending">{analytics?.comments?.pending || 0} Pending</span>
              </div>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-icon">
              <TrendingUp size={32} />
            </div>
            <div className="card-content">
              <h3>Engagement Rate</h3>
              <div className="card-number">
                {analytics?.totalViews && analytics?.comments?.total
                  ? Math.round((analytics.comments.total / analytics.totalViews) * 100)
                  : 0}
                %
              </div>
              <div className="card-breakdown">
                <span>Comments per view</span>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-details">
          <div className="analytics-section">
            <div className="section-header">
              <h2>
                <BarChart3 size={24} />
                Most Popular Posts
              </h2>
            </div>

            <div className="popular-posts-detailed">
              {analytics?.popularPosts?.length > 0 ? (
                analytics.popularPosts.map((post, index) => (
                  <div key={post._id} className="popular-post-item">
                    <div className="post-rank">#{index + 1}</div>
                    <div className="post-details">
                      <h4>{post.title}</h4>
                      <div className="post-stats">
                        <span className="views">
                          <Eye size={16} />
                          {post.views} views
                        </span>
                      </div>
                    </div>
                    <div className="post-performance">
                      <div className="performance-bar">
                        <div
                          className="performance-fill"
                          style={{
                            width: `${(post.views / (analytics.popularPosts[0]?.views || 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No posts available</p>
              )}
            </div>
          </div>

          <div className="analytics-section">
            <div className="section-header">
              <h2>
                <MessageCircle size={24} />
                Recent Comment Activity
              </h2>
            </div>

            <div className="recent-activity">
              {analytics?.recentComments?.length > 0 ? (
                analytics.recentComments.map((comment) => (
                  <div key={comment._id} className="activity-item">
                    <div className="activity-icon">
                      <MessageCircle size={16} />
                    </div>
                    <div className="activity-content">
                      <div className="activity-header">
                        <strong>{comment.author}</strong>
                        <span className="activity-action">commented on</span>
                        <strong>"{comment.post?.title}"</strong>
                      </div>
                      <div className="activity-preview">{comment.content.substring(0, 100)}...</div>
                      <div className="activity-meta">
                        <span className="activity-date">
                          <Calendar size={14} />
                          {formatDate(comment.createdAt)}
                        </span>
                        <span className={`activity-status ${comment.status}`}>{comment.status}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No recent comments</p>
              )}
            </div>
          </div>
        </div>

        <div className="analytics-summary">
          <h2>Summary</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <h4>Content Performance</h4>
              <p>
                You have {analytics?.posts?.published || 0} published posts with a total of {analytics?.totalViews || 0}{" "}
                views. Your most popular post has {analytics?.popularPosts?.[0]?.views || 0} views.
              </p>
            </div>

            <div className="summary-item">
              <h4>Community Engagement</h4>
              <p>
                Your blog has received {analytics?.comments?.total || 0} comments, with{" "}
                {analytics?.comments?.approved || 0} approved and {analytics?.comments?.pending || 0} pending
                moderation.
              </p>
            </div>

            <div className="summary-item">
              <h4>Publishing Activity</h4>
              <p>
                You currently have {analytics?.posts?.draft || 0} draft posts ready for publishing. Keep creating great
                content to engage your audience!
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminAnalytics
