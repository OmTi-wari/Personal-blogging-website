"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import AdminLayout from "../../components/AdminLayout"
import { Save, Eye, ArrowLeft } from "lucide-react"

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    featuredImage: "",
    status: "draft",
  })
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      const response = await axios.get("/api/posts/admin/all")
      const post = response.data.find((p) => p._id === id)

      if (post) {
        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          category: post.category,
          tags: post.tags.join(", "),
          featuredImage: post.featuredImage || "",
          status: post.status,
        })
      }
    } catch (error) {
      console.error("Error fetching post:", error)
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const postData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      }

      await axios.put(`/api/posts/${id}`, postData)
      navigate("/admin/posts")
    } catch (error) {
      console.error("Error updating post:", error)
      alert("Error updating post")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSaveAsDraft = () => {
    setFormData((prev) => ({ ...prev, status: "draft" }))
  }

  const handlePublish = () => {
    setFormData((prev) => ({ ...prev, status: "published" }))
  }

  if (initialLoading) {
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
      <div className="edit-post">
        <div className="page-header">
          <div className="header-content">
            <button onClick={() => navigate("/admin/posts")} className="back-btn">
              <ArrowLeft size={20} />
              Back to Posts
            </button>
            <h1>Edit Post</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-main">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter post title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="excerpt">Excerpt *</label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows="3"
                placeholder="Brief description of the post"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content *</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="20"
                placeholder="Write your post content here... (Markdown supported)"
                className="content-editor"
              />
            </div>
          </div>

          <div className="form-sidebar">
            <div className="form-section">
              <h3>Post Settings</h3>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Technology, Travel"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Separate tags with commas"
                />
                <small>Separate multiple tags with commas</small>
              </div>

              <div className="form-group">
                <label htmlFor="featuredImage">Featured Image URL</label>
                <input
                  type="url"
                  id="featuredImage"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="current-status">
                <strong>Current Status: </strong>
                <span className={`status-badge ${formData.status}`}>{formData.status}</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" onClick={handleSaveAsDraft} disabled={loading} className="btn btn-secondary">
                <Save size={20} />
                Save as Draft
              </button>

              <button type="submit" onClick={handlePublish} disabled={loading} className="btn btn-primary">
                <Eye size={20} />
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default EditPost
