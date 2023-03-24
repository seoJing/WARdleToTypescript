import { useNavigate } from 'react-router-dom';
import styles from '../css/Help.module.css';
import exitImg from '../img/exit.png';
import exImg from '../img/ex.png';

function Help2() {
  const navigate = useNavigate();

  function navigatorToMain() {
    navigate('/');
  }
  function navigateToNextHelp() {
    navigate('/Help3');
  }
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.text2}>
        또한 Phase1을 진행하면
        {<br></br>} 스코어를 얻을 수 있습니다
        {<br></br>} 초록색 = +10
        {<br></br>} 주황색 = +5
      </div>
      <div className={styles.title}>
        WARdle은 2가지 Phase로 나누어 진행됩니다.
      </div>
      <div className={styles.head_text}>Phase1 Wordle</div>
      <img src={exImg} className={styles.ex} alt="ex"></img>
      <div className={styles.page}>Help 2/4</div>
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

export { Help2 };
