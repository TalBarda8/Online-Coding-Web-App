const express = require('express');
const router = express.Router();
const CodeBlock = require('../models/codeBlock');

router.get('/', async (req, res) => {
    try {
        const codeBlocks = await CodeBlock.find();
        res.json(codeBlocks);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
