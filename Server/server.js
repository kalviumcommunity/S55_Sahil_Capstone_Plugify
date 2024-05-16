const express = require('express');
const app = express();
const app_routes = require('./routes')
var cors = require('cors')

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('/', app_routes);
const{startDatabase} = require('./db')

app.listen(3000, () => {
    startDatabase();
    console.log('Port 3000');
});

module.exports = app;