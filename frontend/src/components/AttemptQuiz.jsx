import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AttemptQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quiz) {
      handleSubmit(); // Auto-submit on timeout
    }
  }, [timeLeft]);

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quizzes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setQuiz(data.data);
        setTimeLeft(data.data.timeLimit * 60); // Convert minutes to seconds
      } else {
        toast.error("Failed to fetch quiz.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the quiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionIndex });
  };

  const handleSubmit = async () => {
    const answers = Object.entries(selectedAnswers).map(([questionId, selectedOptionIndex]) => ({
      questionId,
      selectedOptionIndex,
    }));

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quizzes/${id}/attempt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ answers }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Quiz submitted successfully!");
        navigate(`/result/${id}`); // Redirect to result page
      } else {
        toast.error("Failed to submit quiz.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the quiz.");
    }
  };

  if (loading) return <p className="text-center">Loading quiz...</p>;
  if (!quiz) return <p className="text-center">Quiz not found.</p>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto p-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <p className="text-gray-600 dark:text-gray-400">{quiz.description}</p>

      {/* Timer */}
      <div className="text-right text-lg font-bold text-red-500 mt-2">
        Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </div>

      {/* Question Section */}
      <div className="border p-4 rounded mb-4 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-3">
          {currentQuestionIndex + 1}. {currentQuestion.questionText}
        </h2>

        {/* Options */}
        {currentQuestion.options.map((option, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name={`question-${currentQuestion._id}`}
                checked={selectedAnswers[currentQuestion._id] === index}
                onChange={() => handleOptionSelect(currentQuestion._id, index)}
                className="w-4 h-4"
              />
              <span className="dark:text-white">{option}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default AttemptQuiz;
