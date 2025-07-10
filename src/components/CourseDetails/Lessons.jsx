import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Lessons() {
  const { id } = useParams();
  const [contents, setContents] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});
  const [completedLessons, setCompletedLessons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const currentItem = contents[currentIndex];

  useEffect(() => {
    const fetchContents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/course-details/${id}/contents`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });
        setContents(response.data);
        console.log(response.data)

        const savedProgress = localStorage.getItem(`courseProgress_${id}`);
        if (savedProgress) {
          setCompletedLessons(JSON.parse(savedProgress));
        }
      } catch (err) {
        console.error("Error loading contents:", err);
        setError("Failed to load course contents.");
      } finally {
        setLoading(false);
      }
    };
    fetchContents();
  }, [id]);

  const saveProgress = async (updated) => {
    setCompletedLessons(updated);
    localStorage.setItem(`courseProgress_${id}`, JSON.stringify(updated));

    if (updated.length === contents.length) {
      try {
        await axios.post(
          `${API}/course-enrollment/lessons/complete`,
          { courseId: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
      } catch (err) {
        console.error("Error posting course completion:", err);
      }
    }
  };

  const handleOptionSelect = (quizId, questionIndex, selectedOption) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [quizId]: {
        ...(prev[quizId] || {}),
        [questionIndex]: selectedOption,
      },
    }));
  };

  const submitQuiz = async (quiz, index) => {
    let score = 0;
    const results = {};

    quiz.questions.forEach((question, qIdx) => {
      const isCorrect = quizAnswers[quiz.id]?.[qIdx] === question.correct;
      results[qIdx] = { isCorrect, correctAnswer: question.correct };
      if (isCorrect) score++;
    });

    const passed = score / quiz.questions.length >= 0.7;
    const percentage = Math.round((score / quiz.questions.length) * 100);

    const newResults = {
      score,
      total: quiz.questions.length,
      percentage,
      details: results,
      passed,
    };

    setQuizResults((prev) => ({
      ...prev,
      [quiz.id]: newResults,
    }));

    if (passed && !completedLessons.includes(index)) {
      const updated = [...completedLessons, index];
      await saveProgress(updated);
    }
  };

  const handleNext = async () => {
    if (currentItem.type === "video" && !completedLessons.includes(currentIndex)) {
      const updated = [...completedLessons, currentIndex];
      await saveProgress(updated);
    }
    if (currentIndex < contents.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-700"
            style={{ width: `${(completedLessons.length / contents.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          {completedLessons.length}/{contents.length} lessons completed
        </p>
      </div>

      {/* Lesson Content */}
      {currentItem && (
        <div className="bg-white rounded-xl shadow-md p-3 space-y-6 border border-gray-100">
          <h2 className="text-2xl font-bold i text-center">{currentItem.title}</h2>

          {currentItem.type === "video" && (
  <>
    <div className="w-full aspect-w-16 aspect-h-9 mb-4">
      <iframe
        className="w-full h-64 sm:h-96 rounded"
        src={
        //   currentItem.video_url.includes("watch?v=")
        //     ? currentItem.video_url.replace("watch?v=", "embed/")
        //     : currentItem.video_url
        currentIndex.video_url

        }
        allowFullScreen
      ></iframe>
    </div>
    <p className="text-gray-700">{currentItem.description}</p>
    <div className="flex justify-end">
      <button
        onClick={handleNext}
        className="mt-4 Btn px-6 py-2 rounded-lg shadow transition"
      >
        Next
      </button>
    </div>
  </>
)}


         {currentItem.type === "quiz" && (
  <>
    {currentItem.questions.map((q, idx) => (
      <div key={idx} className="mb-6 p-3">
        <p className="font-medium mb-4 i text-lg">
          {idx + 1}. {q.question}
        </p>
        <div className="space-y-3  mx-auto">
          {q.options.map((option, oIdx) => {
            const selected = quizAnswers[currentItem.id]?.[idx] === option;
            const result = quizResults[currentItem.id]?.details?.[idx];
            return (
              <label
                key={oIdx}
                className={`block px-4 py-3 rounded-lg cursor-pointer text-left transition border shadow-sm ${
                  result
                    ? result.isCorrect && option === q.correct
                      ? "bg-green-100 border-green-400 text-green-900"
                      : selected
                      ? "bg-red-100 border-red-400 text-red-900"
                      : "border-gray-300"
                    : selected
                    ? "bg-blue-100 border-blue-400"
                    : "hover:bg-gray-100 border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${idx}`}
                  value={option}
                  checked={selected}
                  onChange={() => handleOptionSelect(currentItem.id, idx, option)}
                  disabled={!!quizResults[currentItem.id]}
                  className="hidden"
                />
                {option}
              </label>
            );
          })}
        </div>
      </div>
    ))}

    {!quizResults[currentItem.id] ? (
      <div className="flex justify-center mt-6">
        <button
          onClick={() => submitQuiz(currentItem, currentIndex)}
          className="btnn px-6 py-2 rounded-lg  transition disabled:opacity-50"
          disabled={
            !quizAnswers[currentItem.id] ||
            Object.keys(quizAnswers[currentItem.id] || {}).length < currentItem.questions.length
          }
        >
          Submit Quiz
        </button>
      </div>
    ) : (
      <div
        className={`mt-6 p-4 rounded-lg text-center font-semibold border ${
          quizResults[currentItem.id].passed
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-red-50 text-red-700 border-red-200"
        }`}
      >
        {quizResults[currentItem.id].passed
          ? `✅ Passed! Score: ${quizResults[currentItem.id].percentage}%`
          : `❌ Failed. Score: ${quizResults[currentItem.id].percentage}%`}

        <div className="mt-4">
          {quizResults[currentItem.id].passed ? (
            <button
              onClick={handleNext}
              className="Btn px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Next Lesson
            </button>
          ) : (
            <button
              onClick={() => {
                setQuizResults((prev) => {
                  const updated = { ...prev };
                  delete updated[currentItem.id];
                  return updated;
                });
                setQuizAnswers((prev) => {
                  const updated = { ...prev };
                  delete updated[currentItem.id];
                  return updated;
                });
              }}
              className="Btn px-5 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
              Retry Quiz
            </button>
          )}
        </div>
      </div>
    )}
  </>
)}

        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mt-3 disabled:opacity-40"
        >
          ⬅ Back
        </button>
        <span className="text-sm text-gray-600">
          Lesson {currentIndex + 1} of {contents.length}
        </span>
      </div>
    </div>
  );
}
