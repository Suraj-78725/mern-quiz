import React, { useEffect, useState } from "react";

const HistoryPage = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quizzes/user/attempts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setAttempts(data.data);
      } else {
        console.error("Failed to fetch attempts");
      }
    } catch (error) {
      console.error("Error fetching attempts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white text-black dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Quiz History</h1>
      {attempts.length === 0 ? (
        <p className="text-center">No quiz attempts found.</p>
      ) : (
        <div className="space-y-4">
          {attempts.map((attempt) => (
            <div
              key={attempt._id}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{attempt.quizId.title}</h2>
                <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                  Completed: {new Date(attempt.completedAt).toLocaleString()}
                </p>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center justify-between sm:justify-end">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  Score: {attempt.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
