import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="min-h-screen bg-futoWhite flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-futoGreen mb-4">
            Welcome to Vite + React + Tailwind CSS
          </h1>
          <p className="text-blue-700">
            Edit <code className="text-pink-600">src/App.jsx</code> and save to reload.
          </p>
          <button
            className="mt-4 bg-futoGreen text-white px-4 py-2 rounded"
            onClick={() => setCount(count + 1)}
          >
            Count is {count}
          </button>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;