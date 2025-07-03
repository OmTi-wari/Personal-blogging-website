const express = require("express")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const auth = require("../middleware/auth")

const router = express.Router()

// Get analytics data (admin only)
router.get("/", auth, async (req, res) => {
  try {
    // Total posts
    const totalPosts = await Post.countDocuments()
    const publishedPosts = await Post.countDocuments({ status: "published" })
    const draftPosts = await Post.countDocuments({ status: "draft" })

    // Total comments
    const totalComments = await Comment.countDocuments()
    const pendingComments = await Comment.countDocuments({ status: "pending" })
    const approvedComments = await Comment.countDocuments({ status: "approved" })

    // Most viewed posts
    const popularPosts = await Post.find({ status: "published" })
      .sort({ views: -1 })
      .limit(5)
      .select("title views slug")

    // Recent comments
    const recentComments = await Comment.find().populate("post", "title").sort({ createdAt: -1 }).limit(5)

    // Total views
    const totalViews = await Post.aggregate([{ $group: { _id: null, totalViews: { $sum: "$views" } } }])

    res.json({
      posts: {
        total: totalPosts,
        published: publishedPosts,
        draft: draftPosts,
      },
      comments: {
        total: totalComments,
        pending: pendingComments,
        approved: approvedComments,
      },
      totalViews: totalViews[0]?.totalViews || 0,
      popularPosts,
      recentComments,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
