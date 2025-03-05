import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, []);

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
      } else {
        toast.error("Failed to fetch quiz.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the quiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0, explanation: "" },
      ],
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quizzes/${id}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(quiz),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Quiz updated successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Failed to update quiz.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the quiz.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Quiz Title */}
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Quiz Title"
          />

          {/* Quiz Description */}
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Quiz Description"
          />

          {/* Questions Section */}
          {quiz.questions.map((q, qIndex) => (
            <div key={qIndex} className="border p-4 rounded mb-4 dark:border-gray-700">
              {/* Question Text */}
              <input
                type="text"
                value={q.questionText}
                onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                className="w-full p-2 border rounded mb-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder={`Question ${qIndex + 1}`}
              />

              {/* Answer Options */}
              {q.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder={`Option ${oIndex + 1}`}
                  />
                  <input
                    type="radio"
                    name={`correctAnswer-${qIndex}`}
                    checked={q.correctAnswerIndex === oIndex}
                    onChange={() => handleQuestionChange(qIndex, "correctAnswerIndex", oIndex)}
                    className="ml-2"
                  />
                </div>
              ))}

              {/* Explanation */}
              <textarea
                value={q.explanation}
                onChange={(e) => handleQuestionChange(qIndex, "explanation", e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white mt-2"
                placeholder="Explanation (Optional)"
              />
            </div>
          ))}

          {/* Add Question Button */}
          <button
            onClick={handleAddQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
          >
            + Add Question
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2 ml-4 hover:bg-green-600"
          >
            Save Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default EditQuiz;
