import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hangul from 'hangul-js';
import styles from '../css/Phase1.module.css';

const doubleConsonantArr = ['ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ'];
const changedDoubleConsonantArr = ['ㄱ', 'ㄷ', 'ㅂ', 'ㅅ', 'ㅈ'];

function Input({
  setCheckArr,
  setAnswerArr,
  setScore,
  rightAnswer,
  greenSound,
  orangeSound,
  graySound,
  buttonSound3,
}) {
  const [inputText, setInputText] = useState(['']);
  const [nextButton, setNextButton] = useState(<></>);
  const [isRight, setIsRight] = useState(false);

  const navigate = useNavigate();
  const navigateToPhase2 = () => {
    buttonSound3.play();
    navigate('/Phase2');
  };

  const checkAnswer = (answer) => {
    let newCheck = Array(rightAnswer.length).fill('X');
    setInputText([]);

    answer.forEach((e, i) => {
      if (e === rightAnswer[i]) {
        const newPlusScore = <li key={`${i}o`}>+10 score!</li>;
        newCheck[i] = 'O';
        setScore((current) => current + 10);
        setInputText((current) => [...current, newPlusScore]);
      }
    });

    let checkIndex = [];
    answer.forEach((e, i) => {
      let findIndex = rightAnswer.indexOf(e);
      const isFind = checkIndex.includes(findIndex);

      if (isFind) {
        const sliceRightAnswer = rightAnswer.slice(findIndex + 1);
        const newFindIndex = sliceRightAnswer.indexOf(e);
        if (newFindIndex !== -1) findIndex = newFindIndex + findIndex + 1;
        else findIndex = -1;
      }

      if (findIndex !== -1 && newCheck[findIndex] !== 'O') {
        checkIndex.push(findIndex);
        const newPlusScore = <li key={`${i}c`}>+5 score!</li>;
        newCheck[i] = 'C';
        setScore((current) => current + 5);
        setInputText((current) => [...current, newPlusScore]);
      }
    });

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
  };

  const handleKeyDown = (event) => {
    if (event.code === 'Backspace') return;

    event.preventDefault();

    if (event.code !== 'Enter' || event.nativeEvent.isComposing) return;

    const newAnswer = Hangul.disassemble(event.target.value);
    newAnswer.forEach((e, i) => {
      const index = doubleConsonantArr.indexOf(e);
      if (index !== -1) {
        newAnswer.splice(
          i,
          1,
          changedDoubleConsonantArr[index],
          changedDoubleConsonantArr[index]
        );
      }
    });

    if (!isRight) {
      const pattern = /(.)\1{2}/;
      if (!pattern.test(newAnswer.join(''))) {
        if (newAnswer.length === rightAnswer.length) {
          const newCheck = checkAnswer(newAnswer);

          if (newCheck.includes('O')) greenSound.play();
          else if (newCheck.includes('C')) orangeSound.play();
          else if (newCheck.every((char) => char === 'X')) graySound.play();
          setAnswerArr((current) => [...current, newAnswer]);
          setCheckArr((current) => [...current, newCheck]);
          event.target.value = '';
        } else {
          setInputText(`정답은 6개의 자소로 이루어져 있습니다!!`);
        }
      } else {
        setInputText(`올바르지 않은 단어입니다.`);
      }
    } else {
      navigateToPhase2();
    }
  };

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
