import { useEffect, useRef, useState } from 'react';
import styles from '../css/Phase1.module.css';
import React from "react"; 

import { InputObj } from './Contents';

type ChangedIndices = {
  changedIndices: number;
  setChangedIndices: any;
  key: number;
  color: string;
}

const hangulArr:string[][] = [
  ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ'],
  ['ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ'],
  ['ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
  ['ㅏ', 'ㅑ', 'ㅐ', 'ㅒ', 'ㅓ'],
  ['ㅕ', 'ㅔ', 'ㅖ', 'ㅗ', 'ㅛ'],
  ['ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'],
];

function Hint({ checkArr, answerArr }: InputObj):React.JSX.Element  {
  const spansRef = useRef<HTMLSpanElement>(null);
  const [changedIndices, setChangedIndices] = useState<ChangedIndices[]>([]);

  let hintArr = hangulArr.map((row:string[], i:number):React.JSX.Element => {
    const spans = row.map((char:string, j:number):React.JSX.Element => {
      const key:number = Number(`${i}-${j}`);
      const index:number = changedIndices.findIndex((index) => index.key === key);
      return (
        <span
          className={styles.hint}
          key={key}
          ref={(el) => spansRef.current && (spansRef.current[key] = el)}
          style={{
            backgroundColor:  
              index >= 0 ? changedIndices[index].color : '#FCF6F5',
          }}
        >
          {char}
        </span>
      );
    });
    return (
      <div key={i} style={{ display: 'flex' }}>
        {spans}
      </div>
    );
  });

  useEffect(() => {
    if (checkArr?.length && answerArr?.length) {
      const lastCheckArr:string[] = checkArr[checkArr.length - 1];
      const lastAnswerArr:string[] = answerArr[answerArr.length - 1];

      lastCheckArr.forEach((element:string, index:number): void => {
        const target:string = lastAnswerArr[index];
        const i:number = hangulArr.findIndex((row) => row.includes(target));
        const j:number = hangulArr[i].indexOf(target);
        const key:number = Number(`${i}-${j}`);
        const isChange: ChangedIndices | undefined = changedIndices.find((index) => index.key === key);

        if (element === 'O') {
          spansRef.current[key].style.backgroundColor = '#2BAE66';
          setChangedIndices((current) => [
            ...current,
            { key, color: '#2BAE66' },
          ]);
        } else if (element === 'C' && !isChange) {
          spansRef.current[key].style.backgroundColor = '#ebb20a';
          setChangedIndices((current) => [
            ...current,
            { key, color: '#ebb20a' },
          ]);
        } else if (element === 'X' && !isChange) {
          spansRef.current[key].style.backgroundColor = '#90949d';
          setChangedIndices((current) => [
            ...current,
            { key, color: '#90949d' },
          ]);
        }
      });
    }
  }, [checkArr, answerArr]);

  return <div style={{ marginTop: '23px', marginLeft: '18px' }}>{hintArr}</div>;
}

export default Hint;
