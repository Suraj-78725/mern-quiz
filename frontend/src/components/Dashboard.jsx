import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash, Eye, Share2 } from "lucide-react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quizzes/my-quizzes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setQuizzes(data.data);
      } else {
        toast.error("Failed to fetch quizzes.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching quizzes.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete-quiz/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Quiz deleted successfully.");
        setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
      } else {
        toast.error("Failed to delete quiz.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the quiz.");
    }
  };

  const handleShare = (id) => {
    const quizLink = `${window.location.origin}/attempt-quiz/${id}`;
    navigator.clipboard.writeText(quizLink);
    toast.success("Quiz link copied to clipboard!");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Quizzes</h1>

      {loading ? (
        <p className="text-gray-500">Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p className="text-gray-500">No quizzes found. Create your first quiz!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{quiz.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{quiz.description}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Created on: {new Date(quiz.createdAt).toLocaleDateString()}
              </p>

              <div className="flex justify-between items-center mt-4">
                <Link to={`/edit-quiz/${quiz._id}`} className="text-blue-500 hover:text-blue-700">
                  <Pencil size={20} />
                </Link>
                <button onClick={() => handleDelete(quiz._id)} className="text-red-500 hover:text-red-700">
                  <Trash size={20} />
                </button>
                <Link to={`/view-quiz/${quiz._id}`} className="text-green-500 hover:text-green-700">
                  <Eye size={20} />
                </Link>
                <button onClick={() => handleShare(quiz._id)} className="text-purple-500 hover:text-purple-700">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
