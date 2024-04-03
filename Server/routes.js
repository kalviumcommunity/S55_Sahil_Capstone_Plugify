const express = require('express');
const app = express();
const { getConnectionStatus } = require('./db');
const { userModel } = require('./schema');
app.use(express.json())

// GET request to get connection status
app.get('/', async (req, res) => {
    const connectionStatus = await getConnectionStatus();
    res.send(connectionStatus);
});

app.get('/data', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/hello', function(req, res){
  res.send('Hello')
})

module.exports = app;
