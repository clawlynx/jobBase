import mongoose from "mongoose";
import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import dayjs from "dayjs";

export const getAllJobs = async (req, res) => {
  const { userId } = req.user;
  const { search, jobType, jobStatus, sort } = req.query; //for searching
  const queryObject = {
    createdBy: userId,
  };
  // the 3 if statements are for searching based on query
  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  //for sorting
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };
  const sortKey = sortOptions[sort] || sortOptions.newest;
  //for pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

export const createJob = async (req, res) => {
  const { company, position, jobStatus, jobLocation, jobType } = req.body;
  const { userId } = req.user;
  const job = await Job.create({
    company,
    position,
    jobStatus,
    jobLocation,
    jobType,
    createdBy: userId,
  });
  res.status(StatusCodes.CREATED).json(job);
};

export const getJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  res.status(StatusCodes.OK).json(job);
};

export const updateJob = async (req, res) => {
  const { company, position, jobStatus, jobLocation, jobType } = req.body;
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(
    id,
    { company, position, jobStatus, jobLocation, jobType },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ msg: "job updated", updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: "job deleted", removedJob });
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((accumulator, currentIteration) => {
    const { _id: title, count } = currentIteration;
    accumulator[title] = count;
    return accumulator;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { month, year },
        count,
      } = item;
      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
