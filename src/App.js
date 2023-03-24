import { Main } from './routes/Main';
import { Phase1 } from './routes/Phase1';
import { Phase2 } from './routes/Phase2';
import { Gameover } from './routes/Gameover';
import { Clear } from './routes/Clear';
import { Help1 } from './routes/Help1';
import { Help2 } from './routes/Help2';
import { Help3 } from './routes/Help3';
import { Help4 } from './routes/Help4';
import { rightAnswerArr } from './rightAnswerArr';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hangul from 'hangul-js';

const disassembledAnswers = rightAnswerArr.map((answer) =>
  Hangul.disassemble(answer)
);
const randomIndex = Math.floor(Math.random() * rightAnswerArr.length);
const initialAnswer = disassembledAnswers[randomIndex];

function App() {
  const [checkArr, setCheckArr] = useState([]);
  const [answerArr, setAnswerArr] = useState([]);
  const [score, setScore] = useState(0);
  const [rightAnswer, setRightAnswer] = useState(initialAnswer);

  function handleRestart() {
    const newIndex = Math.floor(Math.random() * rightAnswerArr.length);
    document.body.style.background = '#2BAE66';
    setRightAnswer(disassembledAnswers[newIndex]);
    setCheckArr([]);
    setAnswerArr([]);
    setScore(0);
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path={`/`} element={<Main />} />
          <Route
            path={`/Phase1`}
            element={
              <Phase1
                checkArr={checkArr}
                setCheckArr={setCheckArr}
                answerArr={answerArr}
                setAnswerArr={setAnswerArr}
                score={score}
                setScore={setScore}
                rightAnswer={rightAnswer}
              ></Phase1>
            }
          ></Route>
          <Route
            path={`/Phase2`}
            element={
              <Phase2
                checkArr={checkArr}
                setCheckArr={setCheckArr}
                answerArr={answerArr}
                score={score}
                setScore={setScore}
              ></Phase2>
            }
          ></Route>
          <Route
            path={`/Gameover`}
            element={
              <Gameover score={score} handleRestart={handleRestart}></Gameover>
            }
          ></Route>
          <Route
            path={`/Clear`}
            element={
              <Clear score={score} handleRestart={handleRestart}></Clear>
            }
          ></Route>
          <Route path={`/Help1`} element={<Help1></Help1>}></Route>
          <Route path={`/Help2`} element={<Help2></Help2>}></Route>
          <Route path={`/Help3`} element={<Help3></Help3>}></Route>
          <Route path={`/Help4`} element={<Help4></Help4>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export { App };
