import { Main } from './routes/Main';
import { Phase1 } from './routes/Phase1';
import { Phase2 } from './routes/Phase2';
import { Gameover } from './routes/Gameover';
import { Clear } from './routes/Clear';
import { Help1 } from './routes/Help1';
import { Help2 } from './routes/Help2';
import { Help3 } from './routes/Help3';
import { Help4 } from './routes/Help4';
import { Death } from './routes/Death';
import { rightAnswerArr } from './rightAnswerArr';
import mainSoundMp3 from './sound/main.mp3';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hangul from 'hangul-js';

const disassembledAnswers = rightAnswerArr.map((answer) =>
  Hangul.disassemble(answer)
);
const randomIndex = Math.floor(Math.random() * rightAnswerArr.length);
const initialAnswer = disassembledAnswers[randomIndex];

const mainSound = new Audio(mainSoundMp3);

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
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route
            path={`${process.env.PUBLIC_URL}/`}
            element={<Main mainSound={mainSound} />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/Phase1`}
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
            path={`${process.env.PUBLIC_URL}/Phase2`}
            element={
              <Phase2
                checkArr={checkArr}
                answerArr={answerArr}
                score={score}
                setScore={setScore}
                mainSound={mainSound}
              ></Phase2>
            }
          ></Route>
          <Route
            path={`${process.env.PUBLIC_URL}/Gameover`}
            element={
              <Gameover score={score} handleRestart={handleRestart}></Gameover>
            }
          ></Route>
          <Route
            path={`${process.env.PUBLIC_URL}/Clear`}
            element={
              <Clear score={score} handleRestart={handleRestart}></Clear>
            }
          ></Route>
          <Route
            path={`${process.env.PUBLIC_URL}/Help1`}
            element={<Help1></Help1>}
          ></Route>
          <Route
            path={`${process.env.PUBLIC_URL}/Help2`}
            element={<Help2></Help2>}
          ></Route>
          <Route
            path={`${process.env.PUBLIC_URL}/Help3`}
            element={<Help3></Help3>}
          ></Route>
          <Route
            path={`${process.env.PUBLIC_URL}/Help4`}
            element={<Help4></Help4>}
          ></Route>
          <Route
            path={`${process.env.PUBLIC_URL}/Death`}
            element={<Death></Death>}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export { App };
