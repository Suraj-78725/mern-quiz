"use client"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, ChevronLeft, Info, CheckCircle } from "lucide-react"

const ExplanationPage = () => {
  const location = useLocation()
  const { questions } = location.state || { questions: [] }
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md">
          <Info className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Questions Available</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">There are no questions to display explanations for.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header with progress */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Results
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Question Explanations</h1>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Question {currentIndex + 1} of {questions.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <span className="inline-block px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-md mb-3">
              Question {currentIndex + 1}
            </span>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{currentQuestion.questionText}</h2>
            <div className="flex items-start space-x-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Correct Answer:</p>
                <p>{currentQuestion.options[currentQuestion.correctAnswerIndex]}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-start space-x-2 mb-4">
              <Info className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Explanation</h3>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{currentQuestion.explanation}</p>

            {currentQuestion.explanationImages && currentQuestion.explanationImages.length > 0 && (
              <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <img
                  src={currentQuestion.explanationImages[0] || "/placeholder.svg"}
                  alt="Explanation Image"
                  className="w-full max-h-80 object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
            className={`
              flex items-center px-5 py-2.5 rounded-lg font-medium transition-all duration-200
              ${
                currentIndex === 0
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700"
              }
            `}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
            disabled={currentIndex === questions.length - 1}
            className={`
              flex items-center px-5 py-2.5 rounded-lg font-medium transition-all duration-200
              ${
                currentIndex === questions.length - 1
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
              }
            `}
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExplanationPage

