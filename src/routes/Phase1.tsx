import Input from '../components/Input';
import Content from '../components/Contents';
import styles from '../css/Phase1.module.css';
import Hint from '../components/Hint';
import exitImg from '../img/exit.png';

import { useNavigate } from 'react-router-dom';

interface Phase1Props {
  checkArr: string[][];
  setCheckArr: React.Dispatch<React.SetStateAction<string[][]>>;
  answerArr: string[][];
  setAnswerArr: React.Dispatch<React.SetStateAction<string[][]>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  rightAnswer: string[];
  buttonSound1: HTMLAudioElement;
  greenSound: HTMLAudioElement;
  graySound: HTMLAudioElement;
  orangeSound: HTMLAudioElement;
  buttonSound3: HTMLAudioElement;
}

const Phase1: React.FC<Phase1Props> = ({
  checkArr,
  setCheckArr,
  answerArr,
  setAnswerArr,
  score,
  setScore,
  rightAnswer,
  buttonSound1,
  greenSound,
  graySound,
  orangeSound,
  buttonSound3,
}) => {
  const navigate = useNavigate();
  const navigatorToGameover = () => {
    buttonSound1.play();
    const confirmed: boolean = window.confirm(
      `정말로 포기 하시겠습니까? \n포기할 시 정답을 확인할 수 있습니다.`
    );
    if (confirmed) {
      graySound.play();
      navigate('/Death');
    }
  };

  return (
    <>
      <img
        src={exitImg}
        className={styles.exit_button}
        onClick={navigatorToGameover}
        alt="exit_button"
      ></img>
      <div className={styles.background}></div>
      <div className={styles.score}>{score}</div>
      <Input
        setCheckArr={setCheckArr}
        answerArr={answerArr}
        setAnswerArr={setAnswerArr}
        setScore={setScore}
        rightAnswer={rightAnswer}
        greenSound={greenSound}
        graySound={graySound}
        orangeSound={orangeSound}
        buttonSound3={buttonSound3}
      ></Input>
      <div className={styles.hintDiv}>
        <Hint checkArr={checkArr} answerArr={answerArr}></Hint>
      </div>
      <div className={styles.contentsDiv}>
        <Content checkArr={checkArr} answerArr={answerArr}></Content>
      </div>
    </>
  );
};

export { Phase1 };
