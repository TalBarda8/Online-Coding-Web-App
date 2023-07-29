const mongoose = require('mongoose');
const CodeBlock = require('./models/codeBlock');

const MONGODB_URI = 'mongodb+srv://TalBarda:J8BqaRq54%23XXshX@cluster0.mnibqg2.mongodb.net/?retryWrites=true&w=majority';

// Connect to the MongoDB database
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', async () => {
    console.log('Connected to database.');

    // Code blocks array
    const blocks = [
        {
            title: 'Hello World in JavaScript',
            code: 'console.log("Hello World!");'
        },
        {
            title: 'Addition Function',
            code: [
                'function add(a, b) {',
                '    return a + b;',
                '}',
                '',
                'console.log(add(2, 3));'
            ].join('\n')
        },
        {
            title: 'Greeting Message',
            code: [
                'function greet(name) {',
                '    return "Hello, " + name + "!";',
                '}',
                '',
                'console.log(greet(\'Alice\'));'
            ].join('\n')
        },
        {
            title: 'Square Number',
            code: [
                'function square(n) {',
                '    return n * n;',
                '}',
                '',
                'console.log(square(4));'
            ].join('\n')
        }
    ];
    
    try {
        for(let block of blocks) {
            await CodeBlock.findOneAndUpdate(
                { title: block.title },
                block,
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }
        console.log('Code blocks added or updated.');
        mongoose.connection.close();
    } catch(err) {
        console.error('Error inserting/updating blocks:', err);
    }
});