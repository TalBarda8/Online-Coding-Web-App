import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import io from 'socket.io-client';

function CodeBlock({ match }) {
    const [codeBlock, setCodeBlock] = useState({});
    const [socket, setSocket] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/code-blocks/${id}`)
            .then(response => response.json())
            .then(data => {
                setCodeBlock(data);
                hljs.highlightBlock(document.getElementById('code-display'));
            })
            .catch(error => console.error("Error fetching code block:", error));

        const socketInstance = io('http://localhost:3000');
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [id]);

    return (
        <div>
            <h1>{codeBlock.title}</h1>
            <pre>
                <code id="code-display">
                    {codeBlock.code}
                </code>
            </pre>
        </div>
    );
}

export default CodeBlock;
