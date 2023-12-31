const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'https://unrivaled-starburst-e93483.netlify.app' }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
});

// Connect to MongoDB
const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

const codeBlockRoutes = require('./routes/codeBlockRoutes');
app.use('/code-blocks', codeBlockRoutes);

// Set up the HTTP server and Socket.io
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "https://unrivaled-starburst-e93483.netlify.app",
      methods: ["GET", "POST"]
    }
});

const CodeBlock = require('./models/codeBlock');

// Set up socket event listeners
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinCodeBlock', async (codeBlockId) => {
        try {
            let codeBlock = await CodeBlock.findById(codeBlockId);

            if (!codeBlock.users || codeBlock.users.length === 0) {
                socket.emit('assignRole', 'mentor');
                codeBlock.users.push({ socketId: socket.id, role: 'mentor' });
            } else {
                socket.emit('assignRole', 'student');
                codeBlock.users.push({ socketId: socket.id, role: 'student' });
            }

            console.log("Current users in code block:", codeBlock.users);

            await codeBlock.save()
                .then(() => {
                    console.log("Code block users updated successfully!");
                })
                .catch(err => {
                    console.error("Error saving code block:", err);
                });
        } catch (error) {
            console.error("Error while joining code block:", error);
        }
    });

    socket.on('sendCodeUpdate', (newCode) => {
        socket.broadcast.emit('receiveCodeUpdate', newCode);
    });

    socket.on('codeUpdate', async ({ codeBlockId, newCode }) => {
        try {
            const codeBlock = await CodeBlock.findById(codeBlockId);
            codeBlock.currentCode = newCode || codeBlock.code;
            await codeBlock.save();
            socket.broadcast.emit('receiveCodeUpdate', newCode);
        } catch (error) {
            console.error("Error while updating code:", error);
        }
    });   

    socket.on('disconnect', async () => {
        console.log('Client disconnected');
    
        try {
            let codeBlock = await CodeBlock.findOne({ "users.socketId": socket.id });
    
            if (codeBlock) {
                codeBlock.users = codeBlock.users.filter(user => user.socketId !== socket.id);
                await codeBlock.save();
            }
        } catch (error) {
            console.error("Error while handling client disconnection:", error);
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});