import React, { useState, useRef } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0); // Start with the first question
  const [question, setQuestion] = useState(data[index]);
  const [answered, setAnswered] = useState(false); // Track if the question has been answered
  const [lock, setLock] = useState(false); // Prevent re-answering questions
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); // Track if quiz is completed

  const [score, setScore] = useState(0);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (answered) return;

      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct"); // Highlight correct answer
      }
      setAnswered(true); // Mark as answered
    }
  };

  const nextQuestion = () => {
    // Clear the previous option styles (correct/incorrect)
    option_array.forEach((option) => {
      option.current.classList.remove("wrong", "correct");
    });

    // Move to the next question
    if (index < data.length - 1) {
      setIndex((prevIndex) => prevIndex + 1); // Move to the next question
      setQuestion(data[index + 1]); // Set the next question
      setAnswered(false); // Reset answered state for the next question
      setLock(false); // Reset the lock for the next question
    } else {
      // End the quiz when all questions are answered
      setIsQuizCompleted(true);
    }
  };
  // Reset the quiz to start over
  const resetQuiz = () => {
    setIndex(0); // Reset the index to start from the first question
    setQuestion(data[0]); // Reset the question to the first one
    setAnswered(false); // Reset answered state
    setLock(false); // Reset the lock
    setScore(0); // Reset the score
    setIsQuizCompleted(false); // Reset quiz completion state
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {/* Display quiz result when quiz is completed */}
      {isQuizCompleted ? (
        <div className="result">
          <h2>Quiz Completed!</h2>
          <p>Your final score is: {score}</p>
          {/* Reset button to restart the quiz */}
          <button onClick={resetQuiz}>Reset Quiz</button>
        </div>
      ) : (
        <>
          {/* Display the current question if quiz is not completed */}
          <h2>
            {index + 1}. {question.question}
          </h2>

          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>

          <button onClick={nextQuestion} disabled={!answered}>
            Next
          </button>
          <div className="index">
            {index + 1} of {data.length} Questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
