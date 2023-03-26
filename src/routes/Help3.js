import { useNavigate } from 'react-router-dom';
import styles from '../css/Help.module.css';
import exitImg from '../img/exit.png';
import exImg from '../img/ex3.png';

function Help3() {
  const navigate = useNavigate();

  function navigatorToMain() {
    navigate('/');
  }
  function navigateToNextHelp() {
    navigate('/Help4');
  }
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.text3}>
        Phase1 에서 나온
        {<br></br>} 초록색, 주황색, 회색 칸들은
        {<br></br>} 발판, 장애물이 됩니다
        {<br></br>} 초록색 = 발판
        {<br></br>} 주황색 = 회전 장애물, 발판
        {<br></br>} 회색 = 좌우 이동 장애물
      </div>
      <div className={styles.title}>
        WARdle은 2가지 Phase로 나누어 진행됩니다.
      </div>
      <img src={exImg} className={styles.ex} alt="ex"></img>
      <div className={styles.page}>Help 3/4</div>
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

export { Help3 };
