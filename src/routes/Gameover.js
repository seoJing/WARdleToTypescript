import { useNavigate } from 'react-router-dom';
import styles from '../css/Gameover.module.css';
import buttonSound3Wav from '../sound/button3.wav';

function Gameover({ handleRestart }) {
  const buttonSound3 = new Audio(buttonSound3Wav);
  buttonSound3.volume = 0.1;

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
