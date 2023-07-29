import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import io from 'socket.io-client';

import ace from 'ace-builds';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

import '../CodeBlockStyle.css';

// Set the base path for Ace Editor to find required static files
ace.config.set('basePath', '/static/js');

function CodeBlock() {
    // State declarations
    const [codeBlock, setCodeBlock] = useState({});
    const [socket, setSocket] = useState(null);
    const [role, setRole] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        // Fetch the specific code block from the server using the ID from the URL params
        fetch(`${process.env.REACT_APP_BACKEND_URL}/code-blocks/${id}`)
            .then(response => response.json())
            .then(data => {
                setCodeBlock({
                    ...data,
                    code: data.currentCode ? data.currentCode : data.code
                });
            })
            .catch(error => console.error("Error fetching code block:", error));

        // Initialize the socket connection
        const socketInstance = io('http://localhost:3000', {
            path: '/socket.io'
        });

        // Handle any connection errors
        socketInstance.on('connect_error', (error) => {
            console.error('Connection Error:', error);
        });

        socketInstance.emit('joinCodeBlock', id);

        socketInstance.on('assignRole', (assignedRole) => {
            setRole(assignedRole);
        });

        // Listen for any code updates and apply them
        socketInstance.on('receiveCodeUpdate', (updatedCode) => {
            setCodeBlock((prevCodeBlock) => ({
                ...prevCodeBlock,
                code: updatedCode
            }));
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.off('assignRole');
            socketInstance.off('receiveCodeUpdate');
            socketInstance.off('connect');
            socketInstance.off('connect_error');
            socketInstance.disconnect();
        };
    }, [id]);

    return (
        <div className="code-block-page">
            <div className="code-block-content">
                <h1 className="code-block-header">{codeBlock.title}</h1>
                <AceEditor
                    mode="javascript"
                    theme="monokai"
                    value={codeBlock.code}
                    onChange={newCode => {
                        // Update code block content locally and emit changes if the role is 'student'
                        setCodeBlock({ ...codeBlock, code: newCode });
                        if (role === 'student') {
                            socket.emit('codeUpdate', { codeBlockId: id, newCode });
                        }
                    }}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    readOnly={role === 'mentor'}
                />
                {/* Rreturn to the lobby button */}
                <Link to="/">
                    <button className="button">Back to Lobby</button>
                </Link>
            </div>
        </div>
    );
}

export default CodeBlock;