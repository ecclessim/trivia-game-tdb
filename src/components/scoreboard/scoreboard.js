import React from 'react';
import './scoreboard.css';

export default function Scoreboard({ score, scoreLen }) {
  return (
    <div className="scoreboard">
      <p>
        {score} / {scoreLen}
      </p>
    </div>
  );
}
