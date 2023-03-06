import { Main } from './routes/Main';
import { Phase1 } from './routes/Phase1';
import { Phase2 } from './routes/Phase2';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Hangul = require('hangul-js');

const rightAnswerArr = ['정답', '성찬', '동근', '컴공', '남악'];
const rightAnswer = Hangul.disassemble(
  rightAnswerArr[Math.floor(Math.random() * 5)]
);

/*
const query = encodeURIComponent('성찬'); // 한글 검색어 인코딩
const url = `/api/search.do?certkey_no=4896&key=402B006003314065E15631D7480E9316&type_search=search&req_type=xml&q=${query}`;

fetch(url)
  .then((response) => response.text())
  .then((xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    console.log(xmlDoc);
  })
  .catch((error) => console.error(error)); // 실패
*/

function App() {
  const [checkArr, setCheckArr] = useState([]);
  const [answerArr, setAnswerArr] = useState([]);

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Main />} />
          <Route
            path={`${process.env.PUBLIC_URL}/Phase1`}
            element={
              <Phase1
                checkArr={checkArr}
                setCheckArr={setCheckArr}
                answerArr={answerArr}
                setAnswerArr={setAnswerArr}
              ></Phase1>
            }
          ></Route>
          <Route
            path={`${process.env.PUBLIC_URL}/Phase2`}
            element={
              <Phase2 checkArr={checkArr} answerArr={answerArr}></Phase2>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export { App, rightAnswer };
