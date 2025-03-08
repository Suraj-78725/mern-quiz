import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinQuizPage = () => {
  const [quizId, setQuizId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoinQuiz = () => {
    if (!quizId.trim()) {
      setError("Please enter a valid Quiz ID");
      return;
    }
    navigate(`/attempt-quiz/${quizId}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white dark:bg-gray-900 dark:text-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Join Quiz</h1>

      <input
        type="text"
        placeholder="Enter Quiz ID"
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                   dark:bg-gray-800 dark:border-gray-600"
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        onClick={handleJoinQuiz}
        className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 
                   dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        Join Quiz
      </button>
    </div>
  );
};

export default JoinQuizPage;
