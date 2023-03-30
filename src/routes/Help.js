import styles from '../css/Help.module.css';
import exitImg from '../img/exit.png';
import exImg0 from '../img/ex.png';
import exImg1 from '../img/ex2.png';
import exImg2 from '../img/ex3.png';
import exImg3 from '../img/ex3.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Help({ buttonSound1, buttonSound2 }) {
  const [exImg, setExImg] = useState(0);
  const [contents, setContents] = useState(<></>);
  const [page, setPage] = useState(0);
  if (page > 3) setPage(0);
  if (exImg > 3) setExImg(0);

  const getImageSrc = () => {
    switch (exImg) {
      case 0:
        return exImg0;
      case 1:
        return exImg1;
      case 2:
        return exImg2;
      case 3:
        return exImg3;
      default:
        return '';
    }
  };

  useEffect(() => {
    if (page === 0) {
      setContents(
        <>
          기본적인 룰은 기존의 wordle과 같습니다
          {<br></br>} 위치O, 자소O = 초록색
          {<br></br>} 위치X, 자소O = 주황색
          {<br></br>} 포함되지 않는 자소 = 회색
        </>
      );
    } else if (page === 1) {
      setContents(
        <>
          또한 Phase1을 진행하면
          {<br></br>} 스코어를 얻을 수 있습니다
          {<br></br>} 초록색 = +10, 주황색 = +5
          {<br></br>} 또한 힌트와 얻는 점수를
          {<br></br>} 확인할 수 있습니다.
        </>
      );
    } else if (page === 2) {
      setContents(
        <>
          Phase1 에서 나온
          {<br></br>} 초록색, 주황색, 회색 칸들은
          {<br></br>} 발판, 장애물이 됩니다
          {<br></br>} 초록색 = 발판
          {<br></br>} 주황색 = 회전 장애물, 발판
          {<br></br>} 회색 = 좌우 이동 장애물
        </>
      );
    } else if (page === 3) {
      setContents(
        <>
          또한, Phase1에서
          {<br></br>} 얻은 스코어는 Phase2에서
          {<br></br>} 제한 시간이 됩니다
          {<br></br>} 스코어는 매초 마다 줄어드며
          {<br></br>} 장애물에 부딪혀도 줄어듭니다
        </>
      );
    }
  }, [page]);

  const navigate = useNavigate();
  const navigatorToMain = () => {
    buttonSound1.play();
    navigate('/main');
  };
  const navigateToNextHelp = () => {
    buttonSound2.play();
    setPage((current) => current + 1);
    setExImg((current) => current + 1);
  };
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.text1}>{contents}</div>
      <div className={styles.title}>
        WARdle은 2가지 Phase로 나누어 진행됩니다.
      </div>
      <img src={getImageSrc()} className={styles.ex} alt="ex"></img>
      <div className={styles.page}>Help 1/4</div>
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

export { Help };
