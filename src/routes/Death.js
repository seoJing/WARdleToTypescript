import { useNavigate } from 'react-router-dom';
import styles from '../css/Phase2.module.css';
import deathImg from '../img/playerDeath.gif';

function Death({ graySound }) {
  const navigate = useNavigate();

  setTimeout(function () {
    graySound.play();
    navigate('/Gameover');
  }, 1000);

  return (
    <>
      <div className={styles.background}></div>
      <img src={deathImg} alt={'deathImg'} className={styles.deathImg}></img>
    </>
  );
}

export { Death };
