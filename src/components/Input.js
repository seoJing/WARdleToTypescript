import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Hangul from 'hangul-js';
import styles from '../css/Phase1.module.css';

function checkAnswer(
  answer,
  setScore,
  setInputText,
  rightAnswer,
  navigateToPhase2
) {
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
    navigateToPhase2();
  }

  return newCheck;
}

function Input({ setCheckArr, setAnswerArr, setScore, rightAnswer }) {
  const [inputText, setInputText] = useState(['']);

  const navigate = useNavigate();
  const navigateToPhase2 = useCallback(() => {
    navigate('/Phase2');
  }, [navigate]);

  function handleKeyDown(event) {
    if (event.code === 'Backspace') return;

    event.preventDefault();

    if (event.code !== 'Enter' || event.nativeEvent.isComposing) return;

    if (Hangul.disassemble(event.target.value).length === rightAnswer.length) {
      const newAnswer = Hangul.disassemble(event.target.value);
      const newCheck = checkAnswer(
        newAnswer,
        setScore,
        setInputText,
        rightAnswer,
        navigateToPhase2
      );

      setAnswerArr((current) => [...current, newAnswer]);
      setCheckArr((current) => [...current, newCheck]);
      event.target.value = '';
    } else {
      setInputText(`정답은 ${rightAnswer.length}글자입니다!!`);
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
    </>
  );
}

export default Input;
