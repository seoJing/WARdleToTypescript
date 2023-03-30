import { useNavigate } from 'react-router-dom';
import styles from '../css/Ending.module.css';

function Clear({ score, handleRestart, buttonSound3 }) {
  const navigate = useNavigate();

  function handleOnClick() {
    buttonSound3.play();
    handleRestart();
    navigate('/');
  }

  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.GameClear}>GAME ClEAR!</div>
      <div className={styles.scoreText}>
        축하합니다!{<br></br>}
        당신의 스코어 : {score}
      </div>
      <button onClick={handleOnClick} className={styles.navigationToHome}>
        다시하기
      </button>
      <div className={styles.tips}>
        Phase1을 늦게 깨면 스코어를 더 얻을 수 있지만{<br></br>}
        그만큼 Phase2의 난이도가 올라갑니다.{<br></br>}
        고득점을 노려보세요!
      </div>
    </>
  );
}

export { Clear };
