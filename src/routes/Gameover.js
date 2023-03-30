import { useNavigate } from 'react-router-dom';
import styles from '../css/Ending.module.css';

function Gameover({ handleRestart, buttonSound3, rightAnswer }) {
  const navigate = useNavigate();

  function handleOnClick() {
    buttonSound3.play();
    handleRestart();
    navigate('/');
  }

  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.Gameover}>GAMEOVER</div>
      <div className={styles.overText}>
        클리어에 실패했습니다{<br></br>}
        Phase1 정답 : {rightAnswer}
      </div>
      <button onClick={handleOnClick} className={styles.navigationToHome}>
        다시하기
      </button>
      <div className={styles.tips}>
        Phase1을 빨리 깨면 스코어를 적게 받지만{<br></br>}
        그만큼 Phase2의 난이도가 내려갑니다{<br></br>}
        전략적인 판단을 내려보세요..!
      </div>
    </>
  );
}

export { Gameover };
