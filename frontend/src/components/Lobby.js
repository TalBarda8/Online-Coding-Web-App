import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../LobbyStyle.css';
import '../GlobalStyle.css';

function Lobby() {
  // State for holding the list of code blocks and potential errors
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of code blocks from the server
    fetch('https://online-coding-web-application-production.up.railway.app/code-blocks')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Response:', response); // Debugging purpose
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Debugging purpose
        setCodeBlocks(data); // Update the state with fetched data
      })
      .catch(error => {
        console.error('Error fetching code blocks:', error);
        setError(error.message); // Update the state with error message
      });
  }, []);

  return (
    <div className="lobby container">
        <h1>Choose code block</h1>
        {error && <p>Error: {error}</p>}
        <ul className="code-block-list">
            {codeBlocks.map(block => (
                <li key={block._id} className="code-block-item">
                    <Link to={`/code-block/${block._id}`}>{block.title}</Link>
                </li>
            ))}
        </ul>

        {/* Display a message if there are no code blocks and no error */}
        {codeBlocks.length === 0 && !error && <p>No code blocks available.</p>}
    </div>
  );
}

export default Lobby;