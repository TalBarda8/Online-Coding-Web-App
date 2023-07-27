import React, { useState, useEffect } from 'react';
import 'highlight.js/styles/github.css';


function Lobby() {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/code-blocks') 
      .then(response => response.json())
      .then(data => setCodeBlocks(data))
      .catch(error => console.error("Error fetching code blocks:", error));
  }, []); 

  return (
    <div>
      <h1>Choose code block</h1>
      <ul>
        {codeBlocks.map(block => (
          <li key={block._id}>
            {block.title} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lobby;
