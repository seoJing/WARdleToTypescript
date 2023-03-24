import Input from '../components/Input';
import Content from '../components/Contents';
import styles from '../css/Phase1.module.css';
import Hint from '../components/Hint';

function Phase1({
  checkArr,
  setCheckArr,
  answerArr,
  setAnswerArr,
  score,
  setScore,
  rightAnswer,
  setBackgroundColor,
}) {
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.score}>{score}</div>
      <Input
        checkArr={checkArr}
        setCheckArr={setCheckArr}
        answerArr={answerArr}
        setAnswerArr={setAnswerArr}
        score={score}
        setScore={setScore}
        rightAnswer={rightAnswer}
        setBackgroundColor={setBackgroundColor}
      ></Input>
      <div className={styles.hintDiv}>
        <Hint checkArr={checkArr} answerArr={answerArr}></Hint>
      </div>
      <div className={styles.contentsDiv}>
        <Content checkArr={checkArr} answerArr={answerArr}></Content>
      </div>
    </>
  );
}

export { Phase1 };
