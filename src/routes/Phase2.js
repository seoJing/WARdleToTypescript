import styles from '../css/Phase2.module.css';
import { PhaserGame } from '../components/PhaserGame';

function Phase2({
  answerArr,
  checkArr,
  score,
  setScore,
  greenSound,
  graySound,
}) {
  document.body.style.background = '#FCF6F5';

  return (
    <>
      <div className={styles.background}></div>
      <h1 className={styles.score}>{score}</h1>
      <div className={styles.phaserGame}></div>
      <PhaserGame
        checkArr={checkArr}
        answerArr={answerArr}
        score={score}
        setScore={setScore}
        greenSound={greenSound}
        graySound={graySound}
      ></PhaserGame>
    </>
  );
}

export { Phase2 };
