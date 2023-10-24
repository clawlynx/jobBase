import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  showStats,
  updateJob,
} from "../controllers/jobController.js";
import {
  validateIdParams,
  validateJobInput,
} from "../middleware/validationMiddleware.js";
import { testforDemoUser } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllJobs)
  .post(testforDemoUser, validateJobInput, createJob);

router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(validateIdParams, getJob)
  .patch(testforDemoUser, validateJobInput, validateIdParams, updateJob)
  .delete(testforDemoUser, validateIdParams, deleteJob);

export default router;
