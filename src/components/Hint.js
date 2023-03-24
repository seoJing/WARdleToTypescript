import { useEffect, useRef, useState } from 'react';
import styles from '../css/Phase1.module.css';

const hangulArr = [
  ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ'],
  ['ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ'],
  ['ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
  ['ㅏ', 'ㅑ', 'ㅐ', 'ㅒ', 'ㅓ'],
  ['ㅕ', 'ㅔ', 'ㅖ', 'ㅗ', 'ㅛ'],
  ['ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'],
];

function Hint({ checkArr, answerArr }) {
  const spansRef = useRef([]);
  const [changedIndices, setChangedIndices] = useState([[]]);

  let hintArr = hangulArr.map((row, i) => {
    const spans = row.map((char, j) => {
      const key = `${i}-${j}`;
      const index = changedIndices.findIndex((index) => index.key === key);
      return (
        <span
          className={styles.hint}
          key={key}
          ref={(el) => (spansRef.current[key] = el)}
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
    if (checkArr && checkArr.length && answerArr && answerArr.length) {
      checkArr[checkArr.length - 1].forEach((element, index) => {
        const target = answerArr[answerArr.length - 1][index];
        const i = hangulArr.findIndex((row) => row.includes(target));
        const j = hangulArr[i].indexOf(target);
        const key = `${i}-${j}`;
        const isChange = changedIndices.find((index) => index.key === key);

        if (element === 'X' && !isChange) {
          spansRef.current[key].style.backgroundColor = '#90949d';
          setChangedIndices((current) => [
            ...current,
            { key, color: '#90949d' },
          ]);
        } else if (element === 'O' && !isChange) {
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
        }
      });
    }
  }, [checkArr, answerArr]);

  return <div style={{ marginTop: '23px', marginLeft: '18px' }}>{hintArr}</div>;
}

export default Hint;
