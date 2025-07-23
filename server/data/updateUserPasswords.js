import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config({ path: "../.env" });

const MONGO_URL = process.env.MONGO_URL;

const defaultPassword = "password123";
const saltRounds = 10;

const updatePasswords = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const users = await User.find({});
    console.log(`Found ${users.length} users`);

    for (const user of users) {
      if (!user.password.startsWith("$2")) {
        const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);
        user.password = hashedPassword;
        await user.save();
        console.log(`Updated password for user: ${user.email}`);
      } else {
        console.log(`Password already hashed for user: ${user.email}`);
      }
    }

    console.log("Password update complete");
    process.exit(0);
  } catch (error) {
    console.error("Error updating passwords:", error);
    process.exit(1);
  }
};

updatePasswords();
