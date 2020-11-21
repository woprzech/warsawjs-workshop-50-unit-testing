const {json} = require('body-parser');
const express = require('express');
const EmailService = require('../infrastructure/email-service');

const app = express();
app.use(json({limit: '2mb'}));


const visits = []
app.post('/visits', async (req, res) => {
    visits.push(req.body);
    const emailService = new EmailService();
    emailService.send('Wizyta umówiona.');
    res.sendStatus(201);
});

app.get('/visits', async (req, res) => {
    res.json(visits);
});

module.exports = app;
