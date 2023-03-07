import React, { useState, useEffect } from 'react';
import './style.css';
import BooleanQuestion from './components/question/booleanquestion';
import MultipleQuestion from './components/question/multiplequestion';
import Scoreboard from './components/scoreboard/scoreboard';
import FilterForm from './components/filterform';

export default function App() {
  const [trivias, setTrivias] = useState([]);
  const [score, setScore] = useState(0);
  const [scoreLen, setScoreLen] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [results, setResults] = useState(null);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const loadTrivias = () => {
    fetch(
      `https://opentdb.com/api.php?amount=${Math.ceil(
        Math.random() * 20
      )}&category=${category}&difficulty=${difficulty}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.results);
        setTrivias(data.results);
        setScoreLen(data.results.length);
        setResults(null);
      })
      .catch((err) => console.error(err));
  };

  const processScore = () => {
    const ratio = score / trivias.length;
    if (ratio === 1) return <p>nice, full marks</p>;
    else if (ratio >= 0.5)
      return <p>not bad, {`${Math.floor(ratio * 100)}%`}</p>;
    else return <p>git gud ({`${Math.floor(ratio * 100)}%`})</p>;
  };

  const refreshQuestions = () => {
    setScore(0);
    setAnsweredCount(0);
    loadTrivias();
  };

  const handleScore = (isCorrect) => {
    if (isCorrect) setScore((score) => score + 1);
  };

  const handleCount = () => {
    setAnsweredCount((answeredCount) => answeredCount + 1);
  };

  useEffect(() => {
    loadTrivias();
  }, []);

  useEffect(() => {
    if (trivias.length > 0 && answeredCount === trivias.length) {
      setTimeout(() => {
        const final = processScore();
        setResults(final);
      }, 3000);
    }
  }, [answeredCount, score]);
  return (
    <div>
      <Scoreboard score={score} scoreLen={scoreLen} />
      <button className="refresh" onClick={refreshQuestions}>
        Reload Questions
      </button>
      <FilterForm setCategory={setCategory} setDifficulty={setDifficulty} />
      {results !== null ? (
        <div className="results">{results}</div>
      ) : (
        <div className="question-container">
          {trivias.map((trivia, i) => {
            return trivia.type === 'multiple' ? (
              <div key={i + trivia.question} className="question-item">
                {i + 1}
                <MultipleQuestion
                  index={i}
                  trivia={trivia}
                  handleScore={handleScore}
                  countAnswered={handleCount}
                />
              </div>
            ) : (
              <div key={i + trivia.question} className="question-item">
                {i + 1}
                <BooleanQuestion
                  index={i}
                  trivia={trivia}
                  handleScore={handleScore}
                  countAnswered={handleCount}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
