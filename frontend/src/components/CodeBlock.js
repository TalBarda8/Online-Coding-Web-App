import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

import ace from 'ace-builds';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

ace.config.set('basePath', '/static/js');

function CodeBlock() {
    const [codeBlock, setCodeBlock] = useState({});
    const [socket, setSocket] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/code-blocks/${id}`)
            .then(response => response.json())
            .then(data => setCodeBlock(data))
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
            <AceEditor
                mode="javascript"
                theme="monokai"
                value={codeBlock.code}
                onChange={newCode => {
                    setCodeBlock({ ...codeBlock, code: newCode });
                }}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                readOnly={false}
            />
        </div>
    );
}

export default CodeBlock;
