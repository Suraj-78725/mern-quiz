import express from "express";
import { 
    createQuiz, 
    getUserQuizzes, 
    getQuizById, 
    updateQuiz, 
    deleteQuiz, 
    getLeaderboard,
    attemptQuiz,
    getAttempts 
} from "../controllers/quiz.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a new quiz
router.post("/create", verifyJWT, createQuiz);

// Get all quizzes created by the logged-in user
router.get("/my-quizzes", verifyJWT, getUserQuizzes);

// Get a specific quiz by ID
router.get("/:quizId", verifyJWT, getQuizById);

// Update a specific quiz by ID
router.patch("/:quizId/update", verifyJWT, updateQuiz);

// Delete a specific quiz by ID
router.delete("/:quizId/delete", verifyJWT, deleteQuiz);

// Get the leaderboard for a specific quiz
router.get("/:quizId/leaderboard", verifyJWT, getLeaderboard);

//attempt
router.get("/:quizId/attempt", verifyJWT, attemptQuiz);
router.get("/attempts", verifyJWT, getAttempts);


export default router;
