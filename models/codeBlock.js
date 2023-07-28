const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
    title: String,
    code: String,
    currentCode: {
        type: String,
        default: ''
    },
    users: [{
        socketId: String,
        role: {
            type: String,
            enum: ['mentor', 'student']
        }
    }]
});

const CodeBlock = mongoose.model('CodeBlock', codeBlockSchema);

module.exports = CodeBlock;
