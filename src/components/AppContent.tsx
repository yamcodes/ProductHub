import { useState, useEffect } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import '../App.css';
import useProducts from '../hooks/useProducts.hook';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const { status, error } = useProducts();

  // useEffect(() => {
  //   const init = async () => {
  //     const client = new ProductsClient();
  //     const products = await client.getProducts();
  //     setMessage(JSON.stringify(products));
  //   };
  //   init();
  // });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>Message: {message}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>Status: {status} </p>
      {error && <p>Error: {error.message}</p>}
    </>
  );
}

export default App;
