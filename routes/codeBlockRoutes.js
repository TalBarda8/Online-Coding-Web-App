const express = require('express');
const router = express.Router();
const CodeBlock = require('../models/codeBlock');

// Route to get all code blocks
router.get('/', async (req, res) => {
    try {
        const codeBlocks = await CodeBlock.find();
        res.json(codeBlocks);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Route to get a specific code block by its ID
router.get('/:id', async (req, res) => {
    try {
        const codeBlock = await CodeBlock.findById(req.params.id);
        if (!codeBlock) {
            return res.status(404).send('Code Block not found');
        }
        res.json(codeBlock);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;