import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResultPage = () => {
  const { id } = useParams(); // Quiz ID from URL
  const [attempts, setAttempts] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quizzes/user/attempts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        // Filter only attempts related to the current quiz
        const quizAttempts = data.data.filter((attempt) => attempt.quizId._id === id);

        if (quizAttempts.length > 0) {
          setAttempts(quizAttempts);

          // The first attempt in the response is always the latest one
          const latestAttempt = quizAttempts[0];

          // Fetch the quiz details to calculate max possible score
          fetchQuizDetails(id, latestAttempt);
        }
      } else {
        toast.error("Failed to fetch attempts.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching attempts.");
    }
  };



  const fetchQuizDetails = async (quizId, latestAttempt) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quizzes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setQuestions(data.data.questions);

        // Use the latest attempt's score
        const total = latestAttempt?.score || 0;
        setTotalScore(total);

        // Calculate percentage correctly
        const maxScore = data.data.questions.length;
        const calculatedPercentage = maxScore > 0 ? ((total / maxScore) * 100).toFixed(2) : 0;
        setPercentage(calculatedPercentage);

        // Determine pass/fail status
        setStatus(calculatedPercentage >= 50 ? "Passed 🎉" : "Failed ❌");
      }
    } catch (error) {
      toast.error("Error fetching quiz details.");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate()


  return (
    <div className="max-w-4xl mx-auto p-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>

      {loading ? (
        <p>Loading...</p>
      ) : attempts.length === 0 ? (
        <p>No attempts found for this quiz.</p>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{quizTitle}</h2>
          <p className="text-lg font-semibold text-blue-500">
            Total Score: {totalScore} / {questions.length} ({percentage}%)
          </p>
          <p className={`text-lg font-bold ${status === "Passed 🎉" ? "text-green-500" : "text-red-500"}`}>
            {status}
          </p>

          <h3 className="text-lg font-semibold mt-4">Previous Attempts:</h3>
          <ul className="mt-2 space-y-2">
            {attempts.map((attempt, index) => (
              <li key={attempt._id} className="p-2 border-b dark:border-gray-700">
                Attempt {index + 1}: Score - {attempt.score} (Completed on {new Date(attempt.completedAt).toLocaleString()})
              </li>
            ))}
          </ul>

          <button
            onClick={() => navigate("/explanation", { state: { questions } })}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            View Explanation
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
