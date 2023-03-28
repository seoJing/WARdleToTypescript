import { PhaserGame } from '../components/PhaserGame';
import styles from '../css/Phase2.module.css';

function Phase2({ answerArr, checkArr, score, setScore, mainSound }) {
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
        mainSound={mainSound}
      ></PhaserGame>
    </>
  );
}

export { Phase2 };
