import style from '../css/Contents.module.css';

function Content({ answerArr, checkArr }) {
  const content = answerArr.map((row, i) => {
    const spans = row.map((char, j) => {
      const color =
        checkArr[i][j] === 'O'
          ? 'green'
          : checkArr[i][j] === 'C'
          ? 'yellow'
          : 'gray';

      return (
        <span
          style={{
            backgroundColor: color,
            fontSize: '50px',
            margin: '5px',
            padding: '10px',
          }}
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

  return <div>{content}</div>;
}

export default Content;
