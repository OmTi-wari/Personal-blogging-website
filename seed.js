const mongoose = require("mongoose")
const User = require("./models/User")
require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/personal-blog"

const seedAdminUser = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

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
    mongoose.connection.close()
  } catch (error) {
    console.error("Error seeding admin user:", error)
    mongoose.connection.close()
  }
}

seedAdminUser() 