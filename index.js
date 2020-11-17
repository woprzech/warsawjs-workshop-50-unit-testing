const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(
    bodyParser.json({
        limit: '2mb'
    })
);

app.get('/health', async (req, res) => {
    res.json({health: true});
});

module.exports = app;
