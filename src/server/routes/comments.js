const express = require("express")
const Comment = require("../models/Comment")
const auth = require("../middleware/auth")

const router = express.Router()

// Get comments for a post (public)
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
      status: "approved",
    }).sort({ createdAt: -1 })

    res.json(comments)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Create comment (public)
router.post("/", async (req, res) => {
  try {
    const { postId, author, email, content, parentComment } = req.body

    const comment = new Comment({
      post: postId,
      author,
      email,
      content,
      parentComment: parentComment || null,
    })

    await comment.save()
    res.status(201).json(comment)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Get all comments for admin
router.get("/admin/all", auth, async (req, res) => {
  try {
    const comments = await Comment.find().populate("post", "title").sort({ createdAt: -1 })

    res.json(comments)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Update comment status (admin only)
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body

    const comment = await Comment.findByIdAndUpdate(req.params.id, { status }, { new: true })

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" })
    }

    res.json(comment)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Delete comment (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id)

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" })
    }

    res.json({ message: "Comment deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
