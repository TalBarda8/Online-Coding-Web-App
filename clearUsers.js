// Script to clear users from all code blocks
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://TalBarda:J8BqaRq54%23XXshX@cluster0.mnibqg2.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const CodeBlock = require('./models/codeBlock');

async function clearUsers() {
    try {
        await CodeBlock.updateMany({}, { users: [] });
        console.log('Successfully cleared users from all code blocks!');
    } catch (error) {
        console.error('Error while clearing users:', error);
    } finally {
        mongoose.disconnect();
    }
}

clearUsers();
