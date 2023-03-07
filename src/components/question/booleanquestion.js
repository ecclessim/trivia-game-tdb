import React, { useState, useEffect } from 'react';
import './question.css';
import sanitizeHtml from 'sanitize-html';

export default function BooleanQuestion(props) {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleCheckAnswer = (selectedValue) => {
    const answer = props.trivia.correct_answer.toLowerCase() === 'true';
    setIsCorrect(selectedValue === answer);
    setIsAnswered(true);
  };

  const handleAnswerClick = (selectedValue) => {
    props.countAnswered();
    handleCheckAnswer(selectedValue);
  };

  useEffect(() => {
    props.handleScore(isCorrect);
  }, [isCorrect]);

  return (
    <div className="trivia-body">
      <div className="question">
        <p>
          {sanitizeHtml(props.trivia.question)}
        </p>
      </div>
      <div className="answer-input">
        <button
          disabled={isAnswered}
          onClick={() => {
            handleAnswerClick(true);
          }}
        >
          True
        </button>
        <button
          disabled={isAnswered}
          onClick={() => {
            handleAnswerClick(false);
          }}
        >
          False
        </button>
        {isCorrect !== null && (
          <>
            {isCorrect ? (
              <div className="green"></div>
            ) : (
              <div className="red"></div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
