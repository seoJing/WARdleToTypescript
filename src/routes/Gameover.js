import { useNavigate } from 'react-router-dom';
import styles from '../css/Gameover.module.css';

function Gameover({ handleRestart }) {
  const navigate = useNavigate();

  function handleOnClick() {
    handleRestart();
    navigate('/');
  }

  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.Gameover}>GAMEOVER</div>
      <div className={styles.overText}>
        주어진 스코어를{<br></br>}
        모두 소진했습니다
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
