const express = require("express")
const Post = require("../models/Post")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all published posts (public)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search, tag, category } = req.query
    const query = { status: "published" }

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { content: { $regex: search, $options: "i" } }]
    }

    if (tag) {
      query.tags = { $in: Array.isArray(tag) ? tag : [tag] };
    }

    if (category) {
      query.categories = { $in: Array.isArray(category) ? category : [category] };
    }

    const posts = await Post.find(query)
      .populate("author", "username")
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('categories', 'name slug') // Populate categories
      .populate('tags', 'name slug'); // Populate tags

    const total = await Post.countDocuments(query)

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Get single post by slug (public)
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
      status: "published",
    }).populate("author", "username")

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    // Increment views
    post.views += 1
    await post.save()

    res.json(post)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Get all posts for admin
router.get("/admin/all", auth, async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username").sort({ createdAt: -1 })

    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Create post (admin only)
router.post("/", auth, async (req, res) => {
  try {
    const { title, content, excerpt, tags, category, status, featuredImage } = req.body

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "-")

    const post = new Post({
      title,
      slug,
      content,
      excerpt,
      tags: tags || [],
      category,
      status: status || "draft",
      featuredImage: featuredImage || "",
      author: req.user.userId,
    })

    await post.save()
    await post.populate("author", "username")

    res.status(201).json(post)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Post with this title already exists" })
    }
    res.status(500).json({ message: "Server error" })
  }
})

// Update post (admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content, excerpt, tags, category, status, featuredImage } = req.body

    const updateData = {
      title,
      content,
      excerpt,
      tags: tags || [],
      category,
      status,
      featuredImage: featuredImage || "",
    }

    // Generate new slug if title changed
    if (title) {
      updateData.slug = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-")
    }

    const post = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate("author", "username")

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.json(post)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Delete post (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.json({ message: "Post deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
