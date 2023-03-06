import Input from '../components/Input';
import Content from '../components/Contents';

function Phase1({ checkArr, setCheckArr, answerArr, setAnswerArr }) {
  return (
    <>
      <Input
        checkArr={checkArr}
        setCheckArr={setCheckArr}
        answerArr={answerArr}
        setAnswerArr={setAnswerArr}
      ></Input>
      <Content checkArr={checkArr} answerArr={answerArr}></Content>
    </>
  );
}

export { Phase1 };
