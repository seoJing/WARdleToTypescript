import { useEffect, useRef } from 'react';
import styles from '../css/Phase1.module.css';

interface ContentProps {
  answerArr: string[][];
  checkArr: string[][];
}

const Content: React.FC<ContentProps> = ({ answerArr, checkArr }) => {
  const scrollRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  useEffect(() => {
    // 현재 스크롤 위치 === scrollRef.current.scrollTop
    // 스크롤 길이 === scrollRef.current.scrollHeight
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });
  // answerArr와 checkArr을 받아와서 content 변수에 map 함수를 이용하여 새로운 배열을 생성한다.
  const content: JSX.Element[] = answerArr.map((row: string[], i: number) => {
    // row와 i를 받아와서 spans 변수에 map 함수를 이용하여 새로운 배열을 생성한다.
    const spans: JSX.Element[] = row.map((char: string, j: number) => {
      // checkArr의 i, j 위치에 따라서 color 변수에 적절한 색상 값을 할당한다.
      const color =
        checkArr[i][j] === 'O'
          ? '#2BAE66'
          : checkArr[i][j] === 'C'
          ? '#ebb20a'
          : '#90949d';

      // span 태그를 생성하고, style 속성을 이용하여 color 변수에 할당된 색상으로 배경색을 지정한다.
      return (
        <span
          className={styles.content}
          style={{ backgroundColor: color }}
          key={`${i}-${j}`}
        >
          {char}
        </span>
      );
    });

    // div 태그를 생성하고, display 속성을 이용하여 가운데 정렬을 한다.
    return (
      <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
        {spans}
      </div>
    );
  });

  // content 변수에 저장된 배열을 div 태그로 감싸서 반환한다.
  return (
    <div
      ref={scrollRef}
      style={{
        marginTop: '39px',
        marginRight: '7px',
        overflow: 'scroll',
        width: '541px',
        height: '550px',
        boxShadow: 'inset 0px 5px 12px 5px rgba(0, 0, 0, 0.25)',
      }}
    >
      {content}
    </div>
  );
};

export default Content;
