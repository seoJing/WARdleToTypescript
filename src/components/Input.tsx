import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hangul from 'hangul-js';
import styles from '../css/Phase1.module.css';

interface InputProps {
  setCheckArr: React.Dispatch<React.SetStateAction<string[][]>>;
  setAnswerArr: React.Dispatch<React.SetStateAction<string[][]>>;
  answerArr: string[][];
  setScore: React.Dispatch<React.SetStateAction<number>>;
  rightAnswer: string[];
  greenSound: HTMLAudioElement;
  orangeSound: HTMLAudioElement;
  graySound: HTMLAudioElement;
  buttonSound3: HTMLAudioElement;
}

const doubleConsonantArr: string[] = ['ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ'];
const changedDoubleConsonantArr: string[] = ['ㄱ', 'ㄷ', 'ㅂ', 'ㅅ', 'ㅈ'];

const Input: React.FC<InputProps> = ({
  setCheckArr,
  setAnswerArr,
  answerArr,
  setScore,
  rightAnswer,
  greenSound,
  orangeSound,
  graySound,
  buttonSound3,
}) => {
  const [inputText, setInputText] = useState<JSX.Element[]>([]);
  const [nextButton, setNextButton] = useState<JSX.Element>(<></>);
  const [isRight, setIsRight] = useState<boolean>(false);

  const navigate = useNavigate();
  const navigateToPhase2 = () => {
    buttonSound3.play();
    navigate('/Phase2');
  };

  const checkAnswer = (answer: string[]): string[] => {
    let newCheck: string[] = Array(rightAnswer.length).fill('X');
    setInputText([]);

    answer.forEach((e: string, i: number): void => {
      if (e === rightAnswer[i]) {
        const newPlusScore: JSX.Element = <li key={`${i}o`}>+10 score!</li>;
        newCheck[i] = 'O';
        setScore((current) => current + 10);
        setInputText((current) => [...current, newPlusScore]);
      }
    });

    let checkIndex: number[] = [];
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
      setInputText([<span>정답입니다!</span>]);
      setIsRight(true);
      setNextButton(
        <button onClick={navigateToPhase2} className={styles.nextButton}>
          Phase2 이동
        </button>
      );
    }

    return newCheck;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === 'Backspace') return;

    event.preventDefault();

    if (event.code !== 'Enter' || event.nativeEvent.isComposing) return;

    const inputElement = event.target as HTMLInputElement;
    const newAnswer: string[] = Hangul.disassemble(inputElement.value);
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

    const alreadyInput = (newAnswer: string[]): boolean => {
      let joimedNewAnswer = newAnswer.join('');
      for (let i = 0; i < answerArr.length; i++) {
        if (joimedNewAnswer === answerArr[i].join('')) return true;
      }
      return false;
    };

    if (!isRight) {
      const pattern: RegExp = /(.)\1{2}/;
      if (answerArr.length !== 0 && alreadyInput(newAnswer)) {
        setInputText([<span>이미 입력한 단어입니다.</span>]);
        graySound.play();
      } else if (
        !pattern.test(newAnswer.join('')) &&
        Hangul.assemble(newAnswer).length <= 3
      ) {
        if (newAnswer.length === rightAnswer.length) {
          const newCheck: string[] = checkAnswer(newAnswer);

          if (newCheck.includes('O')) greenSound.play();
          else if (newCheck.includes('C')) orangeSound.play();
          else if (newCheck.every((char) => char === 'X')) graySound.play();
          setAnswerArr((current) => [...current, newAnswer]);
          setCheckArr((current) => [...current, newCheck]);
          inputElement.value = '';
        } else {
          setInputText([<span>정답은 6개의 자소로 이루어져 있습니다!!</span>]);
          graySound.play();
        }
      } else {
        setInputText([<span>올바르지 않은 단어입니다.</span>]);
        graySound.play();
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
};

export default Input;
