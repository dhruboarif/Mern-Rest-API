const express = require('express');
const router = express('router');

router.get('/blog', (req, res) => {
    res.send('Blog Hello World!')
})

module.exports = router; 