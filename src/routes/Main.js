import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <Link to={`${process.env.PUBLIC_URL}/Phase1`}>
        <h1>Phase1</h1>
      </Link>
      <Link to={`${process.env.PUBLIC_URL}/Phase2`}>
        <h1>Phase2</h1>
      </Link>
    </>
  );
}

export { Main };
