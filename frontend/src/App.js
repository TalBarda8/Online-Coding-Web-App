import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Lobby from './components/Lobby.js';
import CodeBlock from './components/CodeBlock.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/code-block/:id" element={<CodeBlock />} />
      </Routes>
    </Router>
  );
}

export default App;
