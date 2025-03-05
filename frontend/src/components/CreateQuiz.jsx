"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { Plus, Trash2, Clock, CheckCircle, HelpCircle, BookOpen, Save, FileText, AlignLeft } from "lucide-react"

const CreateQuiz = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [timeLimit, setTimeLimit] = useState()
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""], // Default 4 empty options
      correctAnswerIndex: 0,
      explanation: "",
    },
  ])

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index][field] = value
    setQuestions(updatedQuestions)
  }

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[qIndex].options[oIndex] = value
    setQuestions(updatedQuestions)
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0, explanation: "" },
    ])
  }

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index)
    setQuestions(updatedQuestions)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const quizData = {
      title,
      description,
      timeLimit: Number(timeLimit),
      questions,
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quizzes/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(quizData),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success("Quiz Created Successfully!")
        setTitle("")
        setDescription("")
        setTimeLimit(30)
        setQuestions([{ questionText: "", options: ["", "", "", ""], correctAnswerIndex: 0, explanation: "" }])
      } else {
        toast.error(result.message || "Failed to create quiz")
      }
    } catch (error) {
      toast.error("An error occurred while creating the quiz")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6 flex items-center justify-center gap-2">
        <FileText className="w-6 h-6" />
        Create a New Quiz
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Quiz Title
          </label>
          <input
            type="text"
            placeholder="Enter an engaging quiz title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <AlignLeft className="w-4 h-4" />
            Quiz Description
          </label>
          <textarea
            placeholder="Describe what this quiz is about"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time Limit (minutes)
          </label>
          <input
            type="number"
            placeholder="How much time to complete?"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
          />
        </div>

        {/* Questions Section */}
        <div className="space-y-6 mt-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Questions
          </h3>

          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="p-5 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-750 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Question {qIndex + 1}</h4>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                    aria-label="Remove question"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your question here"
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                />

                {/* Options */}
                <div className="mt-3 space-y-3 ">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Answer Options</p>
                  {q.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuestionChange(qIndex, "correctAnswerIndex", oIndex)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          q.correctAnswerIndex === oIndex
                            ? "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                            : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                        }`}
                        aria-label={q.correctAnswerIndex === oIndex ? "Correct answer" : "Mark as correct answer"}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        placeholder={`Option ${oIndex + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        required
                        className="flex-1 w-[10rem] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Explanation
                  </label>
                  <textarea
                    type="text"
                    placeholder="Explain the correct answer"
                    value={q.explanation}
                    onChange={(e) => handleQuestionChange(qIndex, "explanation", e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Question Button */}
        <button
          type="button"
          onClick={addQuestion}
          className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Another Question
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-all mt-4"
        >
          <Save className="w-5 h-5" />
          Create Quiz
        </button>
      </form>
    </div>
  )
}

export default CreateQuiz
