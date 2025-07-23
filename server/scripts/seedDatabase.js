import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Post from "../models/Post.js";
import { users, posts } from "../data/index.js";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/socialmedia";

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});

    // Insert users
    await User.insertMany(users);
    console.log("Users inserted");

    // Insert posts
    await Post.insertMany(posts);
    console.log("Posts inserted");

    mongoose.connection.close();
    console.log("Database seeding completed and connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
