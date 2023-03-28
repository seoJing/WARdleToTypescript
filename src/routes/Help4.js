import { useNavigate } from 'react-router-dom';
import styles from '../css/Help.module.css';
import exitImg from '../img/exit.png';
import exImg from '../img/ex3.png';
import buttonSoundWav from '../sound/button.wav';

function Help4() {
  const buttonSound = new Audio(buttonSoundWav);
  buttonSound.volume = 0.1;

  const navigate = useNavigate();

  function navigatorToMain() {
    buttonSound.play();
    navigate(`${process.env.PUBLIC_URL}/`);
  }
  function navigateToNextHelp() {
    buttonSound.play();
    navigate(`${process.env.PUBLIC_URL}/Help1`);
  }
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.text4}>
        또한, Phase1에서
        {<br></br>} 얻은 스코어는 Phase2에서
        {<br></br>} 제한 시간이 됩니다
        {<br></br>} 스코어는 매초 마다 줄어드며
        {<br></br>} 장애물에 부딪혀도 줄어듭니다
      </div>
      <div className={styles.title}>
        WARdle은 2가지 Phase로 나누어 진행됩니다.
      </div>
      <img src={exImg} className={styles.ex} alt="ex"></img>
      <div className={styles.page}>Help 4/4</div>
      <img
        src={exitImg}
        className={styles.exit_button}
        onClick={navigatorToMain}
        alt="exit_button"
      ></img>
      <div
        className={styles.next_help_button}
        onClick={navigateToNextHelp}
      ></div>
    </>
  );
}

export { Help4 };
