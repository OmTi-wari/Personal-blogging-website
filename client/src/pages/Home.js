"use client"

import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import axios from "axios"
import { Calendar, Clock, Tag, ChevronLeft, ChevronRight } from "lucide-react"

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchParams] = useSearchParams()

  const searchQuery = searchParams.get("search") || ""

  useEffect(() => {
    fetchPosts()
  }, [currentPage, selectedCategory, searchQuery])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        limit: 6,
      }

      if (searchQuery) params.search = searchQuery
      if (selectedCategory) params.category = selectedCategory

      const response = await axios.get("/api/posts", { params })
      setPosts(response.data.posts)
      setTotalPages(response.data.totalPages)

      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.posts.map((post) => post.category))]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category)
    setCurrentPage(1)
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

  return (
    <main className="main">
      <div className="container">
        <div className="hero-section">
          <h1>Welcome to My Blog</h1>
          <p>Stay updated with the latest insights and stories from our community</p>
        </div>

        {searchQuery && (
          <div className="search-results-info">
            <p>
              Search results for: <strong>"{searchQuery}"</strong>
            </p>
          </div>
        )}

        {categories.length > 0 && (
          <div className="category-filters">
            <button
              onClick={() => handleCategoryFilter("")}
              className={`category-filter ${!selectedCategory ? "active" : ""}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`category-filter ${selectedCategory === category ? "active" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post._id} className="post-card">
              {post.featuredImage && (
                <div className="post-image">
                  <img src={post.featuredImage || "/placeholder.svg"} alt={post.title} />
                </div>
              )}

              <div className="post-content">
                <div className="post-meta">
                  <span className="post-category">
                    <Tag size={14} />
                    {post.category}
                  </span>
                  <span className="post-date">
                    <Calendar size={14} />
                    {formatDate(post.publishedAt)}
                  </span>
                </div>

                <h2 className="post-title">
                  <Link to={`/post/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="post-excerpt">{post.excerpt}</p>

                <div className="post-footer">
                  <span className="read-time">
                    <Clock size={14} />
                    {Math.ceil(post.content.length / 1000)} min read
                  </span>
                  <Link to={`/post/${post.slug}`} className="read-more">
                    Read More
                  </Link>
                </div>

                {post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="no-posts">
            <p>No posts found.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div className="pagination-info">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default Home
