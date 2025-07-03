"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import AdminLayout from "../../components/AdminLayout"
import { Save, Eye, ArrowLeft } from "lucide-react"

const CreatePost = () => {
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

      await axios.post("/api/posts", postData)
      navigate("/admin/posts")
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Error creating post")
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

  return (
    <AdminLayout>
      <div className="create-post">
        <div className="page-header">
          <div className="header-content">
            <button onClick={() => navigate("/admin/posts")} className="back-btn">
              <ArrowLeft size={20} />
              Back to Posts
            </button>
            <h1>Create New Post</h1>
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

export default CreatePost
