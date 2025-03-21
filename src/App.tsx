import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Hangul from 'hangul-js';

import { Main } from './routes/Main';
import { Phase1 } from './routes/Phase1';
import { Phase2 } from './routes/Phase2';
import { Gameover } from './routes/Gameover';
import { Clear } from './routes/Clear';
import { Help } from './routes/Help';
import { Death } from './routes/Death';
import { rightAnswerArr } from './rightAnswerArr';

import mainSoundMp3 from './sound/main.mp3';
import buttonSound1Wav from './sound/button.wav';
import buttonSound2Wav from './sound/button2.wav';
import buttonSound3Wav from './sound/button3.wav';
import graySoundWav from './sound/gray.wav';
import greenSoundWav from './sound/green.wav';
import orangeSoundWav from './sound/orange.wav';

const mainSound: HTMLAudioElement = new Audio(mainSoundMp3);
mainSound.loop = true;
mainSound.volume = 0.4;
const buttonSound1: HTMLAudioElement = new Audio(buttonSound1Wav);
const buttonSound2: HTMLAudioElement = new Audio(buttonSound2Wav);
const buttonSound3: HTMLAudioElement = new Audio(buttonSound3Wav);
buttonSound1.volume = 0.1;
buttonSound2.volume = 0.1;
buttonSound3.volume = 0.1;
const graySound: HTMLAudioElement = new Audio(graySoundWav);
const greenSound: HTMLAudioElement = new Audio(greenSoundWav);
const orangeSound: HTMLAudioElement = new Audio(orangeSoundWav);
greenSound.volume = 0.5;
orangeSound.volume = 0.5;
graySound.volume = 0.5;

function App() {
  const [checkArr, setCheckArr] = useState<string[][]>([]);
  const [answerArr, setAnswerArr] = useState<string[][]>([]);
  const [score, setScore] = useState<number>(0);
  const [rightAnswer, setRightAnswer] = useState<string>(
    rightAnswerArr[Math.floor(Math.random() * rightAnswerArr.length)]
  );
  const disassembleRightAnswer: string[] = Hangul.disassemble(rightAnswer);

  const handleRestart = (): void => {
    document.body.style.background = '#2BAE66';
    mainSound.pause();
    mainSound.currentTime = 0;
    setRightAnswer(
      rightAnswerArr[Math.floor(Math.random() * rightAnswerArr.length)]
    );
    setCheckArr([]);
    setAnswerArr([]);
    setScore(0);
  };

  const preventClose = (e: Event): void => {
    e.preventDefault();
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();
  }, []);
  //basename={process.env.PUBLIC_URL}
  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path={`/`}
            element={<Main mainSound={mainSound} buttonSound3={buttonSound3} />}
          />
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
                rightAnswer={disassembleRightAnswer}
                buttonSound1={buttonSound1}
                greenSound={greenSound}
                graySound={graySound}
                orangeSound={orangeSound}
                buttonSound3={buttonSound3}
              ></Phase1>
            }
          ></Route>
          <Route
            path={`/Phase2`}
            element={
              <Phase2
                checkArr={checkArr}
                answerArr={answerArr}
                score={score}
                setScore={setScore}
                greenSound={greenSound}
                graySound={graySound}
              ></Phase2>
            }
          ></Route>
          <Route
            path={`/Gameover`}
            element={
              <Gameover
                handleRestart={handleRestart}
                buttonSound3={buttonSound3}
                rightAnswer={rightAnswer}
              ></Gameover>
            }
          ></Route>
          <Route
            path={`/Clear`}
            element={
              <Clear
                score={score}
                handleRestart={handleRestart}
                buttonSound3={buttonSound3}
              ></Clear>
            }
          ></Route>
          <Route
            path={`/Help`}
            element={
              <Help
                buttonSound1={buttonSound1}
                buttonSound2={buttonSound2}
              ></Help>
            }
          ></Route>
          <Route path={`/Death`} element={<Death></Death>}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export { App };
