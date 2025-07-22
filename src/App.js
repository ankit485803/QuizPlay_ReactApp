

//  App.js – Main Logic





import React, { useState, useEffect } from "react";
import Question from "./Question";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "London"],
    correct: 2,
    explanation: "Paris is the capital of France.",
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: 3,
    explanation: "JavaScript is the language of the web browser.",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
    ],
    correct: 1,
    explanation: "CSS stands for Cascading Style Sheets.",
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "1993"],
    correct: 1,
    explanation: "JavaScript was launched in 1995.",
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Apple", "Facebook", "Microsoft"],
    correct: 2,
    explanation: "React was developed by Facebook.",
  },
];





export default function App() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          if (selected === null) {
            if (currentQ + 1 < questions.length) {
              setCurrentQ(currentQ + 1);
            } else {
              setShowResult(true);
            }
            setSelected(null);
            setShowExplanation(false);
            return 10;
          }
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [currentQ, selected]);

  const handleAnswer = (index) => {
    setSelected(index);
    setShowExplanation(true);
    if (index === questions[currentQ].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowExplanation(false);
      setTimer(10);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setTimer(10);
    setShowExplanation(false);
  };

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", padding: "30px" }}>
      <h2>🧠 Interactive Quiz App</h2>
      {showResult ? (
        <div>
          <h3>Your Score: {score} / {questions.length}</h3>
          <h4>{score >= 4 ? "🎉 Great Job!" : "🙁 Try Again!"}</h4>
          <button onClick={restartQuiz} style={{ padding: "10px 20px", marginTop: "20px" }}>
            🔁 Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <p>Question {currentQ + 1} of {questions.length} | ⏳ {timer}s</p>
          <Question
            data={questions[currentQ]}
            onAnswer={handleAnswer}
            selected={selected}
          />
          {showExplanation && (
            <p style={{ color: "#555", marginTop: "10px" }}>
              💡 {questions[currentQ].explanation}
            </p>
          )}
          <button
            onClick={handleNext}
            disabled={selected === null}
            style={{
              padding: "10px 20px",
              marginTop: "20px",
              cursor: selected !== null ? "pointer" : "not-allowed",
            }}
          >
            Next ➡️
          </button>
          <progress
            value={currentQ + 1}
            max={questions.length}
            style={{ width: "100%", marginTop: "20px" }}
          />
        </div>
      )}
    </div>
  );
}