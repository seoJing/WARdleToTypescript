import { useEffect, useRef, useState } from 'react';
import styles from '../css/Phase1.module.css';

interface HintProps {
  checkArr: string[][];
  answerArr: string[][];
}

interface ChangedIndex {
  key: string;
  color: string;
}

const hangulArr: string[][] = [
  ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ'],
  ['ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ'],
  ['ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
  ['ㅏ', 'ㅑ', 'ㅐ', 'ㅒ', 'ㅓ'],
  ['ㅕ', 'ㅔ', 'ㅖ', 'ㅗ', 'ㅛ'],
  ['ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'],
];

const Hint: React.FC<HintProps> = ({ checkArr, answerArr }) => {
  const spansRef = useRef<{ [key: string]: HTMLSpanElement }>({});
  const [changedIndices, setChangedIndices] = useState<Array<ChangedIndex>>([]);

  let hintArr: JSX.Element[] = hangulArr.map((row: string[], i: number) => {
    const spans: JSX.Element[] = row.map((char: string, j: number) => {
      const key: string = `${i}-${j}`;
      const index: number = changedIndices.findIndex(
        (changedIndex: ChangedIndex) => changedIndex.key === key
      );
      return (
        <span
          className={styles.hint}
          key={key}
          ref={(el) => {
            if (el) {
              spansRef.current[key] = el;
            }
          }}
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
      const lastCheckArr: string[] = checkArr[checkArr.length - 1];
      const lastAnswerArr: string[] = answerArr[answerArr.length - 1];

      lastCheckArr.forEach((element: string, index: number) => {
        const target: string = lastAnswerArr[index];
        const i: number = hangulArr.findIndex((row: string[]) =>
          row.includes(target)
        );
        const j: number = hangulArr[i].indexOf(target);
        const key = `${i}-${j}`;
        const isChange = changedIndices.find(
          (changedIndex: ChangedIndex) => changedIndex.key === key
        );

        if (element === 'O') {
          if (spansRef.current[key]) {
            spansRef.current[key].style.backgroundColor = '#2BAE66';
            setChangedIndices((current) => [
              ...current,
              { key, color: '#2BAE66' },
            ]);
          }
        } else if (element === 'C' && !isChange) {
          if (spansRef.current[key]) {
            spansRef.current[key].style.backgroundColor = '#ebb20a';
            setChangedIndices((current) => [
              ...current,
              { key, color: '#ebb20a' },
            ]);
          }
        } else if (element === 'X' && !isChange) {
          if (spansRef.current[key]) {
            spansRef.current[key].style.backgroundColor = '#90949d';
            setChangedIndices((current) => [
              ...current,
              { key, color: '#90949d' },
            ]);
          }
        }
      });
    }
  }, [checkArr, answerArr, changedIndices]);

  return <div style={{ marginTop: '23px', marginLeft: '18px' }}>{hintArr}</div>;
};

export default Hint;
