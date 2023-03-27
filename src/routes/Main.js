import styles from '../css/Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import music from '../music/main.mp3';

function Main() {
  const [audio] = useState(new Audio(music)); // 음악 파일 경로 설정
  const [isPlaying, setIsPlaying] = useState(false); // 음악 재생 여부 상태

  useEffect(() => {
    if (isPlaying) {
      audio.play(); // 음악 재생
    } else {
      audio.pause(); // 음악 일시정지
    }
  }, [isPlaying, audio]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying); // 음악 재생 여부 상태 변경
  };

  const navigate = useNavigate();
  function navigateToPhase1() {
    navigate('/Phase1');
  }
  function navigateToHelp1() {
    navigate('/Help1');
  }

  return (
    <>
      <div>
        <button onClick={togglePlay}>{isPlaying ? '일시정지' : '재생'}</button>{' '}
        // 재생/일시정지 버튼
      </div>
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
