import styles from '../css/Phase1.module.css';

function Content({ answerArr, checkArr }) {
  const content = answerArr.map((row, i) => {
    const spans = row.map((char, j) => {
      const color =
        checkArr[i][j] === 'O'
          ? '#2BAE66'
          : checkArr[i][j] === 'C'
          ? '#ebb20a'
          : '#90949d';

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

    return (
      <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
        {spans}
      </div>
    );
  });

  return <div style={{ marginTop: '39px', marginRight: '7px' }}>{content}</div>;
}

export default Content;
