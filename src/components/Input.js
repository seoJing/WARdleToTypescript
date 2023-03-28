import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hangul from 'hangul-js';
import styles from '../css/Phase1.module.css';
import greenSoundWav from '../sound/green.wav';
import orangeSoundWav from '../sound/orange.wav';
import graySoundWav from '../sound/gray.wav';
import ButtonSound3Wav from '../sound/button3.wav';

function Input({ setCheckArr, setAnswerArr, setScore, rightAnswer }) {
  const [inputText, setInputText] = useState(['']);
  const [nextButton, setNextButton] = useState(<></>);
  const [isRight, setIsRight] = useState(false);

  const greenSound = new Audio(greenSoundWav);
  const orangeSound = new Audio(orangeSoundWav);
  const graySound = new Audio(graySoundWav);
  const ButtonSound3 = new Audio(ButtonSound3Wav);

  greenSound.volume = 0.5;
  orangeSound.volume = 0.5;
  graySound.volume = 0.5;
  ButtonSound3.volume = 0.1;

  const navigate = useNavigate();
  function navigateToPhase2() {
    ButtonSound3.play();
    navigate('/Phase2');
  }

  function checkAnswer(answer) {
    let newCheck = Array(rightAnswer.length).fill('X');
    let checkIndex = [];
    setInputText([]);

    for (let i = 0; i < rightAnswer.length; i++) {
      const newPlusScore = <li key={`${i}o`}>+10 score!</li>;
      if (answer[i] === rightAnswer[i]) {
        newCheck[i] = 'O';
        checkIndex.push(i);
        setScore((current) => current + 10);
        setInputText((current) => [...current, newPlusScore]);
      }
    }

    for (let i = 0; i < rightAnswer.length; i++) {
      const result = rightAnswer.indexOf(answer[i]);
      const newPlusScore = <li key={`${i}c`}>+5 score!</li>;
      if (result !== -1 && !checkIndex.includes(result)) {
        newCheck[i] = 'C';
        checkIndex.push(result);
        setScore((current) => current + 5);
        setInputText((current) => [...current, newPlusScore]);
      }
    }

    if (newCheck.every((char) => char === 'O')) {
      setInputText('정답입니다!');
      setIsRight(true);
      setNextButton(
        <button onClick={navigateToPhase2} className={styles.nextButton}>
          Phase2 이동
        </button>
      );
    }

    return newCheck;
  }

  function handleKeyDown(event) {
    if (event.code === 'Backspace') return;

    event.preventDefault();

    if (event.code !== 'Enter' || event.nativeEvent.isComposing) return;

    if (!isRight) {
      if (
        Hangul.disassemble(event.target.value).length === rightAnswer.length
      ) {
        const newAnswer = Hangul.disassemble(event.target.value);
        const newCheck = checkAnswer(newAnswer);

        if (newCheck.includes('O')) greenSound.play();
        else if (newCheck.includes('C')) orangeSound.play();
        else if (newCheck.every((char) => char === 'X')) graySound.play();
        setAnswerArr((current) => [...current, newAnswer]);
        setCheckArr((current) => [...current, newCheck]);
        event.target.value = '';
      } else {
        setInputText(`정답은 ${rightAnswer.length}글자입니다!!`);
      }
    } else {
      navigateToPhase2();
    }
  }

  return (
    <>
      <input
        onKeyDown={handleKeyDown}
        className={styles.input}
        type={'text'}
      ></input>
      <div className={styles.inputTextDiv}></div>
      <div className={styles.inputText}>{inputText}</div>
      {nextButton}
    </>
  );
}

export default Input;
