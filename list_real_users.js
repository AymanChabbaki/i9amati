// This script lists all property_owner and union_agent users with their email and username.
import mongoose from "mongoose";
import User from "./backend/models/User.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/iqamati";

async function main() {
  await mongoose.connect(MONGO_URI);
  const users = await User.find({
    role: { $in: ["property_owner", "union_agent"] },
  }).select("name email username role");
  console.log(JSON.stringify(users, null, 2));
  await mongoose.disconnect();
}

main();
