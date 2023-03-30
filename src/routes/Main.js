import styles from '../css/Main.module.css';
import { useNavigate } from 'react-router-dom';
import wardleLogo from '../img/WARdle.png';

function Main({ mainSound, buttonSound3 }) {
  const navigate = useNavigate();

  function navigateToPhase1() {
    buttonSound3.play();
    mainSound.play();
    navigate('/Phase1');
  }
  function navigateToHelp1() {
    buttonSound3.play();
    navigate('/Help');
  }

  return (
    <>
      <img src={wardleLogo} alt="logo" className={styles.logo}></img>
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
        made by seoJing{<br></br>}
        {<a href="https://github.com/seoJing/WARdle">소스코드 보러가기</a>}
        {<br></br>}
        {
          <a href="https://fresh-neighbor-48b.notion.site/WARdle-2023-03-02-43adcf4d9ea5450db7b70339d73478b8">
            개발일지 보러가기
          </a>
        }
      </div>
    </>
  );
}

export { Main };
