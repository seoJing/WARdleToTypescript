import { rightAnswer } from '../App';
const Hangul = require('hangul-js');

function checkAnswer(answer) {
  let newCheck = 'X'.repeat(rightAnswer.length);
  let checkIndex = [];

  for (let i = 0; i < rightAnswer.length; i++) {
    if (answer[i] === rightAnswer[i]) {
      newCheck = newCheck.slice(0, i) + 'O' + newCheck.slice(i + 1);
      checkIndex.push(i);
    }
  }

  for (let i = 0; i < rightAnswer.length; i++) {
    const result = rightAnswer.indexOf(answer[i]);
    if (result !== -1 && !checkIndex.includes(result)) {
      newCheck = newCheck.slice(0, i) + 'C' + newCheck.slice(i + 1);
      checkIndex.push(result);
    }
  }

  return newCheck;
}

function Input({ checkArr, setCheckArr, answerArr, setAnswerArr }) {
  function handleKeyDown(event) {
    if (
      event.code === 'Enter' &&
      event.nativeEvent.isComposing === false &&
      Hangul.disassemble(event.target.value).length === rightAnswer.length
    ) {
      event.preventDefault();

      const newAnswer = Hangul.disassemble(event.target.value);
      const newCheck = checkAnswer(newAnswer);

      const newAnswerArr = [...answerArr, newAnswer];
      setAnswerArr(newAnswerArr);
      const newCheckArr = [...checkArr, newCheck];
      setCheckArr(newCheckArr);

      event.target.value = '';
    } else if (event.code !== 'Backspace') {
      event.preventDefault();
    }
  }

  return (
    <>
      <form onKeyDown={handleKeyDown}>
        <input type={'text-area'}></input>
      </form>
    </>
  );
}

export default Input;
