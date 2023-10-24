import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import User from "./models/UserModel.js";
import { readFile } from "fs/promises";
import Job from "./models/jobModel.js";

try {
  await mongoose.connect(process.env.MONGODB_URI);
  const user = await User.findOne({ email: "shafi@gmail.com" });
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("success");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
