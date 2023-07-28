import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Lobby() {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/code-blocks')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Response:', response); // Debugging
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Debugging
        setCodeBlocks(data);
      })
      .catch(error => {
        console.error('Error fetching code blocks:', error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Choose code block</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {codeBlocks.map(block => (
          <li key={block._id}>
            <Link to={`/code-block/${block._id}`}>{block.title}</Link>
          </li>
        ))}
      </ul>
      {codeBlocks.length === 0 && !error && <p>No code blocks available.</p>}
    </div>
  );
}

export default Lobby;
