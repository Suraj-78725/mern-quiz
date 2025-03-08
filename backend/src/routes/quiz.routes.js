import express from "express";
import { 
    createQuiz, 
    getUserQuizzes, 
    getQuizById, 
    updateQuiz, 
    deleteQuiz, 
    getLeaderboard,
    attemptQuiz,
    getAttempts,
    getQuizResults
} from "../controllers/quiz.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Attempts route (put this BEFORE other routes with parameters)
router.get("/user/attempts", verifyJWT, getAttempts);

// Quiz routes
router.post("/create", verifyJWT, upload.fields([
    { name: "questionImage", maxCount: 4 },  // For question images
    { name: "explanationImage", maxCount: 4 } // For explanation images
  ]), createQuiz);
  
router.get("/my-quizzes", verifyJWT, getUserQuizzes);

// Routes with parameters
router.get("/:quizId", verifyJWT, getQuizById);
router.patch("/:quizId/update", verifyJWT, updateQuiz);
router.delete("/:quizId/delete", verifyJWT, deleteQuiz);
router.get("/:quizId/leaderboard", verifyJWT, getLeaderboard);
router.post("/:quizId/attempt", verifyJWT, attemptQuiz);
router.get("/attempt/:attemptId/results", verifyJWT, getQuizResults);

export default router;
