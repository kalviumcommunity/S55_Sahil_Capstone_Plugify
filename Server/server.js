const express = require('express');
const app = express();
const app_routes = require('./routes')
var cors = require('cors')

app.use(cors())
app.use('/', app_routes);

app.listen(3000, () => {
    console.log('Port 3000');
});

module.exports = app;