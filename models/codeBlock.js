const mongoose = require('mongoose');

// Defining a schema for the CodeBlock
const codeBlockSchema = new mongoose.Schema({
    title: String,
    code: String,
    currentCode: {
        type: String,
        default: ''
    },
    users: [{ // List of users currently associated with the code block
        socketId: String,
        role: {
            type: String,
            enum: ['mentor', 'student']
        }
    }]
});

const CodeBlock = mongoose.model('CodeBlock', codeBlockSchema);

module.exports = CodeBlock;
