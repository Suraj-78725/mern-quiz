import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ExplanationPage = () => {
  const location = useLocation();
  const { questions } = location.state || { questions: [] };
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  if (!questions.length) {
    return <p>No questions available.</p>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto p-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Explanation</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <p className="font-semibold">
          {currentIndex + 1}. {currentQuestion.questionText}
        </p>
        <p className="text-green-500">
          ✅ Correct Answer: {currentQuestion.options[currentQuestion.correctAnswerIndex]}
        </p>
        <p className="text-gray-500 dark:text-gray-400 italic">
          ℹ️ {currentQuestion.explanation}
        </p>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentIndex === questions.length - 1}
        >
          Next
        </button>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Back to Results
      </button>
    </div>
  );
};

export default ExplanationPage;
