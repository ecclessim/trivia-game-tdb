import React, { useState, useEffect } from 'react';
import './question.css';
import sanitizeHtml from 'sanitize-html';

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function MultipleQuestion(props) {
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(generateOptions());
  }, []);

  const generateOptions = () => {
    let optionArray = [props.trivia.correct_answer];
    for (let i = 0; i < props.trivia.incorrect_answers.length; i++) {
      optionArray.push(props.trivia.incorrect_answers[i]);
    }
    shuffleArray(optionArray);
    return optionArray;
  };

  const handleCheckAnswer = (selectedAnswer) => {
    setIsCorrect(selectedAnswer === props.trivia.correct_answer);
    setIsAnswered(true);
  };

  const handleAnswerClick = (selectedAnswer) => {
    props.countAnswered();
    handleCheckAnswer(selectedAnswer);
  };

  useEffect(() => {
    props.handleScore(isCorrect);
  }, [isCorrect]);
  return (
    <div className="trivia-body">
      <div className="question">
        <p>{sanitizeHtml(props.trivia.question)}</p>
      </div>
      <div className="answer-input">
        {options.map((o, i) => {
          return (
            <div
              key={o + i}
              // style={
              //   o === props.trivia.correct_answer
              //     ? {
              //         backgroundColor: 'rgba(144, 255, 170, 0.3)',
              //       }
              //     : {}
              // }
            >
              <p
                style={
                  isAnswered ? { pointerEvents: 'none', opacity: '0.4' } : {}
                }
                onClick={() => {
                  handleAnswerClick(options[i]);
                }}
              >
                {'>'} {sanitizeHtml(o)}
              </p>
            </div>
          );
        })}
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
