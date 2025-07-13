const mongoose = require("mongoose")
const User = require("./models/User")
const Category = require("./models/Category")
const Post = require("./models/Post")
const Tag = require("./models/Tag")
// Keep a single database connection open
let dbConnection = null;
require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/personal-blog"

const seedAdminUser = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true, // This option is deprecated and will be removed in a future version
      useUnifiedTopology: true, // This option is deprecated and will be removed in a future version
    });

    dbConnection = mongoose.connection; // Store the connection
    const adminExists = await User.findOne({ username: "admin" })

    if (adminExists) {
      console.log("Admin user already exists.")
      mongoose.connection.close()
      return
    }

    const adminUser = new User({
      username: "admin",
      email: "admin@example.com",
      password: "password",
      role: "admin",
    })

    await adminUser.save()
    console.log("Admin user created successfully!")
  } catch (error) {
    console.error("Error seeding admin user:", error)
  }
}

const seedCategoriesAndTags = async () => {
  try {
    // Re-use the existing connection if available, otherwise connect
    if (!dbConnection || dbConnection.readyState !== 1) {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const exampleCategories = [
      { name: "Learning to Code", slug: "learning-to-code" },
      { name: "Mental Health Journey", slug: "mental-health-journey" },
      { name: "Career Transition", slug: "career-transition" },
    ];

    const exampleTags = [
      { name: "Motivation", slug: "motivation" },
      { name: "Challenges", slug: "challenges" },
      { name: "Successes", slug: "successes" },
    ];

    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany(exampleCategories);
      console.log("Example categories seeded successfully!");
    } else {
      console.log("Categories already exist, skipping seeding.");
    }

    const tagCount = await Tag.countDocuments();
    if (tagCount === 0) {
      await Tag.insertMany(exampleTags);
      console.log("Example tags seeded successfully!");
    } else {
      console.log("Tags already exist, skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding categories and tags:", error);
  } finally {
    // Don't close the connection here
  }
};

const seedPosts = async () => {
  try {
    // Re-use the existing connection if available, otherwise connect
    if (!dbConnection || dbConnection.readyState !== 1) {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const adminUser = await User.findOne({ role: "admin" });
    if (!adminUser) {
      console.log("Admin user not found, cannot seed posts.");
      mongoose.connection.close();
      return;
    }

    const categories = await Category.find({});
    const tags = await Tag.find({});

    if (categories.length === 0 || tags.length === 0) {
      console.log("Categories or tags not found, cannot seed posts. Please run category and tag seeding first.");
      mongoose.connection.close();
      return;
    }

    const examplePosts = [
      {
        title: "My First Step into Coding",
        slug: "my-first-step-into-coding",
        content: "This is the content of my first post about starting to learn coding. It was challenging but exciting!",
        excerpt: "Starting my coding journey...",
        status: "published",
        author: adminUser._id,
        categories: [categories.find(cat => cat.slug === "learning-to-code")._id],
        tags: [tags.find(tag => tag.slug === "motivation")._id, tags.find(tag => tag.slug === "challenges")._id],
      },
      {
        title: "Overcoming Imposter Syndrome",
        slug: "overcoming-imposter-syndrome",
        content: "Sharing my struggles with imposter syndrome and how I'm working through it.",
        excerpt: "Dealing with self-doubt...",
        status: "published",
        author: adminUser._id,
        categories: [categories.find(cat => cat.slug === "mental-health-journey")._id],
        tags: [tags.find(tag => tag.slug === "challenges")._id, tags.find(tag => tag.slug === "successes")._id],
      },
    ];

    const postCount = await Post.countDocuments();
    if (postCount === 0) {
      await Post.insertMany(examplePosts);
      console.log("Example posts seeded successfully!");
    } else {
      console.log("Posts already exist, skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding posts:", error);
  } finally {
    // Don't close the connection here
  }
};

const seedDatabase = async () => {
  await seedAdminUser();
  await seedCategoriesAndTags();
  await seedPosts();
  if (dbConnection && dbConnection.readyState === 1) {
    await dbConnection.close(); // Close the connection only once at the end
  }
};
seedDatabase();