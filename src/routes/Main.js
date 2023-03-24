import styles from '../css/Main.module.css';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  function navigateToPhase1() {
    navigate('/Phase1');
  }
  function navigateToHelp1() {
    navigate('/Help1');
  }

  return (
    <>
      <div className={styles.background}></div>
      <div onClick={navigateToPhase1} className={styles.start_button}></div>
      <div onClick={navigateToPhase1} className={styles.start_button_text}>
        시작하기
      </div>
      <div onClick={navigateToHelp1} className={styles.help_button}></div>
      <div onClick={navigateToHelp1} className={styles.help_button_text}>
        도움말
      </div>
      <div className={styles.start_div}></div>
      <div className={styles.introduce}>
        made by seoJing{<br></br>}https://github.com/seoJing/WARdle
      </div>
    </>
  );
}

export { Main };
