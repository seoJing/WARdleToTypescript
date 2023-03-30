import styles from '../css/Phase2.module.css';
import exitImg from '../img/exit.png';

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

  const navigatorToGameover = () => {
    const confirmed = window.confirm(
      `정말로 포기 하시겠습니까? \n예를 누를 시에 새로고침이 됩니다.`
    );
    if (confirmed) {
      window.location.reload();
    }
  };

  return (
    <>
      <img
        src={exitImg}
        className={styles.exit_button}
        onClick={navigatorToGameover}
        alt="exit_button"
      ></img>
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
