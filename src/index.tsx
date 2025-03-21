import ReactDOM from 'react-dom/client';
import { App } from './App';

// getElementById가 null을 반환할 수 있으므로, null 체크를 추가합니다.
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  // rootElement가 null일 경우 처리할 로직 추가
  console.error('No element with id "root" found.');
}

// body 스타일 설정
const body = document.body.style;
body.position = 'relative';
body.width = '1440px';
body.height = '1024px';
body.background = '#2BAE66';
