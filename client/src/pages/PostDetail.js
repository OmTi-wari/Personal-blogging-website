"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import { Calendar, Clock, Tag, User, MessageCircle, Send } from "lucide-react"

const PostDetail = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentForm, setCommentForm] = useState({
    author: "",
    email: "",
    content: "",
  })
  const [submittingComment, setSubmittingComment] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [slug])

  useEffect(() => {
    if (post) {
      fetchComments()
    }
  }, [post])

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${slug}`)
      setPost(response.data)
    } catch (error) {
      console.error("Error fetching post:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/post/${post._id}`)
      setComments(response.data)
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!commentForm.author || !commentForm.email || !commentForm.content) {
      alert("Please fill in all fields")
      return
    }

    try {
      setSubmittingComment(true)
      await axios.post("/api/comments", {
        postId: post._id,
        ...commentForm,
      })

      setCommentForm({ author: "", email: "", content: "" })
      alert("Comment submitted! It will be visible after approval.")
      fetchComments()
    } catch (error) {
      console.error("Error submitting comment:", error)
      alert("Error submitting comment. Please try again.")
    } finally {
      setSubmittingComment(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <main className="main">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="main">
        <div className="container">
          <div className="error-message">
            <h1>Post not found</h1>
            <p>The post you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="main">
      <div className="container">
        <article className="post-detail">
          <header className="post-header">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>{post.title}</span>
            </div>

            <h1 className="post-title">{post.title}</h1>

            <div className="post-meta">
              <span className="meta-item">
                <User size={16} />
                By {post.author.username}
              </span>
              <span className="meta-item">
                <Calendar size={16} />
                {formatDate(post.publishedAt)}
              </span>
              <span className="meta-item">
                <Clock size={16} />
                {Math.ceil(post.content.length / 1000)} min read
              </span>
              <span className="meta-item">
                <Tag size={16} />
                {post.category}
              </span>
            </div>

            {post.featuredImage && (
              <div className="post-featured-image">
                <img src={post.featuredImage || "/placeholder.svg"} alt={post.title} />
              </div>
            )}
          </header>

          <div className="post-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {post.tags.length > 0 && (
            <div className="post-tags">
              <h3>Tags:</h3>
              <div className="tags-list">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="post-actions">
            <div className="share-buttons">
              <h3>Share this post:</h3>
              <div className="share-links">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn twitter"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-btn linkedin"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>

        <section className="comments-section">
          <h2 className="comments-title">
            <MessageCircle size={24} />
            Comments ({comments.length})
          </h2>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                <div className="comment-header">
                  <strong className="comment-author">{comment.author}</strong>
                  <span className="comment-date">{formatDate(comment.createdAt)}</span>
                </div>
                <div className="comment-content">{comment.content}</div>
              </div>
            ))}

            {comments.length === 0 && <p className="no-comments">No comments yet. Be the first to comment!</p>}
          </div>

          <form onSubmit={handleCommentSubmit} className="comment-form">
            <h3>Leave a Comment</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="author">Name *</label>
                <input
                  type="text"
                  id="author"
                  value={commentForm.author}
                  onChange={(e) => setCommentForm((prev) => ({ ...prev, author: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  value={commentForm.email}
                  onChange={(e) => setCommentForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="content">Comment *</label>
              <textarea
                id="content"
                rows="4"
                value={commentForm.content}
                onChange={(e) => setCommentForm((prev) => ({ ...prev, content: e.target.value }))}
                required
              ></textarea>
            </div>

            <button type="submit" disabled={submittingComment} className="btn btn-primary">
              {submittingComment ? (
                "Submitting..."
              ) : (
                <>
                  <Send size={16} />
                  Submit Comment
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}

export default PostDetail
